#!/usr/bin/env node
/* =========================================================
   Nodum mail relay
   ---------------------------------------------------------
   A tiny zero-dependency HTTP -> SMTP bridge so the browser
   build can send real verification emails.

   Run:
       node mail-relay.mjs

   Configure one of these ways (first match wins):
     1. mail-config.json next to this file
     2. environment variables:
          SMTP_HOST, SMTP_PORT, SMTP_SECURE (true/false),
          SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_FROM_NAME,
          RELAY_PORT (default 4319), RELAY_HOST (default 127.0.0.1)

   mail-config.json looks like:
       {
         "host": "smtp.gmail.com",
         "port": 465,
         "secure": true,
         "user": "you@gmail.com",
         "pass": "your-app-password",
         "from": "you@gmail.com",
         "fromName": "Nodum"
       }

   Gmail needs an App Password (2-Step Verification required).
   Nothing is stored or logged beyond the recipient address.
   ========================================================= */

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { connect as netConnect } from "node:net";
import { connect as tlsConnect } from "node:tls";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(HERE, "mail-config.json");

function loadConfig() {
  let file = {};
  if (existsSync(CONFIG_PATH)) {
    try {
      file = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
    } catch (error) {
      console.error(`[mail-relay] mail-config.json is not valid JSON: ${error.message}`);
      file = {};
    }
  }
  const env = process.env;
  const port = Number(file.port ?? env.SMTP_PORT ?? 465);
  return {
    host: String(file.host ?? env.SMTP_HOST ?? "").trim(),
    port,
    secure: String(file.secure ?? env.SMTP_SECURE ?? (port === 465)).toLowerCase() !== "false",
    user: String(file.user ?? env.SMTP_USER ?? "").trim(),
    pass: String(file.pass ?? env.SMTP_PASS ?? ""),
    from: String(file.from ?? env.MAIL_FROM ?? file.user ?? env.SMTP_USER ?? "").trim(),
    fromName: String(file.fromName ?? env.MAIL_FROM_NAME ?? "Nodum").trim(),
    relayPort: Number(file.relayPort ?? env.RELAY_PORT ?? 4319),
    relayHost: String(file.relayHost ?? env.RELAY_HOST ?? "127.0.0.1"),
    allowedOrigins: Array.isArray(file.allowedOrigins) ? file.allowedOrigins : null
  };
}

const config = loadConfig();

/* ---------- Minimal SMTP client ---------- */

class SmtpSession {
  constructor(socket) {
    this.socket = socket;
    this.buffer = "";
    this.waiting = [];
    this.closed = false;
    this.error = null;
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => this.onData(chunk));
    socket.on("error", (error) => this.fail(error));
    socket.on("close", () => this.fail(new Error("SMTP connection closed.")));
    socket.on("timeout", () => this.fail(new Error("SMTP connection timed out.")));
    socket.setTimeout(30_000);
  }

  onData(chunk) {
    this.buffer += chunk;
    // SMTP replies end with "<code><space|->text\r\n"; multi-line ends with "<code> text".
    let index;
    while ((index = this.buffer.indexOf("\r\n")) !== -1) {
      const line = this.buffer.slice(0, index);
      this.buffer = this.buffer.slice(index + 2);
      this.lines ||= [];
      this.lines.push(line);
      if (line.length >= 4 && line[3] === "-") continue;
      const reply = { code: Number(line.slice(0, 3)) || 0, lines: this.lines };
      this.lines = [];
      const waiter = this.waiting.shift();
      if (waiter) waiter.resolve(reply);
    }
  }

  fail(error) {
    if (this.closed) return;
    this.closed = true;
    this.error = error;
    while (this.waiting.length) this.waiting.shift().reject(error);
  }

  read() {
    if (this.closed) return Promise.reject(this.error || new Error("SMTP connection closed."));
    return new Promise((resolve, reject) => this.waiting.push({ resolve, reject }));
  }

  async command(line, expected = [250]) {
    this.socket.write(`${line}\r\n`);
    const reply = await this.read();
    if (expected.length && !expected.includes(reply.code)) {
      throw new Error(`SMTP ${line.split(" ")[0]} failed: ${reply.lines.join(" ")}`);
    }
    return reply;
  }

  async writeRaw(data) {
    this.socket.write(data);
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    try { this.socket.end(); } catch { /* already gone */ }
  }
}

