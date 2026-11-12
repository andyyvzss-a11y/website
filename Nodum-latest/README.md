# Nodum

A cozy, Discord-style social app built with plain HTML, CSS, and JavaScript. Everything runs locally in the browser — no build step, framework, or backend required.

Create a private local account with a display name, username, email, and password. The first account becomes the owner. Open the app in another tab, sign in as a different account, and the new member appears in the member list and can message and join voice.

## Run it

Open `index.html` directly in a browser, or serve the folder locally:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then visit <http://127.0.0.1:4173>.

## What's inside

- **Private accounts** — sign up and sign in with a display name, username, email, and password. Credentials are stored only in this browser, separately from world data. Owners and staff never see emails or passwords.
- **Email verification** — every new account must enter a 6-digit code before it is created. Disposable inbox domains are rejected, and the email domain is checked for MX/A records with a best-effort DNS lookup. Because Nodum is local-first, the code is delivered in-app instead of by a remote mail server.
- **Owner-granted badges** — the owner decides who gets OG, Artist, Moderator, Head Moderator, Manager, and Owner. No random badge assignments.
- **Profiles** — animated banners, custom backgrounds, avatar effects, animated decorations, custom statuses, bios, pronouns, and accent colors. New accounts start with a letter avatar in a random color. Plus cosmetics are optional and local.
- **Decoration studio and marketplace** — design an animated frame or upload your own PNG/WebP/JPG art. Uploads are auto-trimmed and center-cropped to a square avatar frame in the browser. Submit frames to moderation, then list approved frames as free or for shards. The author or buyers can wear paid frames; the creator receives the shards. You can delete any submission you made, even after approval.
- **Servers** — create communities from templates, add categories, text channels, voice channels, roles, hoisted role groups, and per-role permissions.
- **Messages** — channels and DMs with replies, reactions, pins, search, mentions, emoji, and image attachments.
- **Friends** — online/all/pending/blocked/suggested views, friend requests, suggestions, friend search, blocking, presence, and direct messages.
- **Voice** — real microphone capture and WebRTC peer connections between tabs, with mute, deafen, speaking indicators, and a voice member list in the sidebar.
- **Presence and multiplayer** — `BroadcastChannel` keeps tabs in sync; members join, leave, and change status live.
- **Moderation** — review queues for submitted decorations, staff applications, and Plus gamepass requests, plus member/role management.
- **Full settings suite** — My Account, My Profile, Authorized Apps, Appearance, Chat, Language, Voice & Audio, Sounds, Notifications, Keybinds, Desktop app, Advanced, Developer, Subscriptions, Creators, Leaderboards, Shards, Nodum Plus, and Staff team. Moderators also see Staff applications and Plus orders. Search filters the settings navigation.

## Settings that actually change things

- **Appearance** — dark/light/system themes, plus a full **Custom** skin with background, sidebar, chat, and card colour pickers, quick presets, and automatic contrast for text and borders. Accent palettes, a custom two/three-colour accent, intensity, message text scaling, compact mode, and reduced motion.
- **Chat** — message scaling, compact spacing, consecutive-message grouping, and timestamp visibility.
- **Language** — date, time, and number formatting follow the selected locale.
- **Voice & Audio** — input/output volume, echo cancellation, noise suppression, and a live mic test. These settings feed the real `getUserMedia` constraints and remote audio elements.
- **Sounds** — master volume plus per-event notification sounds generated locally with Web Audio, each with a test button.
- **Notifications** — real browser desktop notifications with permission handling, pause, test, and a live inbox count built from friend requests, unread DMs, and the mod queue.
- **Keybinds** — capture new shortcuts for search, mute, settings, and closing dialogs. They are wired into the global key handler.
- **Advanced** — developer mode, trusted sites, staff team application, export, and reset.
- **Developer** — create local app credentials, reveal/rotate/delete secrets, and copy API endpoints or a starter snippet. No bots or fake accounts are created.
- **Creators, Shards, Plus** — shards are earned by daily check-ins, chatting, and selling approved decorations. Plus is a local 1,000 Robux gamepass request reviewed by a moderator; nothing is charged or verified by Nodum. Approval unlocks the PLUS tag, animated ring, 2x chat shards, a 10-shard daily check-in, two server boosts, and 20% off paid frames.
- **Staff applications** — a real question-based form stored with decoration-style moderation. Moderators get one review card per application with accept, decline, and notes.

## Local-only boundaries

Nodum has no backend, so a few things are deliberately honest about their limits:

- Email verification codes are generated and delivered inside the app. No remote email is sent.
- Plus cannot verify or charge Robux. The app records a local gamepass request, and a moderator approves it by hand.
- Decoration “auto-fit” is a client-side canvas trim and square center crop. It does not call a remote AI service.
- Shards and marketplace sales are local balances stored on this device.

## Data and privacy

Everything persists locally:

| Key | Contents |
| --- | --- |
| `yapin:auth:v3` | Local accounts: emails, salted password hashes, verification state, and account IDs |
| `yapin:world:v3` | Servers, channels, messages, users, roles, and submissions |
| `yapin:prefs:v3` | Theme, custom background colours, accent, chat, voice, sounds, notifications, keybinds, apps, and local rewards |
| `yapin:ui:v3` | Active server/channel/DM and panel state |
| `yapin:presence:v3` | Cross-tab presence |
| `yapin:session:v3` | Per-tab signed-in account |

Credential data never enters `yapin:world:v3`, presence, profiles, broadcasts, or any owner/staff surface. Live updates travel over the `yapin:live:v3` BroadcastChannel. Storage keys keep their original `yapin:` prefix so existing local worlds and the original owner account continue to work. Use **Settings → Advanced → Reset everything** to wipe all local data and start fresh.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App shell, auth/verification screen, and modal roots |
| `styles.css` | Base design tokens and shared components |
| `styles-v3.css` | v3 layout, auth, profile, settings, studio, voice, and responsive layer |
| `app.js` | State, accounts, rendering, WebRTC voice, and interactions |
| `favicon.svg` | Nodum logo |
| `preview-desktop.png` | Desktop screenshot |
| `preview-mobile.png` | Mobile screenshot |

> Nodum is a local-first front-end app. Voice, presence, verification, and settings work in the browser; there is no remote server.