function openSocket() {
  return new Promise((resolve, reject) => {
    const options = { host: config.host, port: config.port, servername: config.host };
    const socket = config.secure ? tlsConnect(options) : netConnect(options);
    const event = config.secure ? "secureConnect" : "connect";
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("SMTP connection timed out."));
    }, 15_000);
    socket.once(event, () => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

function upgradeToTls(socket) {
  return new Promise((resolve, reject) => {
    const upgraded = tlsConnect({ socket, servername: config.host });
    upgraded.once("secureConnect", () => resolve(upgraded));
    upgraded.once("error", reject);
  });
}

function encodeHeader(value) {
  const text = String(value || "");
  // Encode non-ASCII header values as RFC 2047 words.
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  return `=?UTF-8?B?${Buffer.from(text, "utf8").toString("base64")}?=`;
}

function buildMessage({ to, code, name, expiresMinutes }) {
  const from = config.from;
  const display = `${encodeHeader(config.fromName)} <${from}>`;
  const safeName = String(name || "there").replace(/[\r\n]+/g, " ").slice(0, 60);
  const minutes = Number(expiresMinutes) > 0 ? Math.round(Number(expiresMinutes)) : 10;
  const subject = `${code} is your Nodum code`;
  const body = [
    `Hi ${safeName},`,
    "",
    `Your Nodum verification code is:`,
    "",
    `    ${code}`,
    "",
    `It expires in ${minutes} minutes. If you didn't ask for this, you can ignore this email.`,
    "",
    "— Nodum",
    ""
  ].join("\r\n");
  const html = `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#0c0c0b;font-family:Inter,Segoe UI,Arial,sans-serif;color:#eeeeeb">
  <div style="max-width:440px;margin:0 auto;background:#161614;border:1px solid #232320;border-radius:14px;padding:28px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8d8c85">Nodum</p>
    <h1 style="margin:0 0 14px;font-size:20px;font-weight:600;letter-spacing:-.02em">Your sign-in code</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.55;color:#b6b5ae">Hi ${escapeHtml(safeName)}, enter this code to finish creating your account. It expires in ${minutes} minutes.</p>
    <div style="margin:0 0 20px;padding:16px;border-radius:10px;background:#1c1c1a;border:1px solid #232320;text-align:center;font-size:30px;letter-spacing:.28em;font-weight:600;color:#eeeeeb">${code}</div>
    <p style="margin:0;font-size:12.5px;line-height:1.55;color:#8d8c85">Didn't ask for this? Ignore the email and nothing happens.</p>
  </div>
</body></html>`;
  const boundary = `nodum-${randomUUID()}`;
  const headers = [
    `From: ${display}`,
    `To: <${to}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${randomUUID()}@nodum.local>`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`
  ];
  const parts = [
    `--${boundary}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    body,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    html,
    `--${boundary}--`,
    ``
  ];
  return `${headers.join("\r\n")}\r\n\r\n${parts.join("\r\n")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendMail({ to, code, name, expiresMinutes }) {
  if (!config.host || !config.from) {
    throw new Error("SMTP is not configured. Copy mail-config.example.json to mail-config.json and fill in your server details.");
  }
  let socket = await openSocket();
  let session = new SmtpSession(socket);
  try {
    let greeting = await session.read();
    if (greeting.code !== 220) throw new Error(`SMTP greeting failed: ${greeting.lines.join(" ")}`);

    let ehlo = await session.command(`EHLO nodum.local`, [250]);
    if (!config.secure && ehlo.lines.some((line) => /STARTTLS/i.test(line))) {
      await session.command("STARTTLS", [220]);
      session.close();
      socket = await upgradeToTls(socket);
      session = new SmtpSession(socket);
      ehlo = await session.command("EHLO nodum.local", [250]);
    }

    const authLine = ehlo.lines.find((line) => /AUTH[ =]/i.test(line)) || "";
    const mechanisms = authLine.toUpperCase();
    if (config.user && config.pass) {
      if (mechanisms.includes("PLAIN")) {
        const token = Buffer.from(`\u0000${config.user}\u0000${config.pass}`, "utf8").toString("base64");
        await session.command(`AUTH PLAIN ${token}`, [235]);
      } else {
        await session.command("AUTH LOGIN", [334]);
        await session.command(Buffer.from(config.user, "utf8").toString("base64"), [334]);
        await session.command(Buffer.from(config.pass, "utf8").toString("base64"), [235]);
      }
    }

    await session.command(`MAIL FROM:<${config.from}>`, [250]);
    await session.command(`RCPT TO:<${to}>`, [250, 251]);
    await session.command("DATA", [354]);
    const message = buildMessage({ to, code, name, expiresMinutes });
    // Dot-stuff lines that begin with a period, per RFC 5321.
    const stuffed = message.replace(/\r\n\./g, "\r\n..");
    await session.writeRaw(`${stuffed}\r\n.\r\n`);
    const accepted = await session.read();
    if (accepted.code !== 250) throw new Error(`SMTP rejected the message: ${accepted.lines.join(" ")}`);
    try { await session.command("QUIT", [221]); } catch { /* server may hang up first */ }
  } finally {
    session.close();
  }
}

/* ---------- HTTP layer ---------- */

function corsHeaders(origin) {
  const allowed = !config.allowedOrigins || config.allowedOrigins.includes("*") || config.allowedOrigins.includes(origin);
  return {
    "access-control-allow-origin": allowed && origin ? origin : config.allowedOrigins?.[0] || "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin"
  };
}

function json(response, status, payload, origin) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...corsHeaders(origin)
  });
  response.end(JSON.stringify(payload));
}

function readBody(request, limit = 16_384) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Request body too large."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const server = createServer(async (request, response) => {
  const origin = request.headers.origin || "";
  const url = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders(origin));
    response.end();
    return;
  }

  if (request.method === "GET" && (url.pathname === "/health" || url.pathname === "/")) {
    json(response, 200, {
      ok: true,
      configured: Boolean(config.host && config.from),
      host: config.host || null,
      port: config.port,
      secure: config.secure,
      from: config.from || null
    }, origin);
    return;
  }

  if (request.method === "POST" && url.pathname === "/send-code") {
    let payload;
    try {
      payload = JSON.parse(await readBody(request));
    } catch (error) {
      json(response, 400, { ok: false, error: error.message || "Invalid JSON body." }, origin);
      return;
    }
    const to = String(payload.email || "").trim().toLowerCase();
    const code = String(payload.code || "").trim();
    if (!EMAIL_RE.test(to)) {
      json(response, 400, { ok: false, error: "That email address doesn't look right." }, origin);
      return;
    }
    if (!/^\d{4,10}$/.test(code)) {
      json(response, 400, { ok: false, error: "The verification code must be numeric." }, origin);
      return;
    }
    try {
      await sendMail({
        to,
        code,
        name: payload.name,
        expiresMinutes: payload.expiresMinutes
      });
      console.log(`[mail-relay] sent ${code} to ${to}`);
      json(response, 200, { ok: true }, origin);
    } catch (error) {
      console.error(`[mail-relay] send failed for ${to}: ${error.message}`);
      json(response, 502, { ok: false, error: error.message || "SMTP send failed." }, origin);
    }
    return;
  }

  json(response, 404, { ok: false, error: "Not found." }, origin);
});

server.listen(config.relayPort, config.relayHost, () => {
  const ready = config.host && config.from;
  console.log("");
  console.log("  Nodum mail relay");
  console.log(`  Listening on http://${config.relayHost}:${config.relayPort}`);
  if (ready) {
    console.log(`  SMTP: ${config.host}:${config.port} (${config.secure ? "TLS" : "STARTTLS/plain"})`);
    console.log(`  From: ${config.fromName} <${config.from}>`);
  } else {
    console.log("  SMTP is not configured yet.");
    console.log("  Copy mail-config.example.json to mail-config.json and add your SMTP details,");
    console.log("  or set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / MAIL_FROM.");
  }
  console.log("");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`[mail-relay] Port ${config.relayPort} is already in use. Is the relay already running?`);
  } else {
    console.error(`[mail-relay] ${error.message}`);
  }
  process.exit(1);
});
