/* =========================================================
   Nodum v3 — profiles, badges, decorations, voice.
   Local-first social app with private local accounts.
   ========================================================= */

const WORLD_KEY = "yapin:world:v3";
const PREFS_KEY = "yapin:prefs:v3";
const UI_KEY = "yapin:ui:v3";
const PRESENCE_KEY = "yapin:presence:v3";
const SESSION_KEY = "yapin:session:v3";
const AUTH_KEY = "yapin:auth:v3";
const BUS_NAME = "yapin:live:v3";

// Old seeded demo profiles. These were never real accounts and must never
// appear in a world, a member list, a DM, or a message again.
const LEGACY_FAKE_USER_IDS = new Set(["maya", "priya", "leo", "nia", "jules", "theo", "nova"]);

/* ---------- Icons ---------- */

const ICON_PATHS = {
  hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  volumeX: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
  volume1: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  micOff: '<line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><line x1="12" x2="12" y1="19" y2="22"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  headphonesOff: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 14.7-6.9"/><path d="M21 10v9a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><line x1="2" x2="22" y1="2" y2="22"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>',
  minus: '<line x1="5" x2="19" y1="12" y2="12"/>',
  move: '<path d="M12 2v20"/><path d="m8 6 4-4 4 4"/><path d="m8 18 4 4 4-4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/><path d="m18 8 4 4-4 4"/>',
  crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  userX: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  bellOff: '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><line x1="2" x2="22" y1="2" y2="22"/>',
  pin: '<line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14l-1.5-4.5V4h-11v8.5L5 17Z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  reply: '<path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  phoneOff: '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="2" x2="22" y1="2" y2="22"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
  messages: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/><path d="M8 9h8"/><path d="M8 13h5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.42 1.42"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
  pinOff: '<line x1="2" x2="22" y1="2" y2="22"/><path d="M12 17v5"/><path d="M9 9v-4h6v4l1.5 4.5H8"/><path d="M5 17h9"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.9-4.5-8.8-10-8.8Z"/>',
  wand: '<path d="m15 4 5 5"/><path d="m14 5 5 5"/><path d="m3 21 9.5-9.5"/><path d="m12 13 1.5 1.5"/><path d="m19 2 .8 2.2L22 5l-2.2.8L19 8l-.8-2.2L16 5l2.2-.8L19 2Z"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><path d="M9 17h6"/><path d="M2 12h2M20 12h2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 11 2 2 4-4"/>',
  shieldStar: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m12 8 1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4L12 8Z"/>',
  crown: '<path d="m3 7 4 4 5-7 5 7 4-4-2 12H5L3 7Z"/><path d="M5 19h14"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/>',
  flame: '<path d="M12 22c4.4 0 7-2.8 7-6.5 0-2.8-1.6-5.1-3.6-7.1C13.9 6.9 12.8 4.9 12.5 2c-.1-.5-.7-.7-1-.3-2 2.3-3 5-3 7.2 0 1.5.5 2.9 1.3 4.1-1.7-.5-3-1.8-3.8-3.4-.2-.4-.8-.5-1 .1-.5 1.3-.8 2.6-.8 3.8C4.2 18.6 7.4 22 12 22Z"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.8 12.2 8.4-8.4"/><path d="m16 7 2 2"/><path d="m18.5 4.5 2 2"/>',
  brush: '<path d="m14.5 3.5 6 6"/><path d="M3 21c3.5-.5 5-2 5.5-5.5"/><path d="M8.5 15.5 18 6a2.1 2.1 0 0 0-3-3l-9.5 9.5c-.5 1.5-.7 3-1.5 4.5 1.5-.8 3-1 4.5-1.5Z"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 3 3.9"/><path d="M17 6h3v2a4 4 0 0 1-3 3.9"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9"/><path d="M12 8v13"/><path d="M12 8H8.5A2.5 2.5 0 1 1 11 5.5L12 8Z"/><path d="M12 8h3.5A2.5 2.5 0 1 0 13 5.5L12 8Z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bookmark: '<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.4L3 16"/><path d="M3 21v-5h5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.1"/><path d="M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4.2-.9"/><line x1="2" x2="22" y1="2" y2="22"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>',
  video: '<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  screen: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>',
  wifiOff: '<path d="M2 2l20 20"/><path d="M5 12.5a10 10 0 0 1 5-2.6"/><path d="M14 9.9a10 10 0 0 1 5 2.6"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1" fill="currentColor"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.2 2c-.9.7-1.8 1.2-1.8 2.5"/><circle cx="12" cy="17" r="1" fill="currentColor"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9-.8-.8-2.1-.8-2.9-.1Z"/><path d="m12 15-3-3a22 22 0 0 1 2-5.5A12.9 12.9 0 0 1 21 3a12.9 12.9 0 0 1-3.5 10 22 22 0 0 1-5.5 2Z"/><path d="M9 12H4l2-4h4"/><path d="M12 15v5l4-2v-4"/><circle cx="15.5" cy="8.5" r="1.5"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list: '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
  filter: '<path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  arrowRight: '<path d="m12 5 7 7-7 7"/><path d="M5 12h14"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" x2="15.4" y1="10.5" y2="6.5"/><line x1="8.6" x2="15.4" y1="13.5" y2="17.5"/>',
  play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  dot: '<circle cx="12" cy="12" r="4" fill="currentColor"/>',
  bold: '<path d="M6 4h8a4 4 0 0 1 0 8H6Z"/><path d="M6 12h9a4 4 0 0 1 0 8H6Z"/>',
  italic: '<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>',
  slash: '<path d="M17 3 7 21"/>',
  maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  minimize: '<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M16 3v3a2 2 0 0 0 2 2h3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  verified: '<path d="m12 2 2.4 2.1 3.2-.4 1.2 3 3 1.2-.4 3.2L23 12l-2.1 2.4.4 3.2-3 1.2-1.2 3-3.2-.4L12 23l-2.4-2.1-3.2.4-1.2-3-3-1.2.4-3.2L1 12l2.1-2.4-.4-3.2 3-1.2 1.2-3 3.2.4L12 2Z"/><path d="m8 12 2.6 2.6L16 9"/>'
};

function icon(name, cls = "") {
  const path = ICON_PATHS[name] || ICON_PATHS.sparkles;
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("span[data-icon]").forEach((el) => {
    if (el.dataset.hydrated === "true") return;
    el.innerHTML = icon(el.dataset.icon);
    el.dataset.hydrated = "true";
  });
}

function setIcon(el, name) {
  if (!el) return;
  el.dataset.icon = name;
  el.dataset.hydrated = "true";
  el.innerHTML = icon(name);
}

/* ---------- Small utilities ---------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function uid(prefix = "id") {
  const seed = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${seed.replace(/[^a-z0-9-]/gi, "").slice(0, 18)}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Labels sometimes glue an emoji straight onto a word ("👑Request Plus").
   Insert a single space after emoji runs in rendered text, while leaving
   inputs, code blocks, and editable regions untouched. */
const EMOJI_GLUE = /([\p{Extended_Pictographic}\uFE0F\u200D\u{1F3FB}-\u{1F3FF}])(?=[A-Za-z0-9])/gu;
const EMOJI_GLUE_TEST = /([\p{Extended_Pictographic}\uFE0F\u200D\u{1F3FB}-\u{1F3FF}])(?=[A-Za-z0-9])/u;
const EMOJI_SKIP = 'input, textarea, select, code, pre, kbd, samp, script, style, svg, [contenteditable="true"], [contenteditable=""]';

function spaceEmojiText(root = document.body) {
  if (!root || !document.createTreeWalker) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !EMOJI_GLUE_TEST.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest(EMOJI_SKIP)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const next = node.nodeValue.replace(EMOJI_GLUE, "$1 ");
    if (next !== node.nodeValue) node.nodeValue = next;
  });
}

let emojiSpacingObserver = null;

function installEmojiSpacing() {
  spaceEmojiText(document.body);
  if (emojiSpacingObserver || !window.MutationObserver) return;
  let queued = false;
  emojiSpacingObserver = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      spaceEmojiText(document.body);
    });
  });
  emojiSpacingObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function truncate(value, length = 46) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30) || "new-channel";
}

function ago(minutes) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function daysAgo(days) {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function uiLocale() {
  try {
    return prefs?.language || undefined;
  } catch {
    return undefined;
  }
}

function formatTime(iso) {
  return new Intl.DateTimeFormat(uiLocale(), { hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function formatShortDate(iso) {
  return new Intl.DateTimeFormat(uiLocale(), { month: "short", day: "numeric" }).format(new Date(iso));
}

function formatDateKey(iso) {
  return new Date(iso).toDateString();
}

function formatDateDivider(iso) {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat(uiLocale(), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric"
  }).format(date);
}

function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatShortDate(iso);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function plural(count, singular, pluralWord = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralWord}`;
}

function debounce(fn, wait = 140) {
  let timer = 0;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

/* ---------- Palette ---------- */

const ACCENTS = {
  teal: { label: "Teal", a: "#55c5bd", b: "#3aa9a2", la: "#0a7c75", lb: "#0a7c75" },
  blue: { label: "Blue", a: "#7c93ff", b: "#5f78f0", la: "#4f63e0", lb: "#4f63e0" },
  violet: { label: "Violet", a: "#a58bff", b: "#8b6cf6", la: "#6d4fe0", lb: "#6d4fe0" },
  green: { label: "Green", a: "#3fbf86", b: "#2ea873", la: "#17985f", lb: "#17985f" },
  amber: { label: "Amber", a: "#e8a33d", b: "#d4922b", la: "#b9770e", lb: "#b9770e" },
  rose: { label: "Rose", a: "#f0708a", b: "#e05a78", la: "#d4385a", lb: "#d4385a" },
  mono: { label: "Mono", a: "#eeeeeb", b: "#c9c8c1", la: "#121211", lb: "#121211" }
};

const SKIN_DEFAULT = { bg: "#0d0f16", side: "#12141d", chat: "#171a24", card: "#20242f" };

const SKIN_PRESETS = [
  { id: "midnight", label: "Midnight", colors: { bg: "#0d0f16", side: "#12141d", chat: "#171a24", card: "#20242f" } },
  { id: "forest", label: "Forest", colors: { bg: "#0a120e", side: "#101a15", chat: "#15221b", card: "#1d2d24" } },
  { id: "rose", label: "Rose", colors: { bg: "#140d12", side: "#1b1218", chat: "#22161d", card: "#2d1e27" } },
  { id: "ocean", label: "Ocean", colors: { bg: "#07121a", side: "#0b1922", chat: "#10212c", card: "#182c38" } },
  { id: "paper", label: "Paper", colors: { bg: "#d8d5cd", side: "#e7e4dc", chat: "#f5f2eb", card: "#fffdf7" } }
];

const TONES = {
  coral: { a: "#ff9a7e", b: "#ff5d8f" },
  violet: { a: "#c4a7ff", b: "#8b6cf6" },
  mint: { a: "#7ef0d4", b: "#34c9a2" },
  sky: { a: "#8cc8ff", b: "#5a7dff" },
  amber: { a: "#ffdf8a", b: "#f5a34a" },
  pink: { a: "#ffa8d1", b: "#e65aa0" },
  green: { a: "#b2f0a1", b: "#59b96c" },
  rose: { a: "#ff9eb5", b: "#d94a72" },
  ice: { a: "#b7f3ff", b: "#57b6e8" },
  gold: { a: "#ffe08a", b: "#e6a315" }
};

const TONE_KEYS = Object.keys(TONES);

const AVATAR_EMOJIS = ["🐣", "🦊", "🌻", "🔮", "🪴", "🍒", "🛸", "🐸", "🦉", "🐙", "🎧", "🎮", "🎨", "💬", "🌙", "🌈", "🪩", "🚀", "👾", "🐱", "🐼", "🦋", "🍄", "⚡"];

const SERVER_EMOJIS = ["🪩", "💬", "🌙", "🎨", "🎮", "🍕", "🛸", "🌿", "🎧", "🔥", "🌊", "🪐", "🐾", "🧪", "📚", "🛠️"];

const BANNER_PRESETS = [
  { id: "aurora", label: "Aurora", a: "#ff8a3d", b: "#ff3d81", c: "#7c3aed" },
  { id: "midnight", label: "Midnight", a: "#111827", b: "#312e81", c: "#0ea5e9" },
  { id: "sunset", label: "Sunset", a: "#fb923c", b: "#db2777", c: "#7c2d12" },
  { id: "candy", label: "Candy", a: "#f472b6", b: "#a78bfa", c: "#60a5fa" },
  { id: "forest", label: "Forest", a: "#064e3b", b: "#65a30d", c: "#0d9488" },
  { id: "ocean", label: "Ocean", a: "#0ea5e9", b: "#22d3ee", c: "#1e3a8a" },
  { id: "galaxy", label: "Galaxy", a: "#1e1b4b", b: "#7c3aed", c: "#ec4899" },
  { id: "mono", label: "Mono", a: "#111827", b: "#4b5563", c: "#9ca3af" },
  { id: "ember", label: "Ember", a: "#7f1d1d", b: "#f97316", c: "#facc15" }
];

const AVATAR_EFFECTS = [
  { id: "none", label: "None" },
  { id: "glow", label: "Glow" },
  { id: "pulse", label: "Pulse" },
  { id: "orbit", label: "Orbit" },
  { id: "sparkle", label: "Sparkle" },
  { id: "neon", label: "Neon" },
  { id: "float", label: "Float" },
  { id: "glitch", label: "Glitch" }
];

const DECO_STYLES = [
  { id: "halo", label: "Halo" },
  { id: "orbit", label: "Orbit" },
  { id: "petals", label: "Petals" },
  { id: "embers", label: "Embers" },
  { id: "stardust", label: "Stardust" },
  { id: "circuit", label: "Circuit" },
  { id: "bloom", label: "Bloom" },
  { id: "aurora", label: "Aurora" }
];

const BANNER_EFFECTS = [
  { id: "none", label: "Still" },
  { id: "drift", label: "Drift" },
  { id: "shimmer", label: "Shimmer" },
  { id: "grain", label: "Film grain" }
];

const QUICK_REACTIONS = ["🔥", "❤️", "😂", "👍", "💀", "✨"];

const EMOJIS = [
  "😀", "😂", "🥹", "😭", "😎", "🤔", "😴", "🥳", "😤", "🫠", "👀", "💀", "🙃", "🤝", "👋", "🫶",
  "❤️", "🔥", "✨", "💯", "🎉", "👑", "💅", "🤌", "🍕", "🍟", "🍿", "🍵", "🍹", "🌮", "🍰", "🍒",
  "🐣", "🦊", "🐸", "🦉", "🐙", "🪴", "🌙", "🌈", "🎧", "🎮", "🎨", "💬", "📌", "🚀", "🪩", "🛸",
  "⚡", "🌊", "🪐", "🍄", "🦋", "🐼", "🐱", "👾", "🤖", "🛡️", "🏆", "🎁", "🔮", "🌻", "🍀", "🫡"
];

/* ---------- Badge catalog ---------- */

const BADGES = {
  owner: {
    label: "Owner", a: "#ffd76a", b: "#f97316", path: "crown",
    about: "Runs the whole yap. Final say on everything."
  },
  headmod: {
    label: "Head Moderator", a: "#67e8f9", b: "#2563eb", path: "shieldStar",
    about: "Leads the moderation team and keeps the peace."
  },
  moderator: {
    label: "Moderator", a: "#4ade80", b: "#0f9f6e", path: "shieldCheck",
    about: "Keeps channels friendly, safe, and on topic."
  },
  manager: {
    label: "Manager", a: "#93c5fd", b: "#3b82f6", path: "key",
    about: "Runs events, teams, and the behind-the-scenes stuff."
  },
  botdev: {
    label: "Bot Dev", a: "#c4b5fd", b: "#7c3aed", path: "bot",
    about: "Builds bots and handy little automations."
  },
  artist: {
    label: "Artist", a: "#fda4af", b: "#e11d48", path: "palette",
    about: "Makes the place look good. Decorations, art, and vibes."
  },
  og: {
    label: "OG", a: "#fbbf24", b: "#f97316", path: "flame",
    about: "Been here since the early yap. Certified original."
  },
  verified: {
    label: "Verified", a: "#7dd3fc", b: "#2563eb", path: "check",
    about: "A trusted member of the community."
  },
  early: {
    label: "Early Supporter", a: "#a7f3d0", b: "#059669", path: "sparkles",
    about: "Helped Nodum grow before it was cool."
  },
  helper: {
    label: "Helper", a: "#fde68a", b: "#d97706", path: "heart",
    about: "Always around to lend a hand."
  }
};

const BADGE_ORDER = ["owner", "headmod", "moderator", "manager", "botdev", "artist", "og", "verified", "early", "helper"];

/* ---------- Built-in decorations ---------- */

const BUILTIN_DECORATIONS = [
  { id: "deco-none", name: "None", style: "none", colorA: "#ffffff", colorB: "#ffffff", icon: "", speed: 0, builtin: true },
  { id: "deco-halo", name: "Solar Halo", style: "halo", colorA: "#ffd166", colorB: "#ff8a3d", icon: "✦", speed: 9, builtin: true },
  { id: "deco-orbit", name: "Moon Orbit", style: "orbit", colorA: "#a5b4fc", colorB: "#60a5fa", icon: "☾", speed: 7, builtin: true },
  { id: "deco-petals", name: "Cherry Petals", style: "petals", colorA: "#ffb3d1", colorB: "#ff4d8d", icon: "🌸", speed: 6, builtin: true },
  { id: "deco-embers", name: "Ember Crown", style: "embers", colorA: "#fbbf24", colorB: "#ef4444", icon: "🔥", speed: 5, builtin: true },
  { id: "deco-stardust", name: "Stardust", style: "stardust", colorA: "#c4b5fd", colorB: "#67e8f9", icon: "✦", speed: 8, builtin: true },
  { id: "deco-circuit", name: "Circuit", style: "circuit", colorA: "#5eead4", colorB: "#3b82f6", icon: "⌁", speed: 5, builtin: true },
  { id: "deco-bloom", name: "Night Bloom", style: "bloom", colorA: "#f0abfc", colorB: "#7c3aed", icon: "✿", speed: 7, builtin: true },
  { id: "deco-aurora", name: "Aurora Veil", style: "aurora", colorA: "#67e8f9", colorB: "#a78bfa", icon: "✧", speed: 10, builtin: true }
];

const ROLE_COLORS = ["#a58bff", "#4cc38a", "#5fb6e8", "#ef7b5b", "#e8b04c", "#9ca3af", "#e26a9b", "#3fb8b0", "#c9d44f", "#7c93ff"];
const ROLE_ICON_EMOJIS = ["✨", "🔥", "🎨", "🛡️", "⚔️", "🌸", "🎧", "🚀", "💎", "🍀", "🐾", "🎮", "📚", "🎬", "🌟", "👑", "🪄", "🧩", "🎯", "💫"];

/* ---------- Role permissions ---------- */

const PERMISSION_GROUPS = [
  { id: "general", label: "General", blurb: "Community-wide access and management." },
  { id: "members", label: "Membership", blurb: "Invites, moderation, and keeping people in line." },
  { id: "text", label: "Text channels", blurb: "Chat, posts, and message tools." },
  { id: "voice", label: "Voice channels", blurb: "Joining, talking, and moderating voice." },
  { id: "advanced", label: "Advanced", blurb: "Dangerous powers. Grant with care." }
];

const PERMISSIONS = [
  { id: "viewChannels", group: "general", label: "View channels", hint: "See channels. Turn off per channel to hide it from a role." },
  { id: "manageChannels", group: "general", label: "Manage channels", hint: "Create, edit, reorder and delete channels and categories." },
  { id: "manageRoles", group: "general", label: "Manage roles", hint: "Create and edit roles below their highest role, and assign them." },
  { id: "manageCommunity", group: "general", label: "Manage community", hint: "Edit the profile, appearance, access and safety settings." },
  { id: "viewAuditLog", group: "general", label: "View audit log", hint: "See who changed what in the community." },
  { id: "manageWebhooks", group: "general", label: "Manage webhooks", hint: "Create, edit and delete webhooks and integrations." },
  { id: "manageEmojis", group: "general", label: "Manage emojis and stickers", hint: "Upload, rename and remove custom emojis and stickers." },
  { id: "manageEvents", group: "general", label: "Manage events", hint: "Create, edit and cancel community events." },
  { id: "createInvite", group: "members", label: "Create invites", hint: "Create invite links and invite people directly." },
  { id: "manageInvites", group: "members", label: "Manage invites", hint: "See and revoke every invite link." },
  { id: "kickMembers", group: "members", label: "Kick members", hint: "Remove members below their highest role." },
  { id: "banMembers", group: "members", label: "Ban members", hint: "Remove members and stop them from rejoining." },
  { id: "timeoutMembers", group: "members", label: "Time out members", hint: "Stop members from chatting, reacting or speaking for a while." },
  { id: "sendMessages", group: "text", label: "Send messages", hint: "Send messages in text and voice channel chats." },
  { id: "readHistory", group: "text", label: "Read message history", hint: "Read messages sent before they opened the channel." },
  { id: "attachFiles", group: "text", label: "Attach files", hint: "Upload images to channels." },
  { id: "addReactions", group: "text", label: "Add reactions", hint: "Add new reactions to messages." },
  { id: "mentionEveryone", group: "text", label: "Mention @everyone, @here and all roles", hint: "Notify every member who can see the channel, or everyone in any role, even roles that don't allow mentions." },
  { id: "postAnnouncements", group: "text", label: "Post announcements", hint: "Send messages in announcement channels." },
  { id: "pinMessages", group: "text", label: "Pin messages", hint: "Pin and unpin messages." },
  { id: "manageMessages", group: "text", label: "Manage messages", hint: "Delete and pin messages from other members." },
  { id: "bypassSlowmode", group: "text", label: "Bypass slow mode", hint: "Ignore slow mode and blocked words." },
  { id: "useCommands", group: "text", label: "Use commands", hint: "Use slash commands from the platform and installed apps." },
  { id: "createForumPosts", group: "text", label: "Create forum posts", hint: "Start new posts in forum and media channels." },
  { id: "manageForumPosts", group: "text", label: "Manage forum posts", hint: "Lock, pin and delete posts in forum and media channels." },
  { id: "publishToFeed", group: "text", label: "Publish to feed", hint: "Publish posts on behalf of the community." },
  { id: "connect", group: "voice", label: "Connect", hint: "Join voice channels." },
  { id: "speak", group: "voice", label: "Speak", hint: "Transmit audio in voice channels." },
  { id: "shareScreen", group: "voice", label: "Share screen", hint: "Share their screen in voice channels and on stage." },
  { id: "muteMembers", group: "voice", label: "Mute members", hint: "Mute other people in voice for everyone." },
  { id: "disconnectMembers", group: "voice", label: "Disconnect members", hint: "Remove people from voice channels." },
  { id: "administrator", group: "advanced", label: "Administrator", hint: "Every permission, in every channel. Grant with care." }
];

const ALL_PERMISSIONS = PERMISSIONS.map((p) => p.id);
const PERMISSION_SCHEMA = 3;

/* ---------- Seed people ---------- */

function dmIdFor(a, b) {
  return [a, b].sort().join("__");
}

function seedUsers() {
  return {
    you: {
      id: "you", name: "You", handle: "you", pronouns: "they/them",
      emoji: "🐣", tone: "coral", status: "online",
      customStatus: "building the coziest corner of the internet",
      bio: "Owner of Nodum HQ. Professional yapper, amateur decorator, full-time enjoyer of good vibes. Everything here is local-first and free to use. Plus is just an optional cosmetic tier.",
      badges: ["owner", "og"], displayBadges: ["owner", "og"],
      banner: { type: "preset", value: "aurora" }, bannerEffect: "shimmer",
      avatarEffect: "glow", decoration: "deco-halo", accent: "#ff8a3d",
      createdAt: daysAgo(420), activity: "hosting the yap"
    }
  };
}

/* ---------- Seed decorations ---------- */

function seedDecorations() {
  return [];
}

function seedSubmissions() {
  return [];
}

/* ---------- Server templates ---------- */

/* ---------- Seed servers + conversations ---------- */

function baseRoles() {
  const memberBase = ["viewChannels", "createInvite", "sendMessages", "readHistory", "attachFiles", "addReactions", "useCommands", "createForumPosts", "connect", "speak"];
  const voiceMod = ["shareScreen", "muteMembers", "disconnectMembers"];
  return [
    { id: "role-owner", name: "Owner", color: "#ffd76a", badgeId: "owner", badgeIcon: "crown", hoist: true, position: 100, permissions: [...ALL_PERMISSIONS] },
    { id: "role-headmod", name: "Head Moderator", color: "#67e8f9", badgeId: "", badgeIcon: "shieldStar", hoist: true, position: 90, permissions: [...new Set([...memberBase, ...voiceMod, "manageChannels", "manageRoles", "manageCommunity", "viewAuditLog", "manageWebhooks", "manageEmojis", "manageEvents", "manageInvites", "kickMembers", "banMembers", "timeoutMembers", "mentionEveryone", "postAnnouncements", "pinMessages", "manageMessages", "bypassSlowmode", "manageForumPosts", "publishToFeed"])] },
    { id: "role-moderator", name: "Moderator", color: "#4ade80", badgeId: "", badgeIcon: "shieldCheck", hoist: true, position: 80, permissions: [...new Set([...memberBase, ...voiceMod, "manageEmojis", "kickMembers", "timeoutMembers", "mentionEveryone", "pinMessages", "manageMessages", "bypassSlowmode", "manageForumPosts"])] },
    { id: "role-manager", name: "Manager", color: "#93c5fd", badgeId: "", badgeIcon: "key", hoist: true, position: 70, permissions: [...new Set([...memberBase, "manageCommunity", "manageRoles", "viewAuditLog", "manageEvents", "manageInvites", "mentionEveryone", "postAnnouncements", "pinMessages", "manageMessages", "createForumPosts", "manageForumPosts", "publishToFeed"])] },
    { id: "role-artist", name: "Artist", color: "#fda4af", badgeId: "", badgeIcon: "palette", hoist: true, position: 50, permissions: [...memberBase] },
    { id: "role-og", name: "OG", color: "#fbbf24", badgeId: "", badgeIcon: "flame", hoist: false, position: 40, permissions: [...memberBase] },
    { id: "role-member", name: "Member", color: "#a3a8b8", badgeId: "", badgeIcon: "", hoist: false, position: 10, permissions: [...memberBase] }
  ];
}

function seedServerMessages() {
  const m = (id, authorId, text, minutes, extra = {}) => ({ id, authorId, text, createdAt: ago(minutes), ...extra });
  return {
    "yapin-lobby": [
      m("yl1", "maya", "welcome to **Nodum HQ** 🪩 the only server where the group chat is the whole personality.", 1440, { reactions: [{ emoji: "🫶", users: ["you", "priya", "leo"] }] }),
      m("yl2", "you", "we're keeping this place free forever btw. no ads, no paywall, no weird upsells. just yap.", 1432, { reactions: [{ emoji: "🔥", users: ["maya", "nia", "jules", "theo"] }] }),
      m("yl3", "priya", "the decoration studio is already cooking. i can feel it.", 1400)
    ],
    "yapin-announcements": [
      m("ya1", "you", "**Nodum is now public.**\n\nInvite your friends. Build a server. Claim a banner. Make a badge. Submit a decoration. Everything is free — no ads, no paywalls, no weird upsells. Plus is an optional local reward tier, never a requirement.\n\nThis is your corner of the internet now. Go make it feel like home. 🫶", 280, {
        pinned: true,
        reactions: [{ emoji: "🎉", users: ["maya", "priya", "leo", "nia", "jules", "theo", "nova"] }, { emoji: "🫡", users: ["maya", "leo"] }]
      }),
      m("ya2", "maya", "**Decoration studio is live.** Build a frame or upload your own art, pick your colors, add an icon, set a free or shard price, and send it through moderation. Approved decorations show up in the marketplace.", 260, {
        reactions: [{ emoji: "🎨", users: ["nia", "jules"] }]
      })
    ],
    "yapin-rules": [
      m("yr1", "you", "**The house rules**\n\n01. Be a person, not a problem.\n02. Keep the yap kind. Critique the pixels, not the person.\n03. No spam, no scams, no weird links.\n04. Ask before dumping selfies or big files.\n05. If a mod asks you to chill, chill.\n\nThat's it. The rest is vibes.", 3000, { pinned: true })
    ],
    "yapin-general": [
      m("yg1", "priya", "the server is officially one week old today. we've already had three arguments and one group hug. i'm so proud 🥹", 1620, { reactions: [{ emoji: "🥹", users: ["maya", "leo", "nia"] }] }),
      m("yg2", "leo", "...and i'd argue again. but yes. proud.", 1588),
      m("yg3", "you", "welcome to the yap. pinned constitution: hydrate, stretch, and never let the group chat die. 📌", 900, {
        pinned: true,
        reactions: [{ emoji: "🫡", users: ["maya", "leo", "priya", "jules"] }]
      }),
      m("yg4", "maya", "okay but why is the new lounge setup actually immaculate?? 😭", 96, {
        reactions: [{ emoji: "🔥", users: ["leo", "priya", "nia"] }, { emoji: "💯", users: ["jules"] }]
      }),
      m("yg5", "leo", "the acoustic panels were my idea btw. i accept payment in snacks.", 92, {
        replyTo: { id: "yg4", authorId: "maya", text: "okay but why is the new lounge setup actually immaculate?? 😭" },
        reactions: [{ emoji: "🫡", users: ["maya"] }]
      }),
      m("yg6", "priya", "someone PLEASE tell me what happened in **#hot-takes** last night. i left for five minutes and came back to a 47-message essay.", 67),
      m("yg7", "nia", "tl;dr: pineapple on pizza is apparently a personality test now 🍍", 64, { reactions: [{ emoji: "💀", users: ["maya", "leo"] }] }),
      m("yg8", "maya", "and i won the debate, as usual. next topic: is a hot dog a sandwich?", 61),
      m("yg9", "leo", "it's a taco. next question.", 57, { reactions: [{ emoji: "🌮", users: ["maya", "priya", "nia", "jules"] }] }),
      m("yg10", "jules", "i'm supposed to be working but this is objectively funnier than my design brief. thanks a lot, everyone.", 22, {
        reactions: [{ emoji: "😂", users: ["maya", "leo"] }, { emoji: "❤️", users: ["priya"] }]
      }),
      m("yg11", "you", "friendly reminder: hydrate, stretch, and yap responsibly. 💧", 9)
    ],
    "yapin-hot-takes": [
      m("yh1", "maya", "hot take: cereal is soup.", 730, { reactions: [{ emoji: "💀", users: ["leo", "priya", "nia"] }] }),
      m("yh2", "leo", "this is why the lounge needed acoustic panels.", 726),
      m("yh3", "jules", "hot take: the best part of a movie is the credits. everyone shuts up.", 710),
      m("yh4", "priya", "i have never been more offended by something i 100% agree with.", 704),
      m("yh5", "nia", "pineapple on pizza is good and you're all just loud.", 610, {
        reactions: [{ emoji: "🔥", users: ["maya", "leo", "priya", "jules"] }]
      })
    ],
    "yapin-memes": [
      m("ym1", "leo", "me checking the server at 3am like the group chat pays my rent", 400, { reactions: [{ emoji: "😭", users: ["maya", "jules"] }] }),
      m("ym2", "maya", "my sleep schedule is less of a schedule and more of a rumor", 300),
      m("ym3", "jules", "no thoughts. just the little guy from the meme.", 110, { reactions: [{ emoji: "😂", users: ["leo", "nia"] }] })
    ],
    "yapin-pets": [
      m("yp1", "theo", "update: the monstera has a new leaf and honestly it's carrying the whole household 🌱", 500, { reactions: [{ emoji: "🌿", users: ["maya", "priya"] }] }),
      m("yp2", "priya", "i don't have a pet but i do have a very demanding sourdough starter. does that count", 200, { reactions: [{ emoji: "🍞", users: ["theo", "leo"] }] })
    ],
    "yapin-art-studio": [
      m("yas1", "nia", "current mood board: half brutalist concrete, half tiny ceramic frogs. make it make sense.", 700),
      m("yas2", "jules", "the weird spacing is the best part. do not let them sand it down.", 688, { reactions: [{ emoji: "💯", users: ["nia", "maya"] }] }),
      m("yas3", "you", "design feedback rule #1: we critique the pixels, not the person. also post your decoration drafts here.", 290)
    ],
    "yapin-suggestions": [
      m("ys1", "theo", "suggestion: a plant channel. i will personally water it.", 460),
      m("ys2", "maya", "we have #pets. that's basically a plant channel with more chaos.", 450)
    ],
    "nightowls-late-night": [
      m("nl1", "maya", "why does every good thought happen at 1:47am", 900, { reactions: [{ emoji: "🌙", users: ["leo", "jules"] }] }),
      m("nl2", "jules", "because the daytime is for pretending to have it together", 890),
      m("nl3", "leo", "this is the only timezone i respect", 810),
      m("nl4", "you", "just got here. is this where the unhinged thoughts live?", 120, { reactions: [{ emoji: "👀", users: ["maya", "jules"] }] })
    ],
    "nightowls-deep-talks": [
      m("nd1", "priya", "okay serious question: what's one tiny thing that made your week better?", 1000, { reactions: [{ emoji: "🫶", users: ["maya", "leo", "nia"] }] }),
      m("nd2", "nia", "a stranger told me my jacket was cool and i have been riding that high for four days.", 980, { reactions: [{ emoji: "❤️", users: ["priya", "maya"] }] })
    ],
    "nightowls-music": [
      m("nm1", "leo", "drop your current repeat song. i need new material for the lounge queue.", 600),
      m("nm2", "maya", "anything with a bassline that makes me feel like i'm in a movie montage.", 590)
    ],
    "design-critique": [
      m("dc1", "jules", "posting a work-in-progress later. be gentle, i'm emotionally attached to the weird spacing.", 320),
      m("dc2", "nia", "the weird spacing is the best part. do not let them sand it down.", 310, { reactions: [{ emoji: "💯", users: ["jules", "leo"] }] }),
      m("dc3", "you", "design feedback rule #1: we critique the pixels, not the person.", 290)
    ],
    "design-inspiration": [
      m("di1", "nia", "current mood board: half brutalist concrete, half tiny ceramic frogs. make it make sense.", 700),
      m("di2", "jules", "i would like to formally request the tiny ceramic frogs.", 688, { reactions: [{ emoji: "🐸", users: ["nia", "leo"] }] })
    ],
    "design-resources": [
      m("dr1", "leo", "dropping a link later for that free type foundry everyone keeps asking about.", 430),
      m("dr2", "jules", "reminder that the best resource is a folder full of screenshots you never look at again.", 420)
    ]
  };
}

function seedDms() {
  return {};
}

function seedWorld() {
  const users = seedUsers();
  const servers = [
    {
      id: "yapin", name: "Nodum HQ", icon: { type: "emoji", value: "🪩" }, tone: "coral",
      tagline: "the internet's coziest group chat",
      banner: { type: "preset", value: "aurora" }, bannerEffect: "shimmer",
      ownerId: "you", boostCount: 14, inviteCode: "nodum-hq",
      memberIds: ["you", "maya", "priya", "leo", "nia", "jules", "theo", "nova"],
      roles: baseRoles(),
      members: {
        you: { roleIds: ["role-owner", "role-og"] },
        maya: { roleIds: ["role-headmod", "role-artist", "role-og"] },
        priya: { roleIds: ["role-moderator", "role-og"] },
        leo: { roleIds: ["role-manager"] },
        nia: { roleIds: ["role-artist", "role-og"] },
        jules: { roleIds: ["role-artist"] },
        theo: { roleIds: ["role-og"] },
        nova: { roleIds: ["role-moderator"] }
      },
      categories: [
        { id: "cat-start", name: "START HERE", channels: [
          { id: "yapin-lobby", name: "lobby", type: "text", topic: "Say hi, get cozy, and jump into the yap." },
          { id: "yapin-announcements", name: "announcements", type: "text", topic: "The important stuff. Read-only, low chaos.", readOnly: true },
          { id: "yapin-rules", name: "rules", type: "text", topic: "The house rules. Short version: be a person.", readOnly: true }
        ] },
        { id: "cat-yap", name: "YAP CENTRAL", channels: [
          { id: "yapin-general", name: "general", type: "text", topic: "The town square. Yap responsibly." },
          { id: "yapin-hot-takes", name: "hot-takes", type: "text", topic: "Unpopular opinions welcome. Emotional damage possible." },
          { id: "yapin-memes", name: "memes", type: "text", topic: "Posting through the pain, one meme at a time." },
          { id: "yapin-pets", name: "pets", type: "text", topic: "The only channel guaranteed to be good." }
        ] },
        { id: "cat-lounge", name: "LOUNGE", channels: [
          { id: "yapin-lounge", name: "The Lounge", type: "voice", topic: "Lo-fi, low stakes, high yap.", userLimit: 12 },
          { id: "yapin-focus", name: "Focus Room", type: "voice", topic: "Co-working in comfortable silence.", userLimit: 6 }
        ] },
        { id: "cat-community", name: "COMMUNITY", channels: [
          { id: "yapin-art", name: "art-studio", type: "text", topic: "Share work. Ask for the feedback you actually want." },
          { id: "yapin-suggestions", name: "suggestions", type: "text", topic: "Ideas for the yap. We actually read these." }
        ] }
      ]
    },
    {
      id: "nightowls", name: "Night Owls", icon: { type: "emoji", value: "🌙" }, tone: "violet",
      tagline: "for the ones who peak after midnight",
      banner: { type: "preset", value: "midnight" }, bannerEffect: "drift",
      ownerId: "maya", boostCount: 8, inviteCode: "night-owls",
      memberIds: ["you", "maya", "priya", "leo", "nia", "jules"],
      roles: baseRoles(),
      members: {
        you: { roleIds: ["role-og"] },
        maya: { roleIds: ["role-owner", "role-artist"] },
        priya: { roleIds: ["role-moderator", "role-og"] },
        leo: { roleIds: ["role-manager"] },
        nia: { roleIds: ["role-artist", "role-og"] },
        jules: { roleIds: ["role-artist"] }
      },
      categories: [
        { id: "cat-after", name: "AFTER HOURS", channels: [
          { id: "nightowls-late-night", name: "late-night", type: "text", topic: "The sun is asleep. We are not." },
          { id: "nightowls-deep-talks", name: "deep-talks", type: "text", topic: "Soft questions, honest answers, no small talk." },
          { id: "nightowls-music", name: "music", type: "text", topic: "Share what's on repeat." }
        ] },
        { id: "cat-night-voice", name: "VOICE", channels: [
          { id: "nightowls-3am", name: "3AM Club", type: "voice", topic: "No agenda. Just voices in the dark.", userLimit: 8 }
        ] }
      ]
    },
    {
      id: "design", name: "Design Lab", icon: { type: "emoji", value: "🎨" }, tone: "mint",
      tagline: "make cool stuff, together",
      banner: { type: "preset", value: "candy" }, bannerEffect: "shimmer",
      ownerId: "jules", boostCount: 5, inviteCode: "design-lab",
      memberIds: ["jules", "nia", "leo", "theo"],
      roles: baseRoles(),
      members: {
        jules: { roleIds: ["role-owner", "role-artist"] },
        nia: { roleIds: ["role-headmod", "role-artist"] },
        leo: { roleIds: ["role-manager"] },
        theo: { roleIds: ["role-og"] }
      },
      categories: [
        { id: "cat-studio", name: "STUDIO", channels: [
          { id: "design-critique", name: "critique", type: "text", topic: "Share work. Ask for the feedback you actually want." },
          { id: "design-inspiration", name: "inspiration", type: "text", topic: "Steal like an artist. Credit like a friend." },
          { id: "design-resources", name: "resources", type: "text", topic: "Links, tools, and very good fonts." }
        ] },
        { id: "cat-cowork", name: "CO-WORK", channels: [
          { id: "design-cowork", name: "Co-work Room", type: "voice", topic: "Heads down, mics optional.", userLimit: 8 }
        ] }
      ]
    }
  ];

  const read = (now) => Object.fromEntries(
    servers.flatMap((server) => server.categories.flatMap((category) => category.channels))
      .filter((channel) => channel.type === "text")
      .map((channel) => [channel.id, now])
  );

  return {
    version: 3,
    rev: 1,
    ownerId: "you",
    users,
    servers,
    messages: seedServerMessages(),
    dms: seedDms(),
    decorations: seedDecorations(),
    submissions: seedSubmissions(),
    friendIds: [],
    friendRequests: [],
    blockedIds: [],
    reads: { you: read(ago(200)) },
    reports: [],
    createdAt: daysAgo(420)
  };
}

/* =========================================================
   State, sessions, and local multiplayer
   ========================================================= */

let world;
let prefs;
let ui;
let session;
let presence = {};
let bus = null;
let heartbeatTimer = 0;
let replyTarget = null;
let pendingAttachment = null;
let drafts = {};
let activeModal = null;
let modalResolve = null;
let searchSelectedIndex = -1;
let profileEditorDraft = null;
let studioDraft = null;
let settingsDraft = null;
let voiceState = null;
let mentionState = null;
let isBooting = false;

function normalizeWorld(data) {
  let changed = false;
  data.users ||= {};
  data.servers ||= [];
  data.messages ||= {};
  data.dms ||= {};
  data.friendIds ||= [];
  data.friendRequests ||= [];
  data.blockedIds ||= [];
  data.decorations ||= [];
  data.submissions ||= [];
  data.staffApplications ||= [];
  data.staffTeam ||= [];
  data.plusOrders ||= [];

  // Visible branding follows the Nodum rename. Storage keys and stable IDs keep
  // their old values so existing local worlds continue to work.
  const rebrandText = (value) => (typeof value === "string" ? value.replace(/Yapin'?/g, "Nodum") : value);
  const rebrandFields = (target, fields) => {
    fields.forEach((field) => {
      if (typeof target?.[field] !== "string") return;
      const next = rebrandText(target[field]);
      if (next !== target[field]) {
        target[field] = next;
        changed = true;
      }
    });
  };
  Object.values(data.users).forEach((user) => {
    rebrandFields(user, ["name", "bio", "about", "customStatus", "activity"]);
  });
  Object.values(data.messages).forEach((list) => {
    (list || []).forEach((message) => rebrandFields(message, ["text"]));
  });
  Object.values(data.dms).forEach((dm) => {
    (dm?.messages || []).forEach((message) => rebrandFields(message, ["text"]));
  });

  // Bot accounts and the old seeded demo profiles are gone for good. They were
  // never real accounts, so remove them and every trace of them.
  Object.values(data.users).forEach((user) => {
    if (user.id === data.ownerId) return;
    if (user.bot || user.seeded || LEGACY_FAKE_USER_IDS.has(user.id)) {
      delete data.users[user.id];
      changed = true;
    }
  });
  const hasUser = (id) => Boolean(data.users?.[id]);
  const validChannelIds = new Set();

  (data.servers || []).forEach((server) => {
    if (server.id === "yapin") {
      if (server.name === "Yapin HQ") {
        server.name = "Nodum HQ";
        changed = true;
      }
      if (server.inviteCode === "yapin-hq") {
        server.inviteCode = "nodum-hq";
        changed = true;
      }
    }
    rebrandFields(server, ["name", "tagline"]);
    const beforeMembers = (server.memberIds || []).length;
    server.memberIds = (server.memberIds || []).filter(hasUser);
    if (server.memberIds.length !== beforeMembers) changed = true;

    (server.categories || []).forEach((category) => {
      if (!category.channels) return;
      const before = category.channels.length;
      category.channels = category.channels.filter((channel) => channel.id !== "yapin-bots" && channel.name !== "bot-commands");
      if (category.channels.length !== before) changed = true;
      category.channels.forEach((channel) => validChannelIds.add(channel.id));
    });

    if (server.roles) {
      const beforeRoles = server.roles.length;
      server.roles = server.roles.filter((role) => role.id !== "role-botdev" && role.name !== "Bot Dev");
      if (server.roles.length !== beforeRoles) changed = true;
      server.roles.forEach((role) => {
        if (!role.iconEmoji) role.iconEmoji = "";
        if (!role.iconImage) role.iconImage = "";
        if (role.id !== "role-owner" && role.badgeId) {
          role.badgeId = "";
          changed = true;
        }
      });
      // Roles created before the permission rework keep working. Old ids are
      // mapped to their new homes and sensible defaults are filled in.
      if ((data.permissionSchema || 1) < PERMISSION_SCHEMA) {
        server.roles.forEach((role) => {
          if (role.id === "role-owner") {
            role.permissions = [...ALL_PERMISSIONS];
            return;
          }
          const perms = new Set(role.permissions || []);
          if (perms.has("manageServer")) {
            perms.delete("manageServer");
            perms.add("manageCommunity");
          }
          if (perms.has("moderate")) {
            perms.delete("moderate");
            perms.add("manageMessages");
          }
          if (perms.has("administrator")) {
            role.permissions = [...perms];
            return;
          }
          perms.add("viewChannels");
          perms.add("useCommands");
          perms.add("createForumPosts");
          if (perms.has("sendMessages")) {
            ["attachFiles", "addReactions", "createInvite", "readHistory"].forEach((id) => perms.add(id));
          }
          if (perms.has("connect")) perms.add("speak");
          if (perms.has("manageChannels") || perms.has("manageMessages")) {
            ["manageMessages", "pinMessages", "bypassSlowmode"].forEach((id) => perms.add(id));
          }
          if (perms.has("manageRoles")) {
            ["kickMembers", "banMembers", "timeoutMembers", "manageInvites"].forEach((id) => perms.add(id));
          }
          if (perms.has("manageCommunity")) {
            ["viewAuditLog", "manageWebhooks", "manageEmojis", "manageEvents"].forEach((id) => perms.add(id));
          }
          role.permissions = [...perms];
        });
      }
    }
    server.bannedIds ||= [];

    if (server.members) {
      Object.entries(server.members).forEach(([id, member]) => {
        if (!hasUser(id)) {
          delete server.members[id];
          changed = true;
          return;
        }
        if (Array.isArray(member?.roleIds)) {
          const before = member.roleIds.length;
          member.roleIds = member.roleIds.filter((roleId) => roleId !== "role-botdev");
          if (member.roleIds.length !== before) changed = true;
        }
      });
    }

    // A server owned by a removed demo profile now belongs to the real owner.
    if (!hasUser(server.ownerId)) {
      server.ownerId = data.ownerId;
      changed = true;
    }
    if (server.ownerId === data.ownerId && hasUser(data.ownerId)) {
      server.members ||= {};
      if (!server.memberIds.includes(data.ownerId)) {
        server.memberIds.push(data.ownerId);
        changed = true;
      }
      if (!server.members[data.ownerId]) {
        server.members[data.ownerId] = { roleIds: ["role-owner"] };
        changed = true;
      }
    }
  });

  Object.keys(data.messages || {}).forEach((channelId) => {
    if (!validChannelIds.has(channelId)) {
      delete data.messages[channelId];
      changed = true;
      return;
    }
    const before = data.messages[channelId].length;
    data.messages[channelId] = data.messages[channelId].filter((message) => !message.botReply && hasUser(message.authorId));
    if (data.messages[channelId].length !== before) changed = true;
    data.messages[channelId].forEach((message) => {
      if (!Array.isArray(message.reactions)) return;
      const beforeReactions = JSON.stringify(message.reactions);
      message.reactions = message.reactions
        .map((reaction) => ({ ...reaction, users: (reaction.users || []).filter(hasUser) }))
        .filter((reaction) => reaction.users.length);
      if (JSON.stringify(message.reactions) !== beforeReactions) changed = true;
    });
  });

  // DMs: remove any conversation that touched a removed account.
  Object.entries(data.dms || {}).forEach(([dmId, dm]) => {
    if (!dm) {
      delete data.dms[dmId];
      changed = true;
      return;
    }
    const participants = (dm.participants || dmId.split("__")).filter(hasUser);
    if (participants.length < 2) {
      delete data.dms[dmId];
      changed = true;
      return;
    }
    if (dm.messages) {
      const before = dm.messages.length;
      dm.messages = dm.messages.filter((message) => hasUser(message.authorId));
      if (dm.messages.length !== before) changed = true;
      dm.messages.forEach((message) => {
        if (!Array.isArray(message.reactions)) return;
        const beforeReactions = JSON.stringify(message.reactions);
        message.reactions = message.reactions
          .map((reaction) => ({ ...reaction, users: (reaction.users || []).filter(hasUser) }))
          .filter((reaction) => reaction.users.length);
        if (JSON.stringify(message.reactions) !== beforeReactions) changed = true;
      });
    }
    if (JSON.stringify(dm.participants || []) !== JSON.stringify(participants)) {
      dm.participants = participants;
      changed = true;
    }
  });

  // Friends, requests, and blocks: drop removed accounts.
  const beforeFriends = data.friendIds.length;
  data.friendIds = data.friendIds.filter(hasUser);
  if (data.friendIds.length !== beforeFriends) changed = true;
  const beforeRequests = data.friendRequests.length;
  data.friendRequests = data.friendRequests.filter((request) => hasUser(request.from));
  if (data.friendRequests.length !== beforeRequests) changed = true;
  const beforeBlocked = data.blockedIds.length;
  data.blockedIds = data.blockedIds.filter(hasUser);
  if (data.blockedIds.length !== beforeBlocked) changed = true;

  // Custom decorations and submissions made by removed profiles are removed too.
  const beforeDecorations = data.decorations.length;
  data.decorations = data.decorations.filter((deco) => !deco.authorId || hasUser(deco.authorId));
  if (data.decorations.length !== beforeDecorations) changed = true;
  const beforeSubmissions = data.submissions.length;
  data.submissions = data.submissions.filter((sub) => hasUser(sub.authorId));
  if (data.submissions.length !== beforeSubmissions) changed = true;

  const beforeStaffApps = data.staffApplications.length;
  data.staffApplications = data.staffApplications.filter((app) => hasUser(app.userId));
  if (data.staffApplications.length !== beforeStaffApps) changed = true;
  const beforeStaffTeam = data.staffTeam.length;
  data.staffTeam = data.staffTeam.filter(hasUser);
  if (data.staffTeam.length !== beforeStaffTeam) changed = true;
  const beforePlusOrders = data.plusOrders.length;
  data.plusOrders = data.plusOrders.filter((order) => hasUser(order.userId));
  if (data.plusOrders.length !== beforePlusOrders) changed = true;

  // Reads: keep only channels and DMs that still exist.
  const validReadKeys = new Set(validChannelIds);
  Object.keys(data.dms || {}).forEach((dmId) => validReadKeys.add(dmId));
  Object.values(data.reads || {}).forEach((map) => {
    if (!map || typeof map !== "object") return;
    Object.keys(map).forEach((key) => {
      if (!validReadKeys.has(key)) {
        delete map[key];
        changed = true;
      }
    });
  });

  // Only the owner keeps badges. Re-run cleanup for older saves.
  if (!data.badgePrivacyV2) {
    Object.values(data.users).forEach((user) => {
      if (user.id === data.ownerId) return;
      if ((user.badges || []).length || (user.displayBadges || []).length) {
        user.badges = [];
        user.displayBadges = [];
        changed = true;
      }
    });
    data.badgePrivacyV1 = true;
    data.badgePrivacyV2 = true;
    changed = true;
  }
  if ((data.permissionSchema || 1) < PERMISSION_SCHEMA) {
    data.permissionSchema = PERMISSION_SCHEMA;
    changed = true;
  }
  return changed;
}

function loadWorld() {
  try {
    const raw = localStorage.getItem(WORLD_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 3 && Array.isArray(parsed.servers) && parsed.users) {
        parsed.messages ||= {};
        parsed.dms ||= {};
        parsed.decorations ||= [];
        parsed.submissions ||= [];
        parsed.friendIds ||= [];
        parsed.friendRequests ||= [];
        parsed.reads ||= {};
        if (normalizeWorld(parsed)) {
          try {
            localStorage.setItem(WORLD_KEY, JSON.stringify(parsed));
          } catch {
            /* The cleaned world can be re-saved later. */
          }
        }
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read Nodum world:", error);
  }
  const seeded = seedWorld();
  normalizeWorld(seeded);
  try {
    localStorage.setItem(WORLD_KEY, JSON.stringify(seeded));
  } catch (error) {
    console.warn("Could not persist seed world:", error);
  }
  return seeded;
}

function saveWorldRaw() {
  try {
    localStorage.setItem(WORLD_KEY, JSON.stringify(world));
    return true;
  } catch (error) {
    console.warn("Could not save Nodum world:", error);
    toast("That image is too big to save. Try a smaller file.", "error");
    return false;
  }
}

function commitWorld({ render = true, event = null, broadcast = true } = {}) {
  world.rev = (world.rev || 0) + 1;
  if (!saveWorldRaw()) return false;
  if (broadcast && bus) {
    try {
      bus.postMessage({ type: "world", rev: world.rev, sender: session?.sessionId, event });
    } catch (error) {
      /* BroadcastChannel can throw on giant payloads; localStorage is still the source of truth. */
    }
  }
  if (render) renderApp();
  return true;
}

function defaultPrefs() {
  return {
    theme: "dark",
    accent: "teal",
    customTheme: { a: "#55c5bd", b: "#3aa9a2", c: "#55c5bd" },
    customBackground: { ...SKIN_DEFAULT },
    intensity: 100,
    compact: false,
    reduceMotion: false,
    fontScale: 100,
    messageGrouping: true,
    showTimestamps: true,
    showLinkPreviews: true,
    inlineMedia: true,
    emojiPicker: true,
    language: "en",
    inputVolume: 100,
    outputVolume: 100,
    inputDeviceId: "default",
    outputDeviceId: "default",
    mailEndpoint: "http://127.0.0.1:4319",
    noiseSuppression: true,
    echoCancellation: true,
    joinSound: true,
    masterVolume: 80,
    notificationSounds: true,
    soundEvents: { dm: true, mention: true, sent: false, call: true, join: true, leave: true },
    desktopNotifications: false,
    pauseNotifications: false,
    keybinds: { search: "Ctrl+K", mute: "Ctrl+Shift+M", shortcuts: "Ctrl+/", close: "Escape" },
    desktop: { minimizeToTray: false, launchOnStartup: false, hardwareAcceleration: true },
    developerMode: false,
    trustedSites: [],
    staffApplication: null,
    plus: false,
    plusBadge: true,
    shards: 0,
    lastShardClaim: null,
    chatReward: null,
    shardHistory: [],
    creatorApplication: null,
    authorizedApps: [],
    devApps: [],
    notificationsReadAt: 0
  };
}

function loadPrefs() {
  const base = defaultPrefs();
  try {
    const raw = JSON.parse(localStorage.getItem(PREFS_KEY) || "null") || {};
    const merged = {
      ...base,
      ...raw,
      customTheme: { ...base.customTheme, ...(raw.customTheme || {}) },
      customBackground: { ...base.customBackground, ...(raw.customBackground || {}) },
      soundEvents: { ...base.soundEvents, ...(raw.soundEvents || {}) },
      keybinds: { ...base.keybinds, ...(raw.keybinds || {}) },
      desktop: { ...base.desktop, ...(raw.desktop || {}) },
      trustedSites: Array.isArray(raw.trustedSites) ? raw.trustedSites : [],
      authorizedApps: Array.isArray(raw.authorizedApps) ? raw.authorizedApps : [],
      devApps: Array.isArray(raw.devApps) ? raw.devApps : [],
      shardHistory: Array.isArray(raw.shardHistory) ? raw.shardHistory : []
    };
    /* Older builds shipped a coral default. Anything no longer in the palette
       falls back to the Atrium teal instead of resolving to undefined. */
    if (merged.accent !== "custom" && !ACCENTS[merged.accent]) merged.accent = "teal";
    return merged;
  } catch {
    return base;
  }
}

function savePrefs() {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* Preferences are tiny; this should not fail. */
  }
}

function blendHex(hex, target, amount) {
  const parse = (value) => {
    const clean = String(value || "").replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean.padEnd(6, "0").slice(0, 6);
    return [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16) || 0);
  };
  const a = parse(hex);
  const b = parse(target);
  const mix = a.map((channel, index) => Math.round(channel + (b[index] - channel) * amount));
  return `#${mix.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function safeHex(value, fallback) {
  const text = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(text) ? text.toLowerCase() : fallback;
}

function hexRgb(hex) {
  const full = safeHex(hex, "#000000").slice(1);
  return [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16));
}

function hexLuminance(hex) {
  const [r, g, b] = hexRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

function hexToRgba(hex, alpha) {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function customSkinVars(input = {}) {
  const colors = {
    bg: safeHex(input.bg, SKIN_DEFAULT.bg),
    side: safeHex(input.side, SKIN_DEFAULT.side),
    chat: safeHex(input.chat, SKIN_DEFAULT.chat),
    card: safeHex(input.card, SKIN_DEFAULT.card)
  };
  const light = hexLuminance(colors.chat) > 0.5;
  const ink = light ? "#17171d" : "#f4f1eb";
  const text = blendHex(ink, colors.chat, 0.06);
  const text2 = blendHex(text, colors.chat, 0.34);
  const muted = blendHex(text, colors.chat, 0.54);
  const faint = blendHex(text, colors.chat, 0.7);
  return {
    light,
    colors,
    vars: {
      "--bg-root": colors.bg,
      "--rail": blendHex(colors.side, colors.bg, 0.45),
      "--side": colors.side,
      "--side-2": blendHex(colors.side, text, 0.06),
      "--main": colors.chat,
      "--panel": colors.card,
      "--panel-2": blendHex(colors.card, text, 0.08),
      "--panel-hover": blendHex(colors.card, text, 0.12),
      "--panel-glass": hexToRgba(colors.card, 0.78),
      "--text": text,
      "--text-2": text2,
      "--muted": muted,
      "--faint": faint,
      "--border": hexToRgba(text, light ? 0.16 : 0.09),
      "--border-strong": hexToRgba(text, light ? 0.24 : 0.15),
      "--message-hover": hexToRgba(text, light ? 0.05 : 0.04)
    }
  };
}

const SKIN_VAR_NAMES = [
  "--bg-root", "--rail", "--side", "--side-2", "--main", "--panel", "--panel-2",
  "--panel-hover", "--panel-glass", "--text", "--text-2", "--muted", "--faint",
  "--border", "--border-strong", "--message-hover"
];

function applyPrefs() {
  const customAccent = prefs.accent === "custom";
  const accent = customAccent
    ? { a: prefs.customTheme.a, b: prefs.customTheme.b, la: prefs.customTheme.a, lb: prefs.customTheme.b }
    : (ACCENTS[prefs.accent] || ACCENTS.teal);
  const intensity = Math.max(0, Math.min(100, Number(prefs.intensity ?? 100))) / 100;
  const systemLight = prefs.theme === "system" && window.matchMedia?.("(prefers-color-scheme: light)").matches;
  const customSkin = prefs.theme === "custom" ? customSkinVars(prefs.customBackground) : null;
  const light = customSkin ? customSkin.light : (prefs.theme === "light" || systemLight);
  const dim = customSkin ? customSkin.vars["--main"] : light ? "#ffffff" : "#0c0c0b";
  const fade = (1 - intensity) * 0.7;
  const baseA = light ? (accent.la || accent.a) : accent.a;
  const baseB = light ? (accent.lb || accent.b) : accent.b;
  const root = document.documentElement;
  root.dataset.theme = light ? "light" : "dark";
  root.classList.toggle("theme-custom", Boolean(customSkin));
  if (customSkin) {
    Object.entries(customSkin.vars).forEach(([name, value]) => root.style.setProperty(name, value));
  } else {
    SKIN_VAR_NAMES.forEach((name) => root.style.removeProperty(name));
  }
  root.style.setProperty("--accent", blendHex(baseA, dim, fade));
  root.style.setProperty("--accent-2", blendHex(baseB, dim, fade));
  root.style.setProperty("--accent-strong", blendHex(baseA, light ? "#000000" : "#ffffff", Math.min(1, 0.14 + fade * 0.2)));
  root.style.setProperty("--msg-scale", String((Number(prefs.fontScale) || 100) / 100));
  root.lang = prefs.language || "en";
  document.body.classList.toggle("compact-messages", Boolean(prefs.compact));
  document.body.classList.toggle("reduce-motion", Boolean(prefs.reduceMotion));
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = customSkin ? customSkin.vars["--bg-root"] : light ? "#ffffff" : "#0c0c0b";
}

function loadUi() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(UI_KEY) || "null");
    return {
      view: "server",
      activeServer: "yapin",
      activeChannels: { yapin: "yapin-general" },
      activeDM: null,
      friendTab: "online",
      collapsedCategories: {},
      membersCollapsed: false,
      ...(raw || {})
    };
  } catch {
    return { view: "server", activeServer: "yapin", activeChannels: { yapin: "yapin-general" }, activeDM: null, friendTab: "online", collapsedCategories: {}, membersCollapsed: false };
  }
}

function saveUi() {
  try {
    sessionStorage.setItem(UI_KEY, JSON.stringify(ui));
  } catch {
    /* UI state is small and disposable. */
  }
}

function readPresence() {
  try {
    return JSON.parse(localStorage.getItem(PRESENCE_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

function prunePresence(map = presence) {
  const now = Date.now();
  let changed = false;
  Object.entries(map).forEach(([key, entry]) => {
    if (!entry || now - Number(entry.lastSeen || 0) > 15_000) {
      delete map[key];
      changed = true;
    }
  });
  return changed;
}

function writePresence() {
  try {
    localStorage.setItem(PRESENCE_KEY, JSON.stringify(presence));
  } catch {
    /* Presence is ephemeral. */
  }
}

/* ---------- Accounts ---------- */

function loadAuth() {
  try {
    const parsed = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
    if (parsed && parsed.accounts && typeof parsed.accounts === "object") return parsed;
  } catch {
    /* Corrupt auth data behaves like a fresh install. */
  }
  return { version: 1, accounts: {} };
}

function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

function accountCount() {
  return Object.keys(loadAuth().accounts).length;
}

function accountForEmail(email) {
  const normalized = String(email || "").trim().toLowerCase();
  return Object.values(loadAuth().accounts).find((account) => account.email === normalized) || null;
}

function normalizeHandle(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "");
}

function randomSalt() {
  return uid("salt").replace("salt-", "") + Math.random().toString(36).slice(2, 8);
}

async function hashPassword(password, salt) {
  const text = `${salt}:${password}`;
  if (window.crypto?.subtle) {
    try {
      const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    } catch {
      /* Fall through to the local hash. */
    }
  }
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) + hash) ^ text.charCodeAt(index);
  }
  return `local-${(hash >>> 0).toString(16)}`;
}

function getStoredSession() {
  try {
    const existing = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    if (!existing?.userId || !world.users[existing.userId]) return null;
    if (!loadAuth().accounts[existing.userId]) return null;
    return { sessionId: existing.sessionId || uid("sess"), userId: existing.userId };
  } catch {
    return null;
  }
}

function setStoredSession(userId) {
  const next = { sessionId: uid("sess"), userId };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
  } catch {
    /* sessionStorage can be disabled in some embeds. */
  }
  return next;
}

function clearStoredSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Nothing to clear. */
  }
}

function showAuthScreen(mode = null) {
  const screen = $("#authScreen");
  const frame = $("#appFrame");
  if (!screen) return;
  screen.hidden = false;
  if (frame) frame.hidden = true;
  document.body.classList.remove("mobile-nav-open");
  const preferred = mode || (accountCount() > 0 ? "signin" : "signup");
  setAuthMode(preferred);
}

function setAuthMode(mode) {
  const signIn = $("#signInForm");
  const signUp = $("#signUpForm");
  if (!signIn || !signUp) return;
  const verifyPanel = $("#verifyPanel");
  if (verifyPanel) verifyPanel.hidden = true;
  const authTabs = $("#authTabs");
  if (authTabs) authTabs.hidden = false;
  clearVerifyTicker();
  pendingSignup = null;
  verifyResendAt = 0;
  const isSignIn = mode !== "signup";
  signIn.hidden = !isSignIn;
  signUp.hidden = isSignIn;
  document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
    const active = tab.dataset.authTab === (isSignIn ? "signin" : "signup");
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const title = document.querySelector(".auth-copy h1");
  const copy = document.querySelector(".auth-copy p");
  if (title) title.textContent = isSignIn ? "Welcome back" : "Welcome to Nodum";
  if (copy) {
    copy.textContent = isSignIn
      ? "Sign in to your corner of the internet. Your email and password never leave this browser."
      : "Pick the name people will see. We verify your email first so throwaway accounts stay out.";
  }
  setAuthError("");
  window.setTimeout(() => {
    const field = isSignIn ? $("#signInEmail") : $("#signUpName");
    field?.focus();
  }, 40);
}

function setAuthError(message) {
  const box = $("#authError");
  if (!box) return;
  box.textContent = message || "";
  box.hidden = !message;
}

let authBusy = false;

/* Real sign-ups have to prove they can receive mail. This build ships with a
   zero-dependency local mail relay (mail-relay.mjs). The browser posts the code
   to it and the relay sends a real email over SMTP. If the relay is offline the
   panel offers the code on-device so nobody gets locked out. Disposable inboxes
   are rejected and MX/A records are checked live. */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org", "temp-mail.io",
  "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "sharklasers.com", "grr.la",
  "mailinator.com", "mailinator.net", "maildrop.cc", "yopmail.com", "yopmail.fr",
  "throwawaymail.com", "getnada.com", "nada.email", "dispostable.com", "trashmail.com",
  "trashmail.de", "fakeinbox.com", "mintemail.com", "spamgourmet.com", "mytrashmail.com",
  "mailnesia.com", "mailcatch.com", "mytemp.email", "tempr.email", "tempmailaddress.com",
  "emailondeck.com", "burnermail.io", "33mail.com", "anonbox.net", "discard.email",
  "emailfake.com", "fakemailgenerator.com", "generator.email", "inboxkitten.com", "ji7.de",
  "mail-temp.com", "mailtemp.info", "moakt.com", "mohmal.com", "tempsky.com",
  "throwawaymail.net", "tmpmail.org", "tmpmail.net", "trbvm.com", "vomoto.com",
  "wegwerfemail.de", "wegwerfmail.de", "wegwerfmail.net", "wegwerfmail.org", "müllmail.de",
  "spambox.us", "spamex.com", "spamfree24.org", "spamherelots.com", "spamhole.com",
  "spamify.com", "spaminator.de", "spamkill.info", "spaml.com", "spammotel.com",
  "spamobox.com", "spamsalad.in", "spamspot.com", "spamthis.co.uk", "spamthisplease.com",
  "supergreatmail.com", "suremail.info", "teewars.org", "teleworm.com", "teleworm.us",
  "tempail.com", "tempalias.com", "tempemail.biz", "tempemail.com", "tempemail.net",
  "tempinbox.co.uk", "tempinbox.com", "tempmail.it", "tempmail2.com", "tempmaildemo.com",
  "temporaryemail.net", "temporaryemail.us", "temporaryforwarding.com", "temporaryinbox.com",
  "thankyou2010.com", "trash2009.com", "trash2010.com", "trash2011.com", "trashcanmail.com",
  "trashemail.de", "trashmail.at", "trashmail.io", "trashmail.me", "trashmail.net",
  "trashmail.org", "trashmail.ws", "trashmailer.com", "trashymail.com", "trashymail.net",
  "tyldd.com", "uggsrock.com", "venompen.com", "veryrealemail.com", "viditag.com",
  "viewcastmedia.com", "vomoto.com", "vubby.com", "wasteland.rfc822.org", "webemail.me",
  "wegwerfemail.com", "wh4f.org", "whyspam.me", "willhackforfood.biz", "willselfdestruct.com",
  "winemaven.info", "wronghead.com", "wuzup.net", "wuzupmail.net", "www.e4ward.com",
  "www.gishpuppy.com", "www.mailinator.com", "wwwnew.eu", "xagloo.com", "xemaps.com",
  "xents.com", "xmaily.com", "xoxy.net", "yep.it", "yogamaven.com", "yopmail.net",
  "ypmail.webarnak.fr.eu.org", "yuurok.com", "zehnminuten.de", "zehnminutenmail.de",
  "zippymail.info", "zoaxe.com", "zoemail.org"
]);
const EMAIL_CODE_TTL = 10 * 60_000;
const EMAIL_CODE_ATTEMPTS = 5;
let pendingSignup = null;
let verifyTicker = 0;
let verifyResendAt = 0;

function emailDomain(email) {
  return String(email || "").trim().toLowerCase().split("@").pop() || "";
}

function isDisposableEmail(email) {
  const domain = emailDomain(email);
  if (!domain) return true;
  return DISPOSABLE_EMAIL_DOMAINS.has(domain) || [...DISPOSABLE_EMAIL_DOMAINS].some((item) => domain.endsWith(`.${item}`));
}

function generateEmailCode() {
  const values = new Uint32Array(1);
  if (window.crypto?.getRandomValues) window.crypto.getRandomValues(values);
  else values[0] = Math.floor(Math.random() * 1_000_000);
  return String(values[0] % 1_000_000).padStart(6, "0");
}

function mailEndpoint() {
  const stored = String(prefGet("mailEndpoint") || "").trim();
  return (stored || "http://127.0.0.1:4319").replace(/\/+$/, "");
}

async function sendVerificationEmail(pending) {
  if (!pending) return { ok: false, reason: "Nothing to send." };
  const endpoint = mailEndpoint();
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(`${endpoint}/send-code`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: pending.email,
        code: pending.code,
        name: pending.name,
        expiresMinutes: Math.round(EMAIL_CODE_TTL / 60_000)
      }),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || `The mail relay answered ${response.status}.`);
    }
    return { ok: true, at: Date.now() };
  } catch (error) {
    const reason = error?.name === "AbortError"
      ? "The mail relay timed out."
      : (error?.message === "Failed to fetch" ? "The mail relay is not running." : (error?.message || "The mail relay is not reachable."));
    return { ok: false, reason, at: Date.now() };
  } finally {
    window.clearTimeout(timer);
  }
}

async function domainAcceptsMail(domain) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 4000);
  const query = async (type) => {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
      headers: { accept: "application/dns-json" },
      signal: controller.signal
    });
    if (!response.ok) throw new Error("lookup failed");
    return response.json();
  };
  try {
    const [mx, a] = await Promise.allSettled([query("MX"), query("A")]);
    const answered = [mx, a].filter((entry) => entry.status === "fulfilled");
    if (!answered.length) return { ok: true, unknown: true };
    const hasMx = mx.status === "fulfilled" && (mx.value?.Answer || []).some((record) => record.type === 15);
    const hasA = a.status === "fulfilled" && (a.value?.Answer || []).some((record) => record.type === 1 || record.type === 5);
    if (!hasMx && !hasA) return { ok: false };
    return { ok: true, unknown: false };
  } catch {
    return { ok: true, unknown: true };
  } finally {
    window.clearTimeout(timer);
  }
}

function setSignUpBusy(busy, label = "Create account") {
  const button = $("#signUpForm button[type=submit]");
  if (!button) return;
  button.disabled = busy;
  button.textContent = busy ? label : "Create account";
}

function clearVerifyTicker() {
  if (verifyTicker) window.clearInterval(verifyTicker);
  verifyTicker = 0;
}

function updateVerifyMeta() {
  const meta = $("#verifyMeta");
  if (!meta || !pendingSignup) return;
  const left = Math.max(0, pendingSignup.expiresAt - Date.now());
  const minutes = Math.floor(left / 60_000);
  const seconds = Math.floor((left % 60_000) / 1000);
  const attempts = Math.max(0, EMAIL_CODE_ATTEMPTS - pendingSignup.attempts);
  meta.textContent = left <= 0
    ? "That code expired. Resend a fresh one."
    : `Expires in ${minutes}:${String(seconds).padStart(2, "0")} · ${attempts} attempt${attempts === 1 ? "" : "s"} left`;
}

function showVerificationPanel() {
  if (!pendingSignup) return;
  const verifyPanel = $("#verifyPanel");
  const tabs = $("#authTabs");
  $("#signInForm").hidden = true;
  $("#signUpForm").hidden = true;
  if (tabs) tabs.hidden = true;
  if (verifyPanel) verifyPanel.hidden = false;
  $("#verifyEmail").textContent = pendingSignup.email;
  $("#verifyCode").value = "";
  const title = document.querySelector(".auth-copy h1");
  const copy = document.querySelector(".auth-copy p");
  if (title) title.textContent = "Check your inbox";
  if (copy) copy.textContent = "Enter the 6-digit code we emailed you to finish creating your account.";
  setAuthError("");
  renderVerifyDelivery();
  updateVerifyMeta();
  clearVerifyTicker();
  verifyTicker = window.setInterval(updateVerifyMeta, 1000);
  window.setTimeout(() => $("#verifyCode")?.focus(), 60);
}

function renderVerifyDelivery({ reveal = false } = {}) {
  const panel = $("#verifyFallback");
  if (!panel || !pendingSignup) return;
  const local = $("#verifyLocalCode");
  if (local) local.textContent = pendingSignup.code;
  const delivery = pendingSignup.delivery || {};
  const failed = delivery.ok === false;
  const sending = delivery.ok === null;
  panel.hidden = !(reveal || failed);
  const title = $("#verifyFallbackTitle");
  const copy = $("#verifyFallbackCopy");
  if (title) title.textContent = failed ? "We couldn't send the email" : "Your code on this device";
  if (copy) {
    if (sending) copy.textContent = "Sending your code…";
    else if (failed) copy.textContent = `${delivery.reason || "The mail relay is not reachable."} Start the relay with "node mail-relay.mjs" in the Nodum folder, or set your endpoint in Settings → Advanced. Until then, use this code:`;
    else copy.textContent = "Nodum runs in your browser, so it can show the code here when email delivery is unavailable.";
  }
}

function hideVerificationPanel() {
  const verifyPanel = $("#verifyPanel");
  if (verifyPanel) verifyPanel.hidden = true;
  const fallback = $("#verifyFallback");
  if (fallback) fallback.hidden = true;
  const tabs = $("#authTabs");
  if (tabs) tabs.hidden = false;
  clearVerifyTicker();
  pendingSignup = null;
}

async function beginVerification({ name, handle, email, password }) {
  if (isDisposableEmail(email)) {
    setAuthError("That looks like a disposable inbox. Use an email you actually keep.");
    return;
  }
  authBusy = true;
  setSignUpBusy(true, "Checking email…");
  try {
    const result = await domainAcceptsMail(emailDomain(email));
    if (!result.ok) {
      setAuthError("That email domain does not accept mail. Double-check the address.");
      return;
    }
    pendingSignup = {
      name,
      handle,
      email,
      password,
      code: generateEmailCode(),
      expiresAt: Date.now() + EMAIL_CODE_TTL,
      attempts: 0,
      createdAt: Date.now(),
      delivery: { ok: null }
    };
    verifyResendAt = Date.now() + 30_000;
    showVerificationPanel();
    setSignUpBusy(true, "Sending code…");
    pendingSignup.delivery = await sendVerificationEmail(pendingSignup);
    renderVerifyDelivery();
    if (pendingSignup.delivery.ok) toast(`Code sent to ${email}.`, "success");
    else toast("Couldn't send the email. The code is shown in the verify panel.", "error", 5200);
  } finally {
    authBusy = false;
    setSignUpBusy(false);
  }
}

async function resendVerificationCode() {
  if (!pendingSignup) {
    setAuthError("Start creating an account first.");
    return;
  }
  if (pendingSignup.sending) return;
  const wait = verifyResendAt - Date.now();
  if (wait > 0) {
    setAuthError(`Hold on ${Math.ceil(wait / 1000)}s before resending.`);
    return;
  }
  pendingSignup.code = generateEmailCode();
  pendingSignup.expiresAt = Date.now() + EMAIL_CODE_TTL;
  pendingSignup.attempts = 0;
  pendingSignup.delivery = { ok: null };
  pendingSignup.sending = true;
  verifyResendAt = Date.now() + 30_000;
  const input = $("#verifyCode");
  if (input) input.value = "";
  setAuthError("");
  renderVerifyDelivery();
  updateVerifyMeta();
  toast("Sending a new code…", "info");
  try {
    pendingSignup.delivery = await sendVerificationEmail(pendingSignup);
  } finally {
    pendingSignup.sending = false;
  }
  renderVerifyDelivery();
  toast(
    pendingSignup.delivery.ok ? `A fresh code is on its way to ${pendingSignup.email}.` : "Couldn't send the email. The new code is shown in the panel.",
    pendingSignup.delivery.ok ? "success" : "error",
    5000
  );
}

function changeVerificationEmail() {
  const values = pendingSignup;
  hideVerificationPanel();
  setAuthMode("signup");
  if (!values) return;
  $("#signUpName").value = values.name;
  $("#signUpHandle").value = values.handle;
  $("#signUpEmail").value = values.email;
  $("#signUpPassword").value = values.password;
  $("#signUpEmail")?.focus();
}

async function verifyEmailCode() {
  if (!pendingSignup || authBusy) return;
  const input = $("#verifyCode");
  const code = String(input?.value || "").replace(/\D/g, "").slice(0, 6);
  if (code.length !== 6) {
    setAuthError("Enter all 6 digits.");
    return;
  }
  if (Date.now() > pendingSignup.expiresAt) {
    setAuthError("That code expired. Resend a fresh one.");
    updateVerifyMeta();
    return;
  }
  if (pendingSignup.attempts >= EMAIL_CODE_ATTEMPTS) {
    setAuthError("Too many wrong attempts. Resend a new code.");
    return;
  }
  if (code !== pendingSignup.code) {
    pendingSignup.attempts += 1;
    updateVerifyMeta();
    setAuthError("That code is not right. Check the digits and try again.");
    return;
  }
  setAuthError("");
  authBusy = true;
  try {
    await createVerifiedAccount(pendingSignup);
  } finally {
    authBusy = false;
  }
}

async function createVerifiedAccount({ name, handle, email, password }) {
  const auth = loadAuth();
  if (Object.values(auth.accounts).some((account) => account.email === email)) {
    setAuthError("An account already uses that email on this device.");
    return;
  }
  const isFirst = Object.keys(auth.accounts).length === 0;
  const handleTaken = Object.values(world.users).some((user) => (
    user.handle?.toLowerCase() === handle && !(isFirst && user.id === world.ownerId)
  ));
  if (handleTaken) {
    setAuthError("That username is already taken.");
    return;
  }
  let userId;
  if (isFirst) {
    userId = world.ownerId;
    const owner = world.users[userId] || {};
    world.users[userId] = {
      ...owner,
      id: userId,
      name,
      handle,
      pronouns: owner.pronouns || "they/them",
      emoji: (name.trim()[0] || "N").toUpperCase(),
      avatar: owner.avatar?.type === "image" ? owner.avatar : { type: "initial" },
      tone: owner.tone || randomItem(TONE_KEYS),
      status: "online",
      customStatus: owner.customStatus || "",
      bio: owner.bio || "Owner of this corner of the internet.",
      badges: ["owner", "og"],
      displayBadges: ["owner", "og"],
      createdAt: owner.createdAt || new Date().toISOString(),
      activity: owner.activity || "hosting the talk"
    };
  } else {
    userId = uid("user");
    world.users[userId] = {
      id: userId, name, handle, pronouns: "",
      emoji: (name.trim()[0] || "N").toUpperCase(),
      avatar: { type: "initial" },
      tone: randomItem(TONE_KEYS), status: "online",
      customStatus: "just joined Nodum", bio: "New here. Be nice to me.",
      badges: [], displayBadges: [],
      banner: { type: "preset", value: randomItem(BANNER_PRESETS).id }, bannerEffect: "shimmer",
      avatarEffect: "none", decoration: "deco-none", accent: "#8ab4ff",
      shards: 0, plus: false, boostCredits: 0, ownedDecorations: [], decoSales: 0,
      createdAt: new Date().toISOString(), activity: "just joined"
    };
    const server = world.servers[0];
    if (server) {
      if (!server.memberIds.includes(userId)) server.memberIds.push(userId);
      server.members ||= {};
      server.members[userId] = { roleIds: ["role-member"] };
    }
  }
  const salt = randomSalt();
  const hash = await hashPassword(password, salt);
  auth.accounts[userId] = {
    id: userId,
    email,
    salt,
    hash,
    emailVerified: true,
    verifiedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  saveAuth(auth);
  world.rev = (world.rev || 0) + 1;
  saveWorldRaw();
  session = setStoredSession(userId);
  hideVerificationPanel();
  startApp({ welcome: true });
}

async function submitSignIn() {
  if (authBusy) return;
  const email = $("#signInEmail")?.value.trim() || "";
  const password = $("#signInPassword")?.value || "";
  if (!email || !password) {
    setAuthError("Enter your email and password.");
    return;
  }
  const account = accountForEmail(email);
  if (!account) {
    setAuthError("No account matches that email on this device.");
    return;
  }
  setAuthError("");
  authBusy = true;
  try {
    const hash = await hashPassword(password, account.salt);
    if (hash !== account.hash) {
      setAuthError("That password is not right.");
      return;
    }
    if (!world.users[account.id]) {
      setAuthError("That account's profile is missing. Reset the app to start over.");
      return;
    }
    session = setStoredSession(account.id);
    startApp({ welcome: true });
  } finally {
    authBusy = false;
  }
}

/* ---------- Passkeys (WebAuthn) ---------- */

const PASSKEY_RP_NAME = "Nodum";

function passkeysSupported() {
  return Boolean(window.PublicKeyCredential && navigator.credentials?.create && navigator.credentials?.get && window.isSecureContext);
}

function bytesToB64url(bytes) {
  let binary = "";
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  view.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function b64urlToBytes(value) {
  const padded = String(value || "").replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function passkeyChallenge() {
  const bytes = new Uint8Array(32);
  if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
  else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
  return bytes;
}

function passkeyDeviceLabel() {
  const ua = navigator.userAgent;
  const platform = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Macintosh/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "This device";
  const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Browser";
  return `${platform} · ${browser}`;
}

function accountForCredential(rawId) {
  if (!rawId) return null;
  const id = bytesToB64url(new Uint8Array(rawId));
  return Object.values(loadAuth().accounts).find((account) => (account.passkeys || []).some((passkey) => passkey.id === id)) || null;
}

function passkeyErrorMessage(error) {
  if (!error) return "Couldn't use that passkey.";
  if (error.name === "NotAllowedError") return "Passkey sign-in was cancelled or timed out.";
  if (error.name === "InvalidStateError") return "This device already has a passkey for Nodum.";
  if (error.name === "SecurityError") return "Passkeys need HTTPS or localhost.";
  if (error.name === "NotSupportedError") return "This browser doesn't support passkeys.";
  return error.message || "Couldn't use that passkey.";
}

async function registerPasskey() {
  const account = currentAccount();
  if (!account) { toast("Sign in first.", "error"); return; }
  if (!passkeysSupported()) {
    toast(window.isSecureContext ? "This browser can't create passkeys." : "Passkeys need HTTPS or localhost.", "error");
    return;
  }
  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: passkeyChallenge(),
        rp: { name: PASSKEY_RP_NAME },
        user: {
          id: new TextEncoder().encode(account.id),
          name: account.email,
          displayName: me().name
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 }
        ],
        timeout: 60_000,
        attestation: "none",
        authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
        excludeCredentials: (account.passkeys || []).map((passkey) => ({ type: "public-key", id: b64urlToBytes(passkey.id) }))
      }
    });
    if (!credential) return;
    const auth = loadAuth();
    const target = auth.accounts[account.id];
    if (!target) return;
    target.passkeys ||= [];
    target.passkeys.push({
      id: bytesToB64url(new Uint8Array(credential.rawId)),
      label: passkeyDeviceLabel(),
      createdAt: new Date().toISOString()
    });
    saveAuth(auth);
    toast("Passkey added. Use it next time you sign in.", "success");
    refreshSettingsPanel();
  } catch (error) {
    toast(passkeyErrorMessage(error), "error");
  }
}

function removePasskey(passkeyId) {
  const auth = loadAuth();
  const account = auth.accounts[me().id];
  if (!account) return;
  account.passkeys = (account.passkeys || []).filter((passkey) => passkey.id !== passkeyId);
  saveAuth(auth);
  toast("Passkey removed.");
  refreshSettingsPanel();
}

async function signInWithPasskey() {
  if (authBusy) return;
  if (!passkeysSupported()) {
    setAuthError(window.isSecureContext ? "This browser can't use passkeys. Use your password instead." : "Passkeys need HTTPS or localhost. Open Nodum at localhost or use your password.");
    return;
  }
  const email = String($("#signInEmail")?.value || "").trim().toLowerCase();
  const known = email ? accountForEmail(email) : null;
  const allowCredentials = (known?.passkeys || []).map((passkey) => ({ type: "public-key", id: b64urlToBytes(passkey.id) }));
  setAuthError("");
  authBusy = true;
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: passkeyChallenge(),
        timeout: 60_000,
        userVerification: "preferred",
        ...(allowCredentials.length ? { allowCredentials } : {})
      }
    });
    if (!assertion) return;
    let account = null;
    if (assertion.response?.userHandle) {
      try {
        account = loadAuth().accounts[new TextDecoder().decode(assertion.response.userHandle)] || null;
      } catch {
        account = null;
      }
    }
    account ||= accountForCredential(assertion.rawId);
    if (!account) {
      setAuthError("That passkey isn't linked to an account on this device. Sign in with your password, then add it in Settings.");
      return;
    }
    if (!world.users[account.id]) {
      setAuthError("That account's profile is missing. Reset the app to start over.");
      return;
    }
    session = setStoredSession(account.id);
    startApp({ welcome: true });
  } catch (error) {
    setAuthError(passkeyErrorMessage(error));
  } finally {
    authBusy = false;
  }
}

async function submitSignUp() {
  if (authBusy) return;
  const name = String($("#signUpName")?.value || "").trim().slice(0, 32);
  const handle = normalizeHandle($("#signUpHandle")?.value).slice(0, 24);
  const email = String($("#signUpEmail")?.value || "").trim().toLowerCase();
  const password = String($("#signUpPassword")?.value || "");
  if (name.length < 2) {
    setAuthError("Pick a display name with at least 2 characters.");
    return;
  }
  if (handle.length < 2) {
    setAuthError("Pick a username with at least 2 letters, numbers, dots, dashes, or underscores.");
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    setAuthError("Enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    setAuthError("Use a password with at least 6 characters.");
    return;
  }
  const auth = loadAuth();
  if (Object.values(auth.accounts).some((account) => account.email === email)) {
    setAuthError("An account already uses that email on this device.");
    return;
  }
  const isFirst = Object.keys(auth.accounts).length === 0;
  const handleTaken = Object.values(world.users).some((user) => (
    user.handle?.toLowerCase() === handle && !(isFirst && user.id === world.ownerId)
  ));
  if (handleTaken) {
    setAuthError("That username is already taken.");
    return;
  }
  setAuthError("");
  await beginVerification({ name, handle, email, password });
}

function bindAuthScreen() {
  document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
    tab.addEventListener("click", () => setAuthMode(tab.dataset.authTab));
  });
  $("#signInForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSignIn();
  });
  $("#signUpForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitSignUp();
  });
  $("#verifyForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    verifyEmailCode();
  });
  document.querySelector("[data-verify-resend]")?.addEventListener("click", resendVerificationCode);
  document.querySelector("[data-verify-change]")?.addEventListener("click", changeVerificationEmail);
  document.querySelector("[data-verify-fallback]")?.addEventListener("click", () => {
    const panel = $("#verifyFallback");
    if (!panel) return;
    const nextHidden = !panel.hidden;
    if (nextHidden) {
      panel.hidden = true;
    } else {
      renderVerifyDelivery({ reveal: true });
    }
  });
  $("#passkeySignInBtn")?.addEventListener("click", signInWithPasskey);
  $("#verifyCode")?.addEventListener("input", (event) => {
    event.target.value = String(event.target.value || "").replace(/\D/g, "").slice(0, 6);
  });
}

function signOut() {
  closeModal();
  if (session) {
    presence = readPresence();
    delete presence[session.sessionId];
    writePresence();
  }
  clearStoredSession();
  session = null;
  window.location.reload();
}

function me() {
  return world.users[session?.userId] || world.users[world.ownerId] || Object.values(world.users)[0];
}

function registerPresence() {
  presence = readPresence();
  prunePresence(presence);
  presence[session.sessionId] = {
    sessionId: session.sessionId,
    userId: session.userId,
    lastSeen: Date.now(),
    view: ui.view,
    location: { serverId: ui.view === "server" ? ui.activeServer : null, channelId: ui.view === "server" ? getActiveChannel()?.id || null : null, dmId: ui.activeDM || null },
    voice: voiceState?.joined ? { serverId: voiceState.serverId, channelId: voiceState.channelId } : null,
    muted: Boolean(voiceState?.muted),
    deafened: Boolean(voiceState?.deafened)
  };
  writePresence();
  if (bus) {
    try {
      bus.postMessage({ type: "presence", entry: presence[session.sessionId] });
    } catch {
      /* ignore */
    }
  }
}

function startHeartbeat() {
  window.clearInterval(heartbeatTimer);
  heartbeatTimer = window.setInterval(() => {
    registerPresence();
    syncWorldFromStorage();
    if (prunePresence(presence)) {
      writePresence();
      renderMembersOnly();
    }
    syncVoicePeers();
  }, 5_000);
}

function presenceFor(userId) {
  return Object.values(presence).find((entry) => entry.userId === userId) || null;
}

function isUserOnline(user) {
  if (!user) return false;
  if (user.id === me().id) return user.status !== "invisible";
  if (presenceFor(user.id)) return true;
  return user.status === "online" || user.status === "idle" || user.status === "dnd";
}

function activeVoiceSessions() {
  return Object.values(presence).filter((entry) => entry.voice?.channelId && entry.sessionId !== session?.sessionId);
}

/* ---------- Queries ---------- */

function getUser(id) {
  return world.users[id] || {
    id: "unknown", name: "Mystery Yapper", handle: "unknown", emoji: "❓", tone: "violet",
    status: "offline", bio: "No one knows.", badges: [], displayBadges: [], banner: { type: "preset", value: "mono" },
    decoration: "deco-none", avatarEffect: "none", createdAt: new Date().toISOString()
  };
}

function getServer(id) {
  return world.servers.find((server) => server.id === id) || world.servers[0];
}

function getActiveServer() {
  return getServer(ui.activeServer);
}

function allChannels(server = getActiveServer()) {
  return server.categories.flatMap((category) => category.channels);
}

function findChannel(channelId) {
  for (const server of world.servers) {
    for (const category of server.categories) {
      const channel = category.channels.find((item) => item.id === channelId);
      if (channel) return { channel, category, server };
    }
  }
  return null;
}

function getActiveChannel() {
  const server = getActiveServer();
  const preferred = ui.activeChannels[server.id];
  const channels = server.categories.flatMap((category) => category.channels).filter((channel) => canViewChannel(server, channel));
  return channels.find((channel) => channel.id === preferred) || channels[0];
}

function getDm(dmId) {
  return world.dms[dmId] || null;
}

function dmFor(a, b) {
  return world.dms[dmIdFor(a, b)] || null;
}

function ensureDm(a, b) {
  const id = dmIdFor(a, b);
  if (!world.dms[id]) {
    world.dms[id] = { id, participants: [a, b], messages: [], createdAt: new Date().toISOString() };
  }
  return world.dms[id];
}

function getMemberRoleIds(server, userId) {
  return server.members?.[userId]?.roleIds || (server.ownerId === userId ? ["role-owner"] : ["role-member"]);
}

function getMemberRoles(server, userId) {
  const ids = getMemberRoleIds(server, userId);
  return server.roles.filter((role) => ids.includes(role.id)).sort((a, b) => (b.position || 0) - (a.position || 0));
}

function getTopRole(server, userId) {
  if (!server) return null;
  return getMemberRoles(server, userId)[0] || server.roles.find((role) => role.id === "role-member") || null;
}

function roleColor(server, userId) {
  const coloured = getMemberRoles(server, userId).find((role) => role.color && role.color !== "transparent");
  return coloured?.color || "var(--text)";
}

function isMember(server, userId) {
  return Boolean(server?.memberIds?.includes(userId));
}

function isBlocked(userId) {
  return (world?.blockedIds || []).includes(userId);
}

function memberHasPerm(server, userId, perm) {
  if (!server) return false;
  if (server.ownerId === userId) return true;
  const roles = getMemberRoles(server, userId);
  return roles.some((role) => role.permissions?.includes("administrator") || role.permissions?.includes(perm));
}

function canViewChannel(server, channel) {
  if (!server || !channel) return false;
  return memberHasPerm(server, me().id, "viewChannels");
}

function canModerateGlobal() {
  if ((world.staffTeam || []).includes(me().id)) return true;
  const badges = me().badges || [];
  if (badges.includes("owner") || badges.includes("headmod") || badges.includes("moderator")) return true;
  return world.servers.some((server) => memberHasPerm(server, me().id, "manageCommunity"));
}

function canCreateServer() {
  return true;
}

function getUserBadges(user) {
  const badges = [...new Set(user?.badges || [])];
  return BADGE_ORDER.filter((id) => badges.includes(id));
}

function decorationLibrary() {
  return [...BUILTIN_DECORATIONS, ...(world.decorations || []).filter((deco) => deco.status === "approved")];
}

function decorationById(id, user = me()) {
  const deco = decorationLibrary().find((item) => item.id === id) || BUILTIN_DECORATIONS[0];
  if (!decorationUnlocked(deco, user)) return BUILTIN_DECORATIONS[0];
  return deco;
}

function decorationUnlocked(deco, user = me()) {
  if (!deco) return false;
  if (!Number(deco.price) || deco.authorId === user?.id) return true;
  return (user?.ownedDecorations || []).includes(deco.id);
}

function usableDecorationLibrary(user = me()) {
  return decorationLibrary().filter((deco) => decorationUnlocked(deco, user));
}

function pendingSubmissions() {
  return (world.submissions || []).filter((sub) => sub.status === "pending");
}

function myShards() {
  const user = me();
  if (user && !Number.isFinite(Number(user.shards))) user.shards = Number(prefs.shards || 0);
  return Math.max(0, Math.round(Number(user?.shards ?? prefs.shards ?? 0)));
}

function addShards(delta, reason, { commit = true } = {}) {
  const amount = Math.round(Number(delta) || 0);
  if (!amount) return 0;
  const before = myShards();
  const next = Math.max(0, before + amount);
  const applied = next - before;
  if (!applied) return 0;
  const user = me();
  user.shards = next;
  prefs.shards = next;
  if (reason) {
    prefs.shardHistory = [{ amount: applied, at: new Date().toISOString(), reason }, ...(prefs.shardHistory || [])].slice(0, 80);
  }
  savePrefs();
  if (commit) commitWorld({ render: false });
  return applied;
}

function syncUserEconomy() {
  const user = me();
  if (!user) return;
  let changed = false;
  if (!Number.isFinite(Number(user.shards))) {
    user.shards = Number(prefs.shards || 0);
    changed = true;
  }
  if (Number(prefs.shards || 0) !== Number(user.shards || 0)) {
    prefs.shards = Number(user.shards || 0);
    savePrefs();
  }
  if (typeof user.plus !== "boolean") {
    user.plus = Boolean(prefs.plus);
    changed = true;
  }
  if (user.plusSince === undefined) { user.plusSince = user.plus ? new Date().toISOString() : null; changed = true; }
  if (!Number.isFinite(Number(user.boostCredits))) {
    user.boostCredits = 0;
    changed = true;
  }
  if (typeof user.showPlusBadge !== "boolean") {
    user.showPlusBadge = prefs.plusBadge !== false;
    changed = true;
  }
  if (!Array.isArray(user.ownedDecorations)) {
    user.ownedDecorations = [];
    changed = true;
  }
  if (changed) commitWorld({ render: false });
}

function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

function chatRewardToday() {
  const today = dayKey();
  if (!prefs.chatReward || prefs.chatReward.day !== today) {
    return { day: today, count: 0, earned: 0, streak: Number(prefs.chatReward?.streak || 0), lastDay: prefs.chatReward?.lastDay || null };
  }
  return { ...prefs.chatReward };
}

function chatShardCap() {
  return me()?.plus ? 60 : 30;
}

function awardChatShards() {
  const user = me();
  if (!user) return;
  const reward = chatRewardToday();
  const previous = prefs.chatReward;
  if (previous?.day !== reward.day) {
    reward.streak = previous?.lastDay === yesterdayKey() ? Number(previous.streak || 0) + 1 : 1;
    reward.lastDay = reward.day;
    const bonusBase = Math.min(5, reward.streak);
    const bonus = Math.min(bonusBase * (user.plus ? 2 : 1), Math.max(0, chatShardCap() - reward.earned));
    if (bonus > 0) {
      addShards(bonus, `Day ${reward.streak} chat streak`, { commit: false });
      reward.earned += bonus;
      toast(`Day ${reward.streak} chat streak · +${bonus} shards`);
    }
  }
  reward.count += 1;
  if (reward.count % 8 === 0 && reward.earned < chatShardCap()) {
    const amount = Math.min(user.plus ? 2 : 1, chatShardCap() - reward.earned);
    if (amount > 0) {
      addShards(amount, "Chat activity", { commit: false });
      reward.earned += amount;
    }
  }
  prefs.chatReward = reward;
  savePrefs();
}

function pendingStaffApplications() {
  return (world.staffApplications || []).filter((app) => app.status === "pending");
}

function staffApplicationFor(userId = me().id) {
  return (world.staffApplications || [])
    .filter((app) => app.userId === userId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0] || null;
}

function pendingPlusOrders() {
  return (world.plusOrders || []).filter((order) => order.status === "pending");
}

function myPlusOrder() {
  return (world.plusOrders || [])
    .filter((order) => order.userId === me().id && order.status === "pending")
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0] || null;
}

function myBoostCredits() {
  return Math.max(0, Number(me()?.boostCredits || 0));
}

function marketPriceFor(user, deco) {
  const base = Math.max(0, Math.round(Number(deco?.price) || 0));
  if (!base) return 0;
  return Math.max(1, Math.ceil(base * (user?.plus ? 0.8 : 1)));
}

function activatePlus(userId) {
  const user = getUser(userId);
  if (!user) return false;
  user.plus = true;
  user.plusSince ||= new Date().toISOString();
  user.boostCredits = Math.max(0, Number(user.boostCredits || 0)) + 2;
  if (typeof user.showPlusBadge !== "boolean") user.showPlusBadge = true;
  if (user.id === me().id) {
    prefs.plus = true;
    prefs.plusBadge = user.showPlusBadge !== false;
    savePrefs();
  }
  return true;
}

function boostServer(serverId) {
  const server = getServer(serverId);
  const user = me();
  if (!server) return;
  if (!isMember(server, user.id) && server.ownerId !== user.id) {
    toast("Join that server before boosting it.", "error");
    return;
  }
  const credits = myBoostCredits();
  if (credits < 1) {
    toast("No boosts left. Plus grants 2 boosts when it is approved.", "error");
    return;
  }
  user.boostCredits = credits - 1;
  server.boostCount = Math.max(0, Number(server.boostCount || 0)) + 1;
  server.boosts ||= [];
  server.boosts.unshift({ userId: user.id, at: new Date().toISOString() });
  commitWorld({ render: false });
  renderApp();
  toast(`${server.name} boosted · ${user.boostCredits} boost${user.boostCredits === 1 ? "" : "s"} left.`, "success");
  if (activeModal?.classList.contains("server-settings-modal")) {
    openServerSettings(server.id, settingsDraft?.tab || "overview");
  } else if (activeModal?.classList.contains("settings-modal-new")) {
    refreshSettingsPanel(activeModal);
  }
}

function buyDecoration(decorationId) {
  const deco = decorationLibrary().find((item) => item.id === decorationId);
  const buyer = me();
  if (!deco || !buyer) return;
  if (deco.authorId === buyer.id) {
    toast("That frame is already yours.", "info");
    return;
  }
  if (decorationUnlocked(deco, buyer)) {
    toast("You already own that frame.", "info");
    return;
  }
  const price = marketPriceFor(buyer, deco);
  if (!price) {
    toast("That frame is free. Pick it in your profile editor.", "info");
    return;
  }
  const balance = myShards();
  if (balance < price) {
    toast(`You need ${price - balance} more shards for that frame.`, "error");
    return;
  }
  addShards(-price, `Bought ${deco.name}`, { commit: false });
  buyer.ownedDecorations = [...new Set([...(buyer.ownedDecorations || []), deco.id])];
  const seller = deco.authorId ? getUser(deco.authorId) : null;
  if (seller) {
    seller.shards = Math.max(0, Number(seller.shards || 0)) + price;
    seller.decoSales = Math.max(0, Number(seller.decoSales || 0)) + 1;
  }
  commitWorld({ render: false });
  renderApp();
  toast(`Bought ${deco.name} for ${price} shards.`, "success");
  openDecorationStudio();
}

function priceDecoration(decorationId) {
  const deco = (world.decorations || []).find((item) => item.id === decorationId);
  if (!deco) {
    toast("Approved decorations only. Submit it first.", "info");
    return;
  }
  if (deco.authorId !== me().id && !canModerateGlobal()) {
    toast("Only the creator can set that price.", "error");
    return;
  }
  const answer = window.prompt("Price in shards (0 makes it free):", String(Math.max(0, Number(deco.price) || 0)));
  if (answer === null) return;
  const price = Math.max(0, Math.min(5000, Math.round(Number(answer) || 0)));
  deco.price = price;
  (world.submissions || []).forEach((sub) => {
    if (sub.decoration?.id === deco.id) sub.decoration.price = price;
  });
  commitWorld({ render: false });
  toast(price ? `${deco.name} listed for ${price} shards.` : `${deco.name} is free again.`);
  openDecorationStudio();
}

function submitStaffApplication(root) {
  const answer = (selector) => String(root.querySelector(selector)?.value || "").trim();
  const why = answer("#staffWhy");
  const time = answer("#staffTime");
  const experience = answer("#staffExperience");
  const scenario = answer("#staffScenario");
  const age = Boolean(root.querySelector("#staffAge")?.checked);
  const rules = Boolean(root.querySelector("#staffRules")?.checked);
  if (why.length < 30) {
    toast("Tell us why you want the role in at least 30 characters.", "error");
    return;
  }
  if (time.length < 2) {
    toast("Add how much time you can moderate each week.", "error");
    return;
  }
  if (experience.length < 30) {
    toast("Describe your moderation experience in at least 30 characters.", "error");
    return;
  }
  if (scenario.length < 30) {
    toast("Answer the raid scenario in at least 30 characters.", "error");
    return;
  }
  if (!age || !rules) {
    toast("Confirm you are 18+ and agree to the staff guidelines.", "error");
    return;
  }
  if (staffApplicationFor(me().id)?.status === "pending") {
    toast("You already have an application waiting for review.", "error");
    return;
  }
  world.staffApplications ||= [];
  world.staffApplications.unshift({
    id: uid("staffapp"),
    userId: me().id,
    status: "pending",
    submittedAt: new Date().toISOString(),
    answers: { why, time, experience, scenario, age: true, rules: true },
    note: ""
  });
  prefs.staffApplication = { submittedAt: new Date().toISOString(), status: "pending" };
  savePrefs();
  commitWorld({ render: false });
  toast("Staff application submitted. Moderators can review it now.", "success");
  refreshSettingsPanel(root);
}

function withdrawStaffApplication(root) {
  const app = staffApplicationFor(me().id);
  if (!app || app.status !== "pending") return;
  app.status = "withdrawn";
  app.reviewedAt = new Date().toISOString();
  app.reviewedBy = me().id;
  app.note = "Withdrawn by applicant.";
  prefs.staffApplication = { submittedAt: app.submittedAt, status: "withdrawn" };
  savePrefs();
  commitWorld({ render: false });
  toast("Application withdrawn.");
  refreshSettingsPanel(root);
}

function reviewStaffApplication(applicationId, status, root) {
  if (!canModerateGlobal()) {
    toast("You need a moderator role to review staff applications.", "error");
    return;
  }
  const app = (world.staffApplications || []).find((item) => item.id === applicationId);
  if (!app || app.status !== "pending") return;
  const note = root.querySelector(`[data-staff-app-id="${applicationId}"] .staff-app-note`)?.value || "";
  app.status = status;
  app.note = note;
  app.reviewedAt = new Date().toISOString();
  app.reviewedBy = me().id;
  const user = getUser(app.userId);
  if (status === "accepted" && user) {
    world.staffTeam = [...new Set([...(world.staffTeam || []), user.id])];
    user.badges = [...new Set([...(user.badges || []), "moderator"])];
    user.displayBadges = [...new Set([...(user.displayBadges || []), "moderator"])];
    if (user.id === me().id) {
      prefs.staffApplication = { submittedAt: app.submittedAt, status: "accepted" };
      savePrefs();
    }
  } else if (user?.id === me().id) {
    prefs.staffApplication = { submittedAt: app.submittedAt, status };
    savePrefs();
  }
  commitWorld({ render: false });
  renderApp();
  toast(status === "accepted" ? `${user?.name || "Member"} joined the staff team.` : `Declined ${user?.name || "the application"}.`, status === "accepted" ? "success" : "info");
  if (app.userId === me().id) {
    closeModal();
    openSettings("staff");
    return;
  }
  refreshSettingsPanel(root);
}

function openPlusOrder() {
  if (me().plus) {
    toast("Plus is already active. Your boosts are in the Plus panel.", "info");
    return;
  }
  if (myPlusOrder()) {
    toast("You already have a Plus request waiting for approval.", "info");
    return;
  }
  const body = `
    <div class="plus-order-intro">
      <span class="plus-mark">${icon("crown")}</span>
      <div><strong>Nodum Plus · 1,000 Robux gamepass</strong><p>This local build cannot charge Robux. Buying the gamepass is optional and happens in Roblox; Nodum only records your request here so a moderator can approve it.</p></div>
    </div>
    <div class="settings-card">
      <div class="settings-row"><div><strong>Step 1</strong><small>Open Roblox, buy or create the Nodum Plus gamepass for 1,000 Robux.</small></div><span class="status-pill">1,000 R$</span></div>
      <div class="settings-row"><div><strong>Step 2</strong><small>Paste your Roblox username or the gamepass link below so a moderator can check it.</small></div></div>
    </div>
    <div class="form-stack">
      <label class="field"><span>Roblox username or gamepass link</span><input id="plusOrderReference" maxlength="120" placeholder="YourRobloxName or https://www.roblox.com/game-pass/..."></label>
      <label class="field"><span>Note for moderators (optional)</span><textarea id="plusOrderNote" rows="3" maxlength="200" placeholder="Anything that helps us find the purchase."></textarea></label>
      <p class="field-hint">${icon("info")} Nodum never asks for your Roblox password. Approval is manual and local. No real money or Robux is handled by this app.</p>
      <div class="confirm-actions">
        <button class="ghost-btn" type="button" data-close>Cancel</button>
        <button class="primary-btn" type="button" data-action="submit-plus-order">${icon("send")} Send request</button>
      </div>
    </div>`;
  openRawModal(body, { className: "plus-order-modal" });
}

function submitPlusOrder() {
  const root = activeModal;
  if (!root) return;
  const reference = String(root.querySelector("#plusOrderReference")?.value || "").trim();
  const note = String(root.querySelector("#plusOrderNote")?.value || "").trim().slice(0, 200);
  if (reference.length < 3) {
    toast("Add your Roblox username or a gamepass link.", "error");
    return;
  }
  if (myPlusOrder()) {
    toast("You already have a Plus request waiting.", "error");
    return;
  }
  world.plusOrders ||= [];
  world.plusOrders.unshift({
    id: uid("plusorder"),
    userId: me().id,
    kind: "plus",
    cost: 1000,
    reference,
    note,
    status: "pending",
    submittedAt: new Date().toISOString()
  });
  commitWorld({ render: false });
  closeModal();
  openSettings("plus");
  toast("Request sent. A moderator can approve it from Plus orders.", "success");
}

function reviewPlusOrder(orderId, status, root) {
  if (!canModerateGlobal()) {
    toast("You need a moderator role to review Plus orders.", "error");
    return;
  }
  const order = (world.plusOrders || []).find((item) => item.id === orderId);
  if (!order || order.status !== "pending") return;
  const note = root.querySelector(`[data-plus-order-id="${orderId}"] .plus-order-note`)?.value || "";
  order.status = status;
  order.note = note;
  order.reviewedAt = new Date().toISOString();
  order.reviewedBy = me().id;
  const user = getUser(order.userId);
  if (status === "approved" && user) {
    activatePlus(user.id);
    order.grantedBoosts = 2;
  }
  commitWorld({ render: false });
  renderApp();
  toast(status === "approved" ? `Plus activated for ${user?.name || "the member"}.` : `Declined the Plus request from ${user?.name || "the member"}.`, status === "approved" ? "success" : "info");
  refreshSettingsPanel(root);
}

function getReads(userId = me().id) {
  world.reads ||= {};
  world.reads[userId] ||= {};
  return world.reads[userId];
}

function markRead(key, { commit = false } = {}) {
  const reads = getReads();
  if (!reads[key] || Date.now() - reads[key] > 500) {
    reads[key] = Date.now();
    if (commit) commitWorld({ render: false });
    else saveWorldRaw();
  }
}

function unreadForChannel(channel) {
  const messages = world.messages[channel.id] || [];
  const readAt = getReads()[channel.id] || 0;
  return messages.filter((message) => new Date(message.createdAt).getTime() > readAt && message.authorId !== me().id).length;
}

function unreadForDm(dm) {
  if (!dm) return 0;
  const readAt = getReads()[dm.id] || 0;
  return dm.messages.filter((message) => new Date(message.createdAt).getTime() > readAt && message.authorId !== me().id).length;
}

function totalUnreadDms() {
  return Object.values(world.dms).reduce((sum, dm) => {
    if (!dm.participants?.includes(me().id)) return sum;
    return sum + unreadForDm(dm);
  }, 0);
}

function totalMentions() {
  const handle = `@${me().handle}`.toLowerCase();
  let count = 0;
  Object.entries(world.messages).forEach(([channelId, list]) => {
    const found = findChannel(channelId);
    const roleMentions = found
      ? getMemberRoles(found.server, me().id).map((role) => `@${role.name.toLowerCase()}`)
      : [];
    (list || []).forEach((message) => {
      if (message.authorId === me().id) return;
      const text = (message.text || "").toLowerCase();
      const special = /(^|\s)@(everyone|here)\b/.test(text);
      const roleHit = roleMentions.some((mention) => text.includes(mention));
      if (text.includes(handle) || special || roleHit) count += 1;
    });
  });
  Object.values(world.dms).forEach((dm) => {
    if (!dm.participants?.includes(me().id)) return;
    dm.messages.forEach((message) => {
      if (message.authorId !== me().id) count += 1;
    });
  });
  return count;
}

function serverUnread(server) {
  return server.categories.flatMap((category) => category.channels).reduce((sum, channel) => sum + (channel.type === "text" ? unreadForChannel(channel) : 0), 0);
}

/* ---------- Navigation ---------- */

function saveDraft() {
  const input = $("#messageInput");
  if (input && ui) {
    const key = ui.activeDM ? `dm:${ui.activeDM}` : `ch:${getActiveChannel()?.id}`;
    drafts[key] = input.value;
  }
}

function goServer(serverId, channelId = null) {
  saveDraft();
  const server = getServer(serverId);
  if (!server) return;
  ui.view = "server";
  ui.activeServer = server.id;
  const channels = server.categories.flatMap((category) => category.channels).filter((channel) => canViewChannel(server, channel));
  const next = channelId ? channels.find((channel) => channel.id === channelId) : null;
  ui.activeChannels[server.id] = next?.id || ui.activeChannels[server.id] || channels[0]?.id;
  if (!channels.some((channel) => channel.id === ui.activeChannels[server.id])) ui.activeChannels[server.id] = channels[0]?.id || null;
  const channel = getActiveChannel();
  if (channel) markRead(channel.id);
  saveUi();
  registerPresence();
  renderApp({ scroll: true });
}

function goChannel(channelId) {
  const found = findChannel(channelId);
  if (!found) return;
  if (!isMember(found.server, me().id) && found.server.ownerId !== me().id) {
    toast(`Join ${found.server.name} first.`, "error");
    return;
  }
  goServer(found.server.id, found.channel.id);
}

function goHome(dmId = null) {
  saveDraft();
  ui.view = "home";
  ui.activeDM = dmId;
  if (dmId) markRead(dmId);
  saveUi();
  registerPresence();
  renderApp({ scroll: true });
}

function goFriends(tab = "online") {
  saveDraft();
  ui.view = "home";
  ui.activeDM = null;
  ui.friendTab = tab;
  saveUi();
  registerPresence();
  renderApp();
}

function openDmWith(userId) {
  if (userId === me().id) {
    openProfile(userId);
    return;
  }
  if (isBlocked(userId)) {
    toast(`Unblock ${getUser(userId).name} before messaging them.`, "error");
    return;
  }
  const dm = ensureDm(me().id, userId);
  saveWorldRaw();
  goHome(dm.id);
}

function jumpToMessage(channelId, messageId, serverId = null) {
  closeModal();
  if (channelId.startsWith("dm-")) {
    goHome(channelId.replace(/^dm-/, ""));
    window.setTimeout(() => flashMessage(messageId), 80);
    return;
  }
  const found = findChannel(channelId);
  if (!found) return;
  goServer(found.server.id, channelId);
  window.setTimeout(() => flashMessage(messageId), 120);
}

/* ---------- Text + avatar helpers ---------- */

function renderMentions(safe, server = null) {
  const boundary = (ch) => !ch || !/[A-Za-z0-9_.-]/.test(ch);
  const roles = (server?.roles || [])
    .filter((role) => role.name)
    .map((role) => ({ role, name: escapeHtml(role.name) }))
    .sort((a, b) => b.name.length - a.name.length);
  const members = (server ? server.memberIds.map(getUser) : Object.values(world.users))
    .filter(Boolean)
    .map((user) => ({ user, handle: escapeHtml(user.handle || "") }))
    .filter((entry) => entry.handle)
    .sort((a, b) => b.handle.length - a.handle.length);
  let out = "";
  for (let i = 0; i < safe.length; i++) {
    const char = safe[i];
    if (char !== "@") {
      out += char;
      continue;
    }
    const prev = safe[i - 1] || "";
    if (prev && /[A-Za-z0-9_.-]/.test(prev)) {
      out += char;
      continue;
    }
    const rest = safe.slice(i + 1);
    const lower = rest.toLowerCase();
    const special = ["everyone", "here"].find((word) => lower.startsWith(word) && boundary(rest[word.length]));
    if (special) {
      out += `<span class="mention mention-special" title="${special === "here" ? "Online members" : "Everyone"}">@${special}</span>`;
      i += special.length;
      continue;
    }
    const roleHit = roles.find((entry) => lower.startsWith(entry.name.toLowerCase()) && boundary(rest[entry.name.length]));
    if (roleHit) {
      out += `<span class="mention mention-role" style="--mention-role:${escapeAttr(roleHit.role.color || "var(--accent)")}" title="Role mention">@${roleHit.name}</span>`;
      i += roleHit.name.length;
      continue;
    }
    const memberHit = members.find((entry) => lower.startsWith(entry.handle.toLowerCase()) && boundary(rest[entry.handle.length]));
    if (memberHit) {
      out += `<button class="mention mention-user" type="button" data-profile="${escapeAttr(memberHit.user.id)}">@${memberHit.handle}</button>`;
      i += memberHit.handle.length;
      continue;
    }
    out += char;
  }
  return out;
}

function richText(text, { server = null } = {}) {
  let safe = escapeHtml(text || "");
  safe = safe.replace(/```([\s\S]*?)```/g, (_, code) => `<pre class="inline-pre">${code.trim()}</pre>`);
  safe = safe.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  safe = safe.replace(/~~([^~]+)~~/g, "<s>$1</s>");
  safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  safe = safe.replace(/(^|[\s>])(https?:\/\/[^\s<]+)/g, (match, lead, url) => `${lead}<a href="${url}" target="_blank" rel="noreferrer">${url}</a>`);
  safe = renderMentions(safe, server);
  safe = safe.replace(/\n/g, "<br>");
  return safe;
}

function bannerClass(banner) {
  return banner?.type === "image" ? "banner-image" : `banner-${banner?.value || "aurora"}`;
}

function bannerStyle(banner) {
  if (banner?.type === "image" && banner.value) {
    return `background-image:url('${escapeAttr(banner.value)}')`;
  }
  return "";
}

function serverIconHtml(server, cls = "server-icon") {
  if (server.icon?.type === "image" && server.icon.value) {
    return `<span class="${cls} has-image"><img src="${escapeAttr(server.icon.value)}" alt=""></span>`;
  }
  return `<span class="${cls}" data-tone="${escapeAttr(server.tone || "coral")}">${escapeHtml(server.icon?.value || server.name.slice(0, 1))}</span>`;
}

function avatarCore(user, size = "avatar-40") {
  if (user.avatar?.type === "image" && user.avatar.value) {
    return `<span class="avatar ${size} has-image" data-status="${escapeAttr(user.status || "offline")}"><img src="${escapeAttr(user.avatar.value)}" alt=""></span>`;
  }
  if (user.avatar?.type === "initial") {
    const initial = (user.name || "N").trim().charAt(0).toUpperCase() || "N";
    return `<span class="avatar avatar-initial ${size}" data-tone="${escapeAttr(user.tone || "coral")}" data-status="${escapeAttr(user.status || "offline")}">${escapeHtml(initial)}</span>`;
  }
  return `<span class="avatar ${size}" data-tone="${escapeAttr(user.tone || "coral")}" data-status="${escapeAttr(user.status || "offline")}">${escapeHtml(user.emoji || "🙂")}</span>`;
}

function avatarWrap(user, size = "avatar-40", extraClass = "") {
  const deco = decorationById(user.decoration || "deco-none", user);
  const decoStyle = deco.style && deco.style !== "none"
    ? `data-deco="${escapeAttr(deco.style)}" style="--deco-a:${escapeAttr(deco.colorA)};--deco-b:${escapeAttr(deco.colorB)};--deco-speed:${Number(deco.speed) || 7}s;--deco-icon:'${escapeAttr(deco.icon || "✦")}'"`
    : "";
  const image = deco.image ? `<img class="avatar-deco-image" src="${escapeAttr(deco.image)}" alt="" aria-hidden="true">` : "";
  const plusRing = user.plus ? `<span class="plus-ring" aria-hidden="true"></span>` : "";
  return `<span class="avatar-wrap ${decoStyle ? "has-deco" : ""} ${plusRing ? "is-plus" : ""} ${extraClass}" data-effect="${escapeAttr(user.avatarEffect || "none")}" ${decoStyle}>${avatarCore(user, size)}${plusRing}${image}<span class="avatar-deco" aria-hidden="true"></span></span>`;
}

function badgeIconHtml(id, size = 18) {
  const badge = BADGES[id];
  if (!badge) return "";
  return `<span class="badge-icon badge-${escapeAttr(id)}" style="--badge-a:${badge.a};--badge-b:${badge.b};--badge-size:${size}px" title="${escapeAttr(badge.label)}: ${escapeAttr(badge.about)}">${icon(badge.path)}</span>`;
}

function badgePillHtml(id) {
  const badge = BADGES[id];
  if (!badge) return "";
  return `<span class="badge-pill" style="--badge-a:${badge.a};--badge-b:${badge.b}" title="${escapeAttr(badge.about)}"><span class="badge-pill-icon">${icon(badge.path)}</span><span>${escapeHtml(badge.label)}</span></span>`;
}

function plusBadgeHtml(user) {
  if (!user?.plus || user.showPlusBadge === false) return "";
  return `<span class="plus-tag" title="Nodum Plus">PLUS</span>`;
}

function roleBadgeHtml(role, userId = null) {
  if (!role) return "";
  if (userId && userId !== world.ownerId) return "";
  if (role.badgeId && BADGES[role.badgeId]) return badgeIconHtml(role.badgeId, 16);
  return "";
}

function compactBadges(user, server = null, limit = 3) {
  const ids = getUserBadges(user, server);
  return ids.slice(0, limit).map((id) => badgeIconHtml(id, 16)).join("");
}

function fullBadges(user, server = null) {
  return getUserBadges(user, server).map(badgePillHtml).join("");
}

function roleIconHtml(role, size = 16) {
  if (!role) return "";
  if (role.iconImage) {
    return `<img class="role-icon" src="${escapeAttr(role.iconImage)}" alt="" style="--role-icon-size:${size}px" loading="lazy">`;
  }
  if (role.iconEmoji) {
    return `<span class="role-icon role-icon-emoji" style="--role-icon-size:${size}px" aria-hidden="true">${escapeHtml(role.iconEmoji)}</span>`;
  }
  if (role.badgeIcon) {
    return `<span class="role-icon role-icon-lucide" style="--role-icon-size:${size}px" aria-hidden="true">${icon(role.badgeIcon)}</span>`;
  }
  return "";
}

/* Custom emoji/image icons only. Used where the legacy line-art badges
   would add too much noise, like next to member names. */
function roleCustomIconHtml(role, size = 14) {
  if (!role || (!role.iconImage && !role.iconEmoji)) return "";
  return roleIconHtml(role, size);
}

function roleChips(server, userId) {
  return getMemberRoles(server, userId)
    .filter((role) => role.id !== "role-member")
    .map((role) => `<span class="role-chip" style="--role-color:${escapeAttr(role.color)}">${roleIconHtml(role, 10)}${escapeHtml(role.name)}</span>`)
    .join("");
}

function statusLabel(user) {
  if (user.id === me().id && voiceState?.joined) return `Voice · ${findChannel(voiceState.channelId)?.channel.name || "connected"}`;
  return user.customStatus || user.activity || ({ online: "online", idle: "idle", dnd: "do not disturb", invisible: "invisible", offline: "offline" }[user.status] || "yapping");
}

function initials(value) {
  return String(value || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

/* ---------- Server templates ---------- */

const SERVER_TEMPLATE = {
  id: "community", label: "Community", blurb: "A cozy all-purpose hangout with announcements, chat, and voice.",
  icon: "🪩", banner: "aurora",
  categories: [
    { name: "START HERE", channels: [
      { name: "lobby", type: "text", topic: "Say hi, get cozy, and jump into the yap." },
      { name: "announcements", type: "text", topic: "The important stuff. Read-only, low chaos.", readOnly: true },
      { name: "rules", type: "text", topic: "The house rules. Short version: be a person.", readOnly: true }
    ] },
    { name: "YAP CENTRAL", channels: [
      { name: "general", type: "text", topic: "The town square. Yap responsibly." },
      { name: "hot-takes", type: "text", topic: "Unpopular opinions welcome. Emotional damage possible." },
      { name: "memes", type: "text", topic: "Posting through the pain, one meme at a time." }
    ] },
    { name: "LOUNGE", channels: [
      { name: "The Lounge", type: "voice", topic: "Lo-fi, low stakes, high yap.", userLimit: 12 },
      { name: "Focus Room", type: "voice", topic: "Co-working in comfortable silence.", userLimit: 6 }
    ] }
  ]
};

/* =========================================================
   Rendering
   ========================================================= */

function renderApp({ scroll = false } = {}) {
  if (!world || !ui || !session) return;
  mentionState = null;
  renderTopbar();
  renderRail();
  renderSidebar();
  renderMain({ scroll });
  hydrateIcons(document);
  updateTopbarBadges();
  saveUi();
}

function renderTopbar() {
  const user = me();
  const topAvatar = $("#topAvatarWrap");
  if (topAvatar) topAvatar.innerHTML = avatarCore(user, "avatar-32");
  $("#topProfileBtn")?.classList.toggle("is-active", ui.view === "home");
}

function updateTopbarBadges() {
  const dmBadge = $("#dmBadge");
  const notifBadge = $("#notifBadge");
  const dms = totalUnreadDms();
  const mod = canModerateGlobal()
    ? pendingSubmissions().length + pendingStaffApplications().length + pendingPlusOrders().length
    : 0;
  const requests = (world.friendRequests || []).length;
  const notes = dms + mod + requests + (totalMentions() > 0 ? 1 : 0);
  if (dmBadge) {
    dmBadge.hidden = dms === 0;
    dmBadge.textContent = dms > 9 ? "9+" : String(dms);
  }
  if (notifBadge) {
    notifBadge.hidden = notes === 0;
    notifBadge.textContent = notes > 9 ? "9+" : String(notes);
  }
}

function renderRail() {
  const list = $("#serverList");
  if (!list) return;
  list.innerHTML = world.servers.map((server) => {
    const active = ui.view === "server" && ui.activeServer === server.id;
    const unread = serverUnread(server);
    return `
      <button class="server-btn ${active ? "active" : ""}" type="button" data-server="${escapeAttr(server.id)}" title="${escapeAttr(server.name)}" aria-label="${escapeAttr(server.name)}">
        ${serverIconHtml(server)}
        ${unread > 0 ? `<span class="server-unread">${unread > 9 ? "9+" : ""}</span>` : ""}
        <span class="rail-tooltip">${escapeHtml(server.name)}</span>
      </button>`;
  }).join("");

  const home = $("#railHomeBtn");
  if (home) home.classList.toggle("active", ui.view === "home");
  const add = $("#addServerBtn");
  if (add) add.classList.toggle("is-hidden", !canCreateServer());
}

function renderSidebar() {
  const target = $("#sidebarContent");
  if (!target) return;
  if (ui.view === "home") {
    target.innerHTML = renderHomeSidebar();
  } else {
    target.innerHTML = renderServerSidebar(getActiveServer());
  }
  hydrateIcons(target);
}

function renderServerSidebar(server) {
  if (!server) return `<div class="empty-yap"><h3>No servers yet</h3><p>Create one to start yapping.</p></div>`;
  const categories = server.categories.map((category) => renderCategory(server, category)).join("");
  return `
    <div class="server-header">
      <button class="server-switcher" type="button" data-action="server-settings" data-server-id="${escapeAttr(server.id)}">
        ${serverIconHtml(server, "server-emoji")}
        <span class="server-heading">
          <strong>${escapeHtml(server.name)}</strong>
          <small>${escapeHtml(server.tagline || server.inviteCode || "")}</small>
        </span>
        <span class="server-chevron">${icon("chevronDown")}</span>
      </button>
    </div>
    <div class="channel-scroller">
      <button class="sidebar-search" type="button" data-action="open-search">
        ${icon("search")}<span>Search ${escapeHtml(server.name)}</span><kbd>Ctrl K</kbd>
      </button>
      <div class="server-banner-card ${bannerClass(server.banner)}" style="${bannerStyle(server.banner)}" data-action="server-settings" data-server-id="${escapeAttr(server.id)}">
        <div class="server-banner-shade"></div>
        <div class="server-banner-copy">
          <span class="server-banner-icon">${escapeHtml(server.icon?.type === "image" ? "🪩" : server.icon?.value || "🪩")}</span>
          <strong>${escapeHtml(server.name)}</strong>
          <small>${plural(server.memberIds.length, "member")} · ${plural(server.boostCount || 0, "boost")}</small>
        </div>
      </div>
      ${categories}
    </div>
    ${voiceBarHtml()}
    ${userPanelHtml()}
  `;
}

function renderCategory(server, category) {
  const collapsed = Boolean(ui.collapsedCategories[category.id]);
  const canManage = memberHasPerm(server, me().id, "manageChannels");
  const visible = category.channels.filter((channel) => canViewChannel(server, channel));
  const channels = visible.map((channel) => renderChannelButton(server, channel)).join("");
  return `
    <div class="category ${collapsed ? "is-collapsed" : ""}">
      <div class="category-row">
        <button class="category-toggle" type="button" data-action="collapse-category" data-category-id="${escapeAttr(category.id)}" aria-label="${collapsed ? "Expand" : "Collapse"} ${escapeAttr(category.name)}">
          ${icon(collapsed ? "chevronRight" : "chevronDown")}
        </button>
        <span class="category-name">${escapeHtml(category.name)}</span>
        ${canManage ? `<button class="category-plus" type="button" data-action="create-channel" data-category-id="${escapeAttr(category.id)}" title="Create channel">${icon("plus")}</button>` : ""}
      </div>
      <div class="channel-list" ${collapsed ? "hidden" : ""}>${channels}</div>
    </div>`;
}

function renderChannelButton(server, channel) {
  const active = ui.activeChannels[server.id] === channel.id;
  const unread = channel.type === "text" ? unreadForChannel(channel) : 0;
  const voiceMembers = channel.type === "voice" ? sessionsInVoice(channel.id) : [];
  const typeIcon = channel.type === "voice" ? "volume" : "hash";
  return `
    <button class="channel-button ${active ? "active" : ""} ${channel.type === "voice" ? "is-voice" : ""}" type="button" data-channel="${escapeAttr(channel.id)}" data-server-id="${escapeAttr(server.id)}">
      <span class="channel-icon">${icon(channel.readOnly && channel.type === "text" ? "lock" : typeIcon)}</span>
      <span class="channel-name">${escapeHtml(channel.name)}</span>
      ${channel.type === "voice" && voiceMembers.length ? `<span class="voice-live-dot" title="${plural(voiceMembers.length, "person", "people")} connected"></span>` : ""}
      ${unread > 0 ? `<span class="channel-badge">${unread > 9 ? "9+" : unread}</span>` : ""}
      ${active ? `<span class="channel-active-bar"></span>` : ""}
    </button>
    ${channel.type === "voice" && voiceMembers.length ? `<div class="voice-members">${voiceMembers.map((entry) => {
      const user = getUser(entry.userId);
      return `<button class="voice-member" type="button" data-profile="${escapeAttr(user.id)}">
        ${avatarWrap(user, "avatar-20")}
        <span class="voice-name">${escapeHtml(user.name)}${entry.sessionId === session.sessionId ? " (you)" : ""}</span>
        <span class="mic-cue">${icon(entry.muted ? "micOff" : "mic")}</span>
      </button>`;
    }).join("")}</div>` : ""}
  `;
}

function userPanelHtml() {
  const user = me();
  const connected = voiceState?.joined;
  return `
    <div class="user-panel">
      <button class="user-profile-btn" type="button" data-action="open-self-panel" aria-haspopup="dialog" title="Your profile">
        ${avatarWrap(user, "avatar-32")}
        <span class="user-meta">
          <strong>${escapeHtml(user.name)}</strong>
          <small>${connected ? `Voice · ${escapeHtml(findChannel(voiceState.channelId)?.channel.name || "connected")}` : escapeHtml(statusLabel(user))}</small>
        </span>
      </button>
      <div class="user-actions">
        <button class="user-action ${voiceState?.muted ? "active" : ""}" type="button" data-action="toggle-mute" title="${voiceState?.muted ? "Unmute" : "Mute"}">${icon(voiceState?.muted ? "micOff" : "mic")}</button>
        <button class="user-action ${voiceState?.deafened ? "active" : ""}" type="button" data-action="toggle-deafen" title="${voiceState?.deafened ? "Undeafen" : "Deafen"}">${icon(voiceState?.deafened ? "headphonesOff" : "headphones")}</button>
        <button class="user-action" type="button" data-action="open-settings" title="Settings">${icon("settings")}</button>
      </div>
    </div>`;
}

function voiceBarHtml() {
  if (!voiceState?.joined) return "";
  const found = findChannel(voiceState.channelId);
  const server = found?.server || getActiveServer();
  const channel = found?.channel;
  return `
    <div class="voice-bar">
      <div class="voice-bar-top">
        <span class="voice-signal">${icon("wifi")}</span>
        <span class="voice-bar-copy">
          <strong>Voice connected</strong>
          <small>${escapeHtml(server.name)} / ${escapeHtml(channel?.name || "voice")}</small>
        </span>
        <div class="voice-bar-actions">
          <button type="button" data-action="toggle-mute" title="${voiceState.muted ? "Unmute" : "Mute"}">${icon(voiceState.muted ? "micOff" : "mic")}</button>
          <button type="button" class="hangup" data-action="leave-voice" title="Disconnect">${icon("phoneOff")}</button>
        </div>
      </div>
    </div>`;
}

function renderHomeSidebar() {
  const dms = Object.values(world.dms)
    .filter((dm) => dm.participants?.includes(me().id))
    .filter((dm) => {
      const otherId = dm.participants.find((id) => id !== me().id) || dm.participants[0];
      return !isBlocked(otherId);
    })
    .sort((a, b) => {
      const aTime = a.messages.at(-1)?.createdAt || a.createdAt || 0;
      const bTime = b.messages.at(-1)?.createdAt || b.createdAt || 0;
      return new Date(bTime) - new Date(aTime);
    });
  return `
    <div class="home-side-head">
      <button class="home-side-title home-side-title-btn ${ui.view === "home" && !ui.activeDM ? "active" : ""}" type="button" data-action="open-friends">
        ${icon("users")}<span>Friends</span>
      </button>
      <button class="icon-btn small" type="button" data-action="add-friend" title="New message">${icon("plus")}</button>
    </div>
    <div class="home-side-search">
      <button class="sidebar-search" type="button" data-action="open-search">
        ${icon("search")}<span>Search</span><kbd>Ctrl K</kbd>
      </button>
    </div>
    <div class="channel-scroller home-side-scroller">
      <div class="dm-section-label">Direct messages</div>
      <div class="dm-list">
        ${dms.map((dm) => {
          const otherId = dm.participants.find((id) => id !== me().id) || dm.participants[0];
          const user = getUser(otherId);
          const unread = unreadForDm(dm);
          const last = dm.messages.at(-1);
          return `
            <button class="dm-row ${ui.activeDM === dm.id ? "active" : ""}" type="button" data-dm="${escapeAttr(dm.id)}">
              ${avatarWrap(user, "avatar-32")}
              <span class="dm-row-copy">
                <strong>${escapeHtml(user.name)}</strong>
                <small>${last ? escapeHtml(truncate(last.text || "sent an image", 30)) : "Start a conversation"}</small>
              </span>
              ${unread ? `<span class="channel-badge">${unread > 9 ? "9+" : unread}</span>` : ""}
            </button>`;
        }).join("") || `<div class="dm-empty">No conversations yet. Add a friend to start one.</div>`}
      </div>
    </div>
    ${userPanelHtml()}
  `;
}

function renderMain({ scroll = false } = {}) {
  const main = $("#mainContent");
  if (!main) return;

  const mobileTitle = $("#mobileTitle");
  if (ui.view === "home") {
    main.innerHTML = ui.activeDM ? renderDmView(getDm(ui.activeDM)) : renderFriendsView();
    if (mobileTitle) mobileTitle.textContent = ui.activeDM ? (getUser(getDm(ui.activeDM)?.participants.find((id) => id !== me().id))?.name || "Messages") : "Friends";
  } else {
    const server = getActiveServer();
    const channel = getActiveChannel();
    if (!channel) {
      main.innerHTML = `<div class="empty-yap"><span class="empty-emoji">🪩</span><h3>No channels here yet</h3><p>Create the first channel and start yapping.</p></div>`;
    } else if (channel.type === "voice") {
      main.innerHTML = renderVoiceView(server, channel);
      if (mobileTitle) mobileTitle.textContent = channel.name;
    } else {
      main.innerHTML = renderTextView(server, channel);
      if (mobileTitle) mobileTitle.textContent = `#${channel.name}`;
    }
  }

  hydrateIcons(main);
  if (scroll) requestAnimationFrame(() => scrollChatToBottom());
}

/* ---------- Text channel ---------- */

function renderTextView(server, channel) {
  const messages = world.messages[channel.id] || [];
  const pinned = messages.filter((message) => message.pinned);
  return `
    <div class="chat-shell">
      <div class="chat-column">
        ${chatHeaderHtml(server, channel, "text")}
        ${pinned.length ? pinnedBannerHtml(server, channel, pinned.at(-1)) : ""}
        ${channel.readOnly ? readOnlyNoticeHtml(server, channel) : ""}
        <div class="message-area">
          <div class="message-scroller" id="messageScroller" data-channel="${escapeAttr(channel.id)}">
            ${channelIntroHtml(server, channel)}
            <div class="message-list" id="messageList">${renderMessages(messages, { server, channelId: channel.id })}</div>
          </div>
        </div>
        ${composerHtml(server, channel)}
      </div>
      ${membersPanelHtml(server)}
    </div>`;
}

function chatHeaderHtml(server, channel, type) {
  const canManage = memberHasPerm(server, me().id, "manageChannels");
  return `
    <header class="chat-header">
      <button class="mobile-menu-btn header-mobile-menu" type="button" data-action="open-mobile-nav" aria-label="Open channels">${icon("menu")}</button>
      <span class="channel-heading-icon">${icon(type === "voice" ? "volume" : channel.readOnly ? "lock" : "hash")}</span>
      <div class="channel-heading">
        <h1>${escapeHtml(channel.name)}</h1>
        ${channel.topic ? `<span class="header-divider"></span><span class="chat-topic">${escapeHtml(channel.topic)}</span>` : ""}
      </div>
      <div class="chat-actions">
        ${type === "text" ? `<button class="icon-btn" type="button" data-action="open-pins" title="Pinned messages">${icon("pin")}</button>` : ""}
        <button class="icon-btn" type="button" data-action="open-members" title="Member list">${icon("users")}</button>
        <button class="icon-btn" type="button" data-action="open-search" title="Search">${icon("search")}</button>
        <button class="icon-btn" type="button" data-action="server-settings" data-server-id="${escapeAttr(server.id)}" title="Server settings">${icon("settings")}</button>
      </div>
    </header>`;
}

function pinnedBannerHtml(server, channel, message) {
  const author = getUser(message.authorId);
  return `
    <div class="pinned-banner" data-action="jump-message" data-message-id="${escapeAttr(message.id)}" data-channel-id="${escapeAttr(channel.id)}">
      <span class="pinned-badge">${icon("pin")} Pinned</span>
      <span class="pinned-copy"><strong>${escapeHtml(author.name)}</strong> ${escapeHtml(truncate(message.text || "pinned message", 110))}</span>
      <span class="pinned-jump">Jump</span>
    </div>`;
}

function readOnlyNoticeHtml(server, channel) {
  const allowed = memberHasPerm(server, me().id, "manageChannels") || memberHasPerm(server, me().id, "manageMessages");
  return `
    <div class="readonly-notice ${allowed ? "can-post" : ""}">
      ${icon("lock")}
      <span>${allowed ? "This channel is read-only for most members, but you can still post here." : `Only moderators can post in #${escapeHtml(channel.name)}.`}</span>
    </div>`;
}

function channelIntroHtml(server, channel) {
  const count = server.memberIds.length;
  const online = server.memberIds.map(getUser).filter(isUserOnline).length;
  return `
    <div class="channel-intro">
      <div class="intro-inner">
        <div class="intro-badge ${channel.type === "voice" ? "voice" : ""}">${icon(channel.type === "voice" ? "volume" : "hash")}</div>
        <h2>Welcome to #${escapeHtml(channel.name)}</h2>
        <p>${escapeHtml(channel.topic || "This is the start of the channel. Say something nice.")}</p>
        <div class="intro-meta">
          <span class="intro-pill">${icon("users")}${plural(count, "member")}</span>
          <span class="intro-pill live">${online} online</span>
          ${channel.readOnly ? `<span class="intro-pill">${icon("lock")}Read-only</span>` : `<span class="intro-pill">${icon("message")}${plural((world.messages[channel.id] || []).length, "message")}</span>`}
        </div>
      </div>
    </div>`;
}

function composerHtml(server, channel) {
  const key = `ch:${channel.id}`;
  const draft = drafts[key] || "";
  const readOnlyBlocked = channel.readOnly && !memberHasPerm(server, me().id, "manageChannels") && !memberHasPerm(server, me().id, "manageMessages");
  if (readOnlyBlocked) {
    return `
      <div class="composer-wrap">
        <div class="composer-locked">${icon("lock")} You do not have permission to send messages in this channel.</div>
      </div>`;
  }
  return `
    <div class="composer-wrap">
      ${replyTarget ? replyBarHtml(replyTarget) : ""}
      ${pendingAttachment ? attachmentBarHtml() : ""}
      <div class="composer">
        <button class="attach-btn" type="button" data-action="attach-image" title="Attach an image">${icon("image")}</button>
        <textarea id="messageInput" rows="1" maxlength="2000" placeholder="Message #${escapeAttr(channel.name)}" aria-label="Message #${escapeAttr(channel.name)}">${escapeHtml(draft)}</textarea>
        <div class="composer-actions">
          ${prefs?.emojiPicker === false ? "" : `<button class="composer-action" type="button" data-action="insert-emoji" title="Emoji">${icon("smile")}</button>`}
          <button class="send-btn" type="button" data-action="send-message" title="Send">${icon("send")}</button>
        </div>
      </div>
      <div class="composer-hint"><kbd>Enter</kbd> to send <span class="hint-dot">·</span> <kbd>Shift</kbd> + <kbd>Enter</kbd> for a new line</div>
    </div>`;
}

function replyBarHtml(target) {
  return `
    <div class="reply-bar">
      <span class="reply-bar-icon">${icon("reply")}</span>
      <span class="reply-bar-copy">Replying to <strong>${escapeHtml(target.authorName || "someone")}</strong><span>${escapeHtml(truncate(target.text || "", 58))}</span></span>
      <button class="reply-cancel" type="button" data-action="cancel-reply" title="Cancel reply">${icon("x")}</button>
    </div>`;
}

function attachmentBarHtml() {
  return `
    <div class="attachment-preview">
      <img src="${escapeAttr(pendingAttachment.url)}" alt="">
      <div class="attachment-meta"><strong>${escapeHtml(pendingAttachment.name || "image.png")}</strong><small>Ready to send</small></div>
      <button class="attachment-remove" type="button" data-action="remove-attachment" title="Remove">${icon("x")}</button>
    </div>`;
}

function renderMessages(messages, { server = null, channelId = null, dm = null } = {}) {
  if (!messages.length) {
    return `<div class="empty-yap small"><span class="empty-emoji">💬</span><h3>No messages yet</h3><p>Be the first to say something.</p></div>`;
  }
  let lastDate = "";
  let lastAuthor = "";
  let lastTime = 0;
  return messages.map((message) => {
    const author = getUser(message.authorId);
    const dateKey = formatDateKey(message.createdAt);
    const dateDivider = dateKey !== lastDate ? `<div class="date-divider"><span>${formatDateDivider(message.createdAt)}</span></div>` : "";
    const time = new Date(message.createdAt).getTime();
    const grouped = prefs?.messageGrouping !== false && lastAuthor === message.authorId && dateKey === lastDate && time - lastTime < 7 * 60_000;
    lastDate = dateKey;
    lastAuthor = message.authorId;
    lastTime = time;
    return `${dateDivider}${messageHtml(message, author, { grouped, server, channelId, dm })}`;
  }).join("");
}

function messageHtml(message, author, { grouped, server = null, channelId = null, dm = null } = {}) {
  const canDelete = message.authorId === me().id || (server ? memberHasPerm(server, me().id, "manageMessages") : false);
  const canPin = server && memberHasPerm(server, me().id, "pinMessages");
  const nameColor = server ? roleColor(server, author.id) : "var(--text)";
  const badges = compactBadges(author, server, 2);
  const reactions = (message.reactions || []).map((reaction) => `
    <button class="reaction ${reaction.users?.includes(me().id) ? "mine" : ""}" type="button" data-action="react-message" data-emoji="${escapeAttr(reaction.emoji)}" data-message-id="${escapeAttr(message.id)}" ${dm ? `data-dm-id="${escapeAttr(dm.id)}"` : `data-channel-id="${escapeAttr(channelId)}"`} title="${plural(reaction.users?.length || 0, "reaction")}">
      <span>${escapeHtml(reaction.emoji)}</span><span class="count">${reaction.users?.length || 0}</span>
    </button>`).join("");

  return `
    <div class="message ${grouped ? "grouped" : ""}" id="message-${escapeAttr(message.id)}" data-message-id="${escapeAttr(message.id)}">
      <div class="msg-avatar-slot">
        ${grouped ? `<span class="msg-hover-time">${formatTime(message.createdAt)}</span>` : `<button class="avatar-button" type="button" data-profile="${escapeAttr(author.id)}">${avatarWrap(author, "avatar-40", "msg-avatar")}</button>`}
      </div>
      <div class="msg-content">
        ${message.replyTo ? `<div class="reply-preview">${icon("reply")}<strong>${escapeHtml(getUser(message.replyTo.authorId).name)}</strong><span>${escapeHtml(truncate(message.replyTo.text || "", 90))}</span></div>` : ""}
        ${grouped ? "" : `
          <div class="msg-header">
            <button class="msg-author" type="button" data-profile="${escapeAttr(author.id)}" style="color:${escapeAttr(nameColor)}">${escapeHtml(author.name)}</button>
            ${plusBadgeHtml(author)}
            ${badges}
            ${prefs?.showTimestamps === false ? "" : `<span class="msg-time">${formatTime(message.createdAt)}</span>`}
          </div>`}
        ${message.text ? `<div class="msg-text">${richText(message.text, { server })}</div>` : ""}
        ${message.attachment ? (prefs?.inlineMedia === false
          ? `<a class="msg-file" href="${escapeAttr(message.attachment.url)}" download="${escapeAttr(message.attachment.name || "attachment")}">${icon("image")} ${escapeHtml(message.attachment.name || "attachment")}</a>`
          : `<div class="msg-image"><img src="${escapeAttr(message.attachment.url)}" alt="${escapeAttr(message.attachment.name || "attachment")}" loading="lazy"></div>`) : ""}
        ${reactions ? `<div class="reactions">${reactions}</div>` : ""}
        <div class="msg-tools">
          <button class="msg-tool" type="button" data-action="reply-message" data-message-id="${escapeAttr(message.id)}" title="Reply">${icon("reply")}</button>
          <button class="msg-tool" type="button" data-action="quick-reaction" data-message-id="${escapeAttr(message.id)}" title="Add reaction">${icon("smile")}</button>
          ${canPin ? `<button class="msg-tool" type="button" data-action="pin-message" data-message-id="${escapeAttr(message.id)}" title="${message.pinned ? "Unpin" : "Pin"}">${icon(message.pinned ? "pinOff" : "pin")}</button>` : ""}
          <button class="msg-tool" type="button" data-action="copy-message" data-message-id="${escapeAttr(message.id)}" title="Copy text">${icon("copy")}</button>
          ${canDelete ? `<button class="msg-tool danger" type="button" data-action="delete-message" data-message-id="${escapeAttr(message.id)}" title="Delete">${icon("trash")}</button>` : ""}
        </div>
      </div>
    </div>`;
}

function membersPanelHtml(server) {
  return `
    <aside class="members-panel">
      <div class="members-header">
        <span>Members — ${server.memberIds.length}</span>
        <button class="icon-btn" type="button" data-action="toggle-members" title="Hide member list">${icon("x")}</button>
      </div>
      <div class="members-list" id="membersList">${membersListHtml(server)}</div>
    </aside>`;
}

function membersListHtml(server) {
  const users = server.memberIds.map(getUser);
  const online = users.filter(isUserOnline);
  const offline = users.filter((user) => !isUserOnline(user));
  const hoistedRoles = server.roles
    .filter((role) => role.hoist && role.id !== "role-member")
    .sort((a, b) => (b.position || 0) - (a.position || 0));
  const assigned = new Set();
  const groups = [];
  hoistedRoles.forEach((role) => {
    const members = online.filter((user) => {
      if (assigned.has(user.id)) return false;
      const top = getTopRole(server, user.id);
      if (top?.id !== role.id) return false;
      assigned.add(user.id);
      return true;
    });
    if (members.length) groups.push({ key: role.id, label: role.name, color: role.color, members });
  });
  const leftovers = online.filter((user) => !assigned.has(user.id));
  if (leftovers.length) groups.push({ key: "online", label: "Online", members: leftovers });
  if (offline.length) groups.push({ key: "offline", label: "Offline", members: offline });
  if (!groups.length) return `<div class="members-empty">No members yet.</div>`;

  return groups.map((group) => {
    const groupRole = server.roles.find((role) => role.id === group.key);
    return `
    <div class="member-group">
      <div class="member-group-label" style="${group.color ? `color:${escapeAttr(group.color)}` : ""}">${roleCustomIconHtml(groupRole, 12)}${escapeHtml(group.label)} — ${group.members.length}</div>
      ${group.members.map((user) => {
        const top = getTopRole(server, user.id);
        const isSelf = user.id === me().id;
        return `
          <button class="member-row ${isUserOnline(user) ? "" : "offline"}" type="button" data-profile="${escapeAttr(user.id)}">
            ${avatarWrap(user, "avatar-32")}
            <span class="member-meta">
              <span class="member-name" style="${top ? `color:${escapeAttr(top.color)}` : ""}">${roleCustomIconHtml(top, 14)}${escapeHtml(user.name)}${isSelf ? " (you)" : ""} ${roleBadgeHtml(top, user.id)}</span>
              <span class="member-activity">${escapeHtml(truncate(statusLabel(user), 28))}</span>
            </span>
            ${voiceState?.joined && sessionsInVoice(voiceState.channelId).some((entry) => entry.userId === user.id) ? `<span class="member-voice">${icon("volume")}</span>` : ""}
          </button>`;
      }).join("")}
    </div>`;
  }).join("");
}

function renderMembersOnly() {
  const list = $("#membersList");
  if (!list) return;
  const server = ui.view === "server" ? getActiveServer() : null;
  if (server) list.innerHTML = membersListHtml(server);
  const sidebar = $("#sidebarContent");
  if (ui.view === "server" && sidebar) sidebar.innerHTML = renderServerSidebar(getActiveServer());
  if (ui.view === "server" && getActiveChannel()?.type === "voice") {
    const main = $("#mainContent");
    if (main && getActiveChannel()) main.innerHTML = renderVoiceView(getActiveServer(), getActiveChannel());
  }
  hydrateIcons(document);
}

/* ---------- Voice ---------- */

function renderVoiceView(server, channel) {
  const entries = sessionsInVoice(channel.id);
  const selfHere = voiceState?.joined && voiceState.channelId === channel.id;
  const tiles = entries.map((entry) => voiceTileHtml(entry, channel)).join("");
  return `
    <div class="chat-shell voice-shell">
      <div class="chat-column">
        ${chatHeaderHtml(server, channel, "voice")}
        <div class="voice-page">
          <div class="voice-hero ${bannerClass(server.banner)}" style="${bannerStyle(server.banner)}">
            <div class="voice-hero-shade"></div>
            <div class="voice-hero-copy">
              <span class="voice-hero-icon">${icon("volume")}</span>
              <h2>${escapeHtml(channel.name)}</h2>
              <p>${escapeHtml(channel.topic || "Drop in and say something.")}</p>
              <div class="voice-hero-meta">
                <span class="intro-pill live">${icon("wifi")}${selfHere ? "Connected" : "Voice channel"}</span>
                <span class="intro-pill">${icon("users")}${entries.length}/${channel.userLimit || 10}</span>
                <span class="intro-pill">${icon("shield")}Peer-to-peer audio</span>
              </div>
              <div class="voice-hero-actions">
                ${selfHere
                  ? `<button class="primary-btn danger-soft" type="button" data-action="leave-voice">${icon("phoneOff")} Disconnect</button>`
                  : `<button class="primary-btn" type="button" data-action="join-voice" data-channel-id="${escapeAttr(channel.id)}">${icon("phone")} Join voice</button>`}
                <button class="ghost-btn" type="button" data-action="copy-invite" data-server-id="${escapeAttr(server.id)}">${icon("link")} Copy invite</button>
              </div>
            </div>
          </div>
          <div class="voice-stage">
            <div class="voice-stage-head"><span>In this room</span><span>${plural(entries.length, "person", "people")}</span></div>
            <div class="voice-tiles" id="voiceTiles">
              ${tiles || `<div class="voice-empty"><span>🌙</span><h3>It's quiet in here</h3><p>Join the room and invite a friend. Open Nodum in a second tab to test real audio.</p></div>`}
            </div>
          </div>
          <div class="voice-controls">
            <div class="voice-controls-copy">
              <strong>${selfHere ? "You're connected" : "Not connected"}</strong>
              <small>${selfHere ? "Your mic is live. Audio flows directly between tabs." : "Join to use your microphone. Nothing is recorded or uploaded."}</small>
            </div>
            <div class="voice-controls-buttons">
              <button class="voice-control ${voiceState?.muted ? "active" : ""}" type="button" data-action="toggle-mute" title="Mute">${icon(voiceState?.muted ? "micOff" : "mic")}<span>${voiceState?.muted ? "Unmute" : "Mute"}</span></button>
              <button class="voice-control ${voiceState?.deafened ? "active" : ""}" type="button" data-action="toggle-deafen" title="Deafen">${icon(voiceState?.deafened ? "headphonesOff" : "headphones")}<span>${voiceState?.deafened ? "Undeafen" : "Deafen"}</span></button>
              ${selfHere ? `<button class="voice-control danger" type="button" data-action="leave-voice">${icon("phoneOff")}<span>Leave</span></button>` : ""}
            </div>
          </div>
        </div>
      </div>
      ${membersPanelHtml(server)}
    </div>`;
}

function voiceTileHtml(entry, channel) {
  const user = getUser(entry.userId);
  const self = entry.sessionId === session.sessionId;
  const speaking = self ? voiceState?.speaking : voiceState?.remoteSpeaking?.[entry.sessionId];
  return `
    <button class="voice-tile ${speaking ? "is-speaking" : ""}" type="button" data-profile="${escapeAttr(user.id)}" data-session="${escapeAttr(entry.sessionId)}">
      <span class="voice-tile-avatar">${avatarWrap(user, "avatar-72")}</span>
      <span class="voice-tile-name">${escapeHtml(user.name)}${self ? " (you)" : ""}</span>
      <span class="voice-tile-status">${entry.deafened ? icon("headphonesOff") : entry.muted ? icon("micOff") : icon("mic")} ${entry.deafened ? "deafened" : entry.muted ? "muted" : "speaking"}</span>
      <span class="voice-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
    </button>`;
}

/* ---------- Friends ---------- */

function renderFriendsView() {
  const friendIds = world.friendIds || [];
  const friends = friendIds.map(getUser);
  const online = friends.filter(isUserOnline);
  const requests = world.friendRequests || [];
  const blocked = (world.blockedIds || []).map(getUser);
  const suggested = Object.values(world.users)
    .filter((user) => user.id !== me().id && !friendIds.includes(user.id) && !isBlocked(user.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  const tab = ui.friendTab || "online";
  let content;
  if (tab === "pending") content = renderPendingFriends(requests);
  else if (tab === "blocked") content = renderBlockedFriends(blocked);
  else if (tab === "suggested") content = renderSuggestedFriends(suggested);
  else content = renderFriendList(tab === "online" ? online : friends, tab);
  return `
    <div class="home-page home-page-friends">
      <header class="home-head">
        <h1 class="home-title">Friends</h1>
        <span class="home-head-divider" aria-hidden="true"></span>
        <nav class="home-tabs" aria-label="Friend views">
          ${friendTabBtn("online", "Online", tab)}
          ${friendTabBtn("all", "All", tab)}
          ${friendTabBtn("pending", "Pending", tab)}
          ${friendTabBtn("blocked", "Blocked", tab)}
          ${friendTabBtn("suggested", "Suggested", tab)}
        </nav>
        <span class="home-head-spacer"></span>
        <button class="primary-btn add-friend-btn" type="button" data-action="add-friend">Add Friend</button>
      </header>
      <div class="friends-search-row">
        <label class="friends-search">
          ${icon("search")}
          <input type="search" data-friend-search placeholder="Search friends" aria-label="Search friends" autocomplete="off">
        </label>
      </div>
      <div class="friends-layout">
        <div class="friends-main">
          ${content}
          <div class="friends-search-empty" data-friend-empty hidden>
            <span class="empty-emoji">🔎</span>
            <h3>No matches</h3>
            <p>Try a different name or handle.</p>
          </div>
        </div>
        <aside class="friends-rail">
          <div class="friends-rail-card">
            <span class="eyebrow">Active now</span>
            <div class="active-stack">
              ${online.slice(0, 6).map((user) => `<button type="button" data-profile="${escapeAttr(user.id)}" title="${escapeAttr(user.name)}">${avatarWrap(user, "avatar-40")}</button>`).join("") || `<span class="muted-small">Quiet right now.</span>`}
            </div>
          </div>
          <div class="friends-rail-card">
            <span class="eyebrow">Pending requests</span>
            ${requests.length ? requests.map((request) => {
              const user = getUser(request.from);
              return `<div class="mini-request">${avatarWrap(user, "avatar-24")}<span>${escapeHtml(user.name)}</span><button class="mini-accept" type="button" data-action="accept-friend" data-user-id="${escapeAttr(user.id)}">${icon("check")}</button><button class="mini-ignore" type="button" data-action="ignore-friend" data-user-id="${escapeAttr(user.id)}">${icon("x")}</button></div>`;
            }).join("") : `<span class="muted-small">No pending requests.</span>`}
          </div>
          <div class="friends-rail-card tip-card">
            ${icon("sparkles")}
            <strong>No ads. Ever.</strong>
            <span>Banners, effects, badges, and voice are free. Some marketplace frames cost shards earned by chatting or selling your own.</span>
          </div>
        </aside>
      </div>
    </div>`;
}

function friendTabBtn(id, label, active) {
  return `<button class="home-tab ${active === id ? "active" : ""}" type="button" data-action="friend-tab" data-tab="${escapeAttr(id)}">${escapeHtml(label)}</button>`;
}

function friendAvatarHtml(user) {
  return `<span class="friend-avatar">${avatarWrap(user, "avatar-40")}<i class="presence-dot ${isUserOnline(user) ? "on" : ""}"></i></span>`;
}

function friendRowHtml(user, extraSmall = "") {
  const lastDm = dmFor(me().id, user.id);
  const last = lastDm?.messages.at(-1);
  return `
    <div class="friend-row" data-profile="${escapeAttr(user.id)}" data-friend-row data-search="${escapeAttr(`${user.name} ${user.handle}`.toLowerCase())}" role="button" tabindex="0">
      ${friendAvatarHtml(user)}
      <div class="friend-copy">
        <strong>${escapeHtml(user.name)} <span class="friend-handle">@${escapeHtml(user.handle)}</span></strong>
        <small>${extraSmall || `${escapeHtml(statusLabel(user))}${last ? ` · ${escapeHtml(truncate(last.text || "image", 38))}` : ""}`}</small>
      </div>
      <div class="friend-actions">
        <button class="friend-action" type="button" data-action="message-user" data-user-id="${escapeAttr(user.id)}" title="Message">${icon("message")}</button>
        <button class="friend-action" type="button" data-action="profile-more" data-user-id="${escapeAttr(user.id)}" title="More">${icon("more")}</button>
      </div>
    </div>`;
}

function renderFriendList(friends, mode = "all") {
  if (!friends.length) {
    return `<div class="empty-yap"><span class="empty-emoji">🫶</span><h3>${mode === "online" ? "No one is online" : "No friends yet"}</h3><p>${mode === "online" ? "Check All, or add someone new." : "Add someone and start yapping."}</p></div>`;
  }
  return `
    <div class="friend-section-label">${mode === "online" ? "Online" : "All friends"} — ${friends.length}</div>
    <div class="friend-list">${friends.map((user) => friendRowHtml(user)).join("")}</div>`;
}

function renderPendingFriends(requests) {
  if (!requests.length) return `<div class="empty-yap"><span class="empty-emoji">📭</span><h3>No pending requests</h3><p>When someone wants to yap, they'll show up here.</p></div>`;
  return `<div class="friend-list">${requests.map((request) => {
    const user = getUser(request.from);
    return `
      <div class="friend-row pending" data-profile="${escapeAttr(user.id)}" data-friend-row data-search="${escapeAttr(`${user.name} ${user.handle}`.toLowerCase())}" role="button" tabindex="0">
        ${friendAvatarHtml(user)}
        <div class="friend-copy">
          <strong>${escapeHtml(user.name)} <span class="friend-handle">@${escapeHtml(user.handle)}</span></strong>
          <small>Incoming friend request · ${formatRelative(request.createdAt)}</small>
        </div>
        <div class="friend-actions">
          <button class="friend-action accept" type="button" data-action="accept-friend" data-user-id="${escapeAttr(user.id)}" title="Accept">${icon("userCheck")}</button>
          <button class="friend-action" type="button" data-action="ignore-friend" data-user-id="${escapeAttr(user.id)}" title="Ignore">${icon("userX")}</button>
        </div>
      </div>`;
  }).join("")}</div>`;
}

function renderBlockedFriends(blocked) {
  if (!blocked.length) return `<div class="empty-yap"><span class="empty-emoji">🛡️</span><h3>No blocked people</h3><p>Anyone you block will show up here.</p></div>`;
  return `
    <div class="friend-section-label">Blocked — ${blocked.length}</div>
    <div class="friend-list">${blocked.map((user) => `
      <div class="friend-row" data-profile="${escapeAttr(user.id)}" data-friend-row data-search="${escapeAttr(`${user.name} ${user.handle}`.toLowerCase())}" role="button" tabindex="0">
        ${friendAvatarHtml(user)}
        <div class="friend-copy">
          <strong>${escapeHtml(user.name)} <span class="friend-handle">@${escapeHtml(user.handle)}</span></strong>
          <small>Blocked · you won't see their messages</small>
        </div>
        <div class="friend-actions">
          <button class="unblock-btn" type="button" data-action="unblock-user" data-user-id="${escapeAttr(user.id)}">${icon("userCheck")} Unblock</button>
        </div>
      </div>`).join("")}</div>`;
}

function renderSuggestedFriends(suggested) {
  if (!suggested.length) return `<div class="empty-yap"><span class="empty-emoji">🫂</span><h3>No suggestions right now</h3><p>When new people join this device, they'll show up here.</p></div>`;
  return `
    <div class="friend-section-label">Suggested — ${suggested.length}</div>
    <div class="friend-list">${suggested.map((user) => `
      <div class="friend-row" data-profile="${escapeAttr(user.id)}" data-friend-row data-search="${escapeAttr(`${user.name} ${user.handle}`.toLowerCase())}" role="button" tabindex="0">
        ${friendAvatarHtml(user)}
        <div class="friend-copy">
          <strong>${escapeHtml(user.name)} <span class="friend-handle">@${escapeHtml(user.handle)}</span></strong>
          <small>${escapeHtml(statusLabel(user))} · not in your friends yet</small>
        </div>
        <div class="friend-actions">
          <button class="add-friend-btn small" type="button" data-action="add-suggestion" data-user-id="${escapeAttr(user.id)}">${icon("userPlus")} Add Friend</button>
        </div>
      </div>`).join("")}</div>`;
}

/* ---------- Direct messages ---------- */

function renderDmView(dm) {
  if (!dm) return renderFriendsView();
  const otherId = dm.participants.find((id) => id !== me().id) || dm.participants[0];
  const user = getUser(otherId);
  const key = `dm:${dm.id}`;
  const draft = drafts[key] || "";
  const online = isUserOnline(user);
  return `
    <div class="dm-shell">
      <div class="dm-main">
        <header class="chat-header dm-header">
          <button class="mobile-menu-btn header-mobile-menu" type="button" data-action="open-mobile-nav" aria-label="Open messages">${icon("menu")}</button>
          <button class="dm-header-person" type="button" data-profile="${escapeAttr(user.id)}">
            ${avatarWrap(user, "avatar-32")}
            <span class="dm-header-copy"><strong>${escapeHtml(user.name)}</strong><small><i class="presence-dot ${online ? "on" : ""}"></i>${escapeHtml(statusLabel(user))}</small></span>
          </button>
          <div class="chat-actions">
            <button class="icon-btn" type="button" data-action="profile-more" data-user-id="${escapeAttr(user.id)}" title="More">${icon("more")}</button>
            <button class="icon-btn" type="button" data-profile="${escapeAttr(user.id)}" title="Profile">${icon("info")}</button>
          </div>
        </header>
        <div class="message-area">
          <div class="message-scroller" id="messageScroller" data-dm="${escapeAttr(dm.id)}">
            <div class="dm-intro">
              ${avatarWrap(user, "avatar-72")}
              <h2>${escapeHtml(user.name)}</h2>
              <p>@${escapeHtml(user.handle)} · ${escapeHtml(statusLabel(user))}</p>
              <small>This is the beginning of your direct message history with ${escapeHtml(user.name.split(" ")[0])}.</small>
            </div>
            <div class="message-list" id="messageList">${renderMessages(dm.messages, { dm })}</div>
          </div>
        </div>
        <div class="composer-wrap">
          ${replyTarget ? replyBarHtml(replyTarget) : ""}
          ${pendingAttachment ? attachmentBarHtml() : ""}
          <div class="composer">
            <button class="attach-btn" type="button" data-action="attach-image" title="Attach an image">${icon("image")}</button>
            <textarea id="messageInput" rows="1" maxlength="2000" placeholder="Message @${escapeAttr(user.name)}" aria-label="Message ${escapeAttr(user.name)}">${escapeHtml(draft)}</textarea>
            <div class="composer-actions">
              ${prefs?.emojiPicker === false ? "" : `<button class="composer-action" type="button" data-action="insert-emoji" title="Emoji">${icon("smile")}</button>`}
              <button class="send-btn" type="button" data-action="send-message" title="Send">${icon("send")}</button>
            </div>
          </div>
          <div class="composer-hint"><kbd>Enter</kbd> to send <span class="hint-dot">·</span> <kbd>Shift</kbd> + <kbd>Enter</kbd> for a new line</div>
        </div>
      </div>
      <aside class="dm-side">
        <div class="dm-side-banner ${bannerClass(user.banner)}" style="${bannerStyle(user.banner)}"></div>
        <div class="dm-side-avatar">${avatarWrap(user, "avatar-72")}</div>
        <h3>${escapeHtml(user.name)} ${plusBadgeHtml(user)}</h3>
        <p class="profile-handle">@${escapeHtml(user.handle)}</p>
        <div class="profile-badges">${fullBadges(user)}</div>
        <p class="dm-side-bio">${escapeHtml(user.bio || "No bio yet.")}</p>
        <div class="profile-divider"></div>
        <div class="profile-label">Member since</div>
        <p class="dm-side-meta">${formatShortDate(user.createdAt)}</p>
        <div class="dm-side-actions">
          <button class="ghost-btn full" type="button" data-profile="${escapeAttr(user.id)}">${icon("users")} View full profile</button>
          <button class="ghost-btn full" type="button" data-action="friend-more" data-user-id="${escapeAttr(user.id)}">${icon("more")} More options</button>
        </div>
      </aside>
    </div>`;
}

/* ---------- Utility renderers ---------- */

function scrollChatToBottom() {
  const scroller = $("#messageScroller");
  if (scroller) scroller.scrollTop = scroller.scrollHeight;
}

function flashMessage(messageId) {
  const el = document.getElementById(`message-${messageId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("is-flash");
  void el.offsetWidth;
  el.classList.add("is-flash");
}

function sessionsInVoice(channelId) {
  const map = new Map();
  Object.values(presence).forEach((entry) => {
    if (entry?.voice?.channelId === channelId) map.set(entry.sessionId, entry);
  });
  if (voiceState?.joined && voiceState.channelId === channelId && session) {
    map.set(session.sessionId, {
      sessionId: session.sessionId, userId: session.userId, muted: voiceState.muted, deafened: voiceState.deafened, self: true
    });
  }
  return [...map.values()];
}

/* =========================================================
   Dialogs, profile editing, studios, and management
   ========================================================= */

function toast(message, type = "success", duration = 3200) {
  const stack = $("#toastStack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icon(type === "error" ? "info" : type === "success" ? "check" : "sparkles")}</span><span>${escapeHtml(message)}</span>`;
  stack.append(el);
  window.setTimeout(() => {
    el.classList.add("leaving");
    window.setTimeout(() => el.remove(), 200);
  }, duration);
}

function closeModal() {
  if (!activeModal) return;
  const dialog = activeModal;
  activeModal = null;
  try { dialog.close(); } catch { /* already closed */ }
  dialog.remove();
}

function openModal({ title, eyebrow = "", subtitle = "", body = "", footer = "", className = "", onMount = null, closeLabel = true }) {
  return openRawModal(`
    <div class="modal-inner">
      <div class="modal-head">
        <div>
          ${eyebrow ? `<div class="eyebrow">${escapeHtml(eyebrow)}</div>` : ""}
          <h2>${escapeHtml(title)}</h2>
          ${subtitle ? `<p class="modal-subtitle">${escapeHtml(subtitle)}</p>` : ""}
        </div>
        ${closeLabel ? `<button class="icon-btn modal-close" type="button" data-close aria-label="Close">${icon("x")}</button>` : ""}
      </div>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-foot">${footer}</div>` : ""}
    </div>`, { className, onMount });
}

function openRawModal(html, { className = "", onMount = null } = {}) {
  closeModal();
  const dialog = document.createElement("dialog");
  dialog.className = `modal ${className}`.trim();
  dialog.innerHTML = html;
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeModal();
  });
  dialog.addEventListener("close", () => {
    if (activeModal === dialog) activeModal = null;
    dialog.remove();
  });
  $("#modalRoot").append(dialog);
  dialog.showModal();
  activeModal = dialog;
  dialog.querySelectorAll("[data-close]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", closeModal);
  });
  hydrateIcons(dialog);
  if (onMount) onMount(dialog);
  return dialog;
}

function confirmDialog({ title, message, confirmLabel = "Confirm", danger = false }) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
      closeModal();
    };
    const dialog = openModal({
      title,
      eyebrow: "Just checking",
      subtitle: message,
      body: `<div class="confirm-actions">
        <button class="ghost-btn" type="button" data-confirm-cancel>Cancel</button>
        <button class="${danger ? "danger-btn" : "primary-btn"}" type="button" data-confirm-ok>${escapeHtml(confirmLabel)}</button>
      </div>`,
      onMount: (root) => {
        root.querySelector("[data-confirm-cancel]")?.addEventListener("click", () => finish(false));
        root.querySelector("[data-confirm-ok]")?.addEventListener("click", () => finish(true));
      }
    });
    dialog.addEventListener("close", () => finish(false), { once: true });
  });
}

/* ---------- Images ---------- */

function compressImage(file, max = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Not an image"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not load image"));
      image.onload = () => {
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        try {
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (error) {
          resolve(reader.result);
        }
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function chooseImage(callback, max = 900) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";
  (activeModal || document.body).append(input);
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast("That image is too large. Pick something under 8 MB.", "error");
      return;
    }
    try {
      const dataUrl = await compressImage(file, max);
      callback(dataUrl, file.name);
    } catch (error) {
      console.warn(error);
      toast("Could not read that image.", "error");
    }
  }, { once: true });
  input.click();
}

function chooseDecorationFile(callback) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png,image/webp,image/jpeg";
  input.style.display = "none";
  (activeModal || document.body).append(input);
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast("That image is too large. Pick something under 8 MB.", "error");
      return;
    }
    try {
      const dataUrl = await autoFitDecorationImage(file);
      callback(dataUrl, file.name);
    } catch (error) {
      console.warn(error);
      toast("Could not read that decoration image.", "error");
    }
  }, { once: true });
  input.click();
}

function autoFitDecorationImage(file, size = 420) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Not an image"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not load image"));
      image.onload = () => {
        const scale = Math.min(1, 900 / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const source = document.createElement("canvas");
        source.width = width;
        source.height = height;
        const sourceCtx = source.getContext("2d");
        sourceCtx.drawImage(image, 0, 0, width, height);

        let box = { x: 0, y: 0, w: width, h: height };
        let hasAlpha = false;
        try {
          const pixels = sourceCtx.getImageData(0, 0, width, height).data;
          let minX = width, minY = height, maxX = -1, maxY = -1;
          const step = width * height > 250000 ? 2 : 1;
          for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
              const alpha = pixels[(y * width + x) * 4 + 3];
              if (alpha < 250) hasAlpha = true;
              if (alpha > 10) {
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
              }
            }
          }
          if (maxX >= minX && maxY >= minY) {
            const padding = Math.round(Math.max(maxX - minX, maxY - minY) * 0.03);
            box = {
              x: Math.max(0, minX - padding),
              y: Math.max(0, minY - padding),
              w: Math.min(width, maxX - minX + 1 + padding * 2),
              h: Math.min(height, maxY - minY + 1 + padding * 2)
            };
          }
        } catch {
          /* Canvas reads can fail for exotic files; fall back to a center crop. */
        }

        const square = hasAlpha ? Math.max(box.w, box.h) : Math.min(width, height);
        const sourceX = hasAlpha ? box.x + box.w / 2 - square / 2 : (width - square) / 2;
        const sourceY = hasAlpha ? box.y + box.h / 2 - square / 2 : (height - square) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        context.imageSmoothingQuality = "high";
        context.drawImage(source, sourceX, sourceY, square, square, 0, 0, size, size);

        const webp = canvas.toDataURL("image/webp", 0.9);
        resolve(webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/png"));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Image cropper ---------- */

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Not an image"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not load image"));
      image.onload = () => resolve(image);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function chooseCroppedImage(options, callback) {
  const {
    aspect = 1,
    outputWidth = 512,
    shape = "square",
    title = "Crop image",
    subtitle = "Drag to reposition, then zoom until it feels right.",
    applyLabel = "Use image"
  } = options || {};
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";
  /* A dialog makes the rest of the page inert, so keep the picker inside it. */
  (activeModal || document.body).append(input);
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("That file is not an image.", "error");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast("That image is too large. Pick something under 8 MB.", "error");
      return;
    }
    try {
      const image = await readImageFile(file);
      openImageCropper({ image, aspect, outputWidth, shape, title, subtitle, applyLabel, onApply: callback });
    } catch (error) {
      console.warn(error);
      toast("Could not read that image.", "error");
    }
  }, { once: true });
  input.click();
}

/* A nested dialog so it can sit on top of an open editor without closing it.
   The stage itself is the crop, so what you see is exactly what gets saved. */
function openImageCropper({
  image,
  aspect = 1,
  outputWidth = 512,
  shape = "square",
  title = "Crop image",
  subtitle = "Drag to reposition, then zoom until it feels right.",
  applyLabel = "Use image",
  onApply
}) {
  if (!image) return;
  const safeAspect = Math.min(4, Math.max(0.25, Number(aspect) || 1));
  const roundShape = shape === "circle";
  const previewAspect = roundShape ? 1 : safeAspect;
  const outW = Math.max(32, Math.round(outputWidth));
  const outH = Math.max(32, Math.round(outW / safeAspect));
  const dialog = document.createElement("dialog");
  dialog.className = "modal crop-modal";
  dialog.innerHTML = `
    <div class="crop-inner">
      <div class="crop-head">
        <div>
          <div class="eyebrow">Crop</div>
          <h2>${escapeHtml(title)}</h2>
          <p class="modal-subtitle">${escapeHtml(subtitle)}</p>
        </div>
        <button class="icon-btn modal-close" type="button" data-crop-cancel aria-label="Close">${icon("x")}</button>
      </div>
      <div class="crop-body">
        <div class="crop-stage-wrap">
          <div class="crop-stage ${roundShape ? "is-round" : ""}" data-crop-stage style="--crop-aspect:${safeAspect}">
            <canvas data-crop-canvas></canvas>
            <span class="crop-grid" aria-hidden="true"></span>
          </div>
          <p class="crop-hint">${icon("move")} Drag to reposition · scroll or pinch to zoom</p>
        </div>
        <div class="crop-side">
          <span class="crop-side-label">Preview</span>
          <div class="crop-preview ${roundShape ? "is-round" : ""}" data-crop-preview-wrap style="--crop-aspect:${previewAspect}">
            <canvas data-crop-preview></canvas>
          </div>
          <div class="crop-zoom">
            <button class="icon-btn small" type="button" data-crop-zoom-out aria-label="Zoom out">${icon("minus")}</button>
            <input type="range" min="100" max="400" step="1" value="100" data-crop-zoom aria-label="Zoom">
            <button class="icon-btn small" type="button" data-crop-zoom-in aria-label="Zoom in">${icon("plus")}</button>
          </div>
          <button class="ghost-btn small full" type="button" data-crop-reset>${icon("refresh")} Reset framing</button>
          <p class="crop-meta">${image.naturalWidth} × ${image.naturalHeight} px<br>Saved at ${outW} × ${outH} px</p>
        </div>
      </div>
      <div class="modal-foot crop-foot">
        <span class="foot-tip">${icon("crop")} ${roundShape ? "Square crop, shown as a circle" : "Cropped to fit"}</span>
        <div class="editor-foot-actions">
          <button class="ghost-btn" type="button" data-crop-cancel>Cancel</button>
          <button class="primary-btn" type="button" data-crop-apply>${icon("check")} ${escapeHtml(applyLabel)}</button>
        </div>
      </div>
    </div>`;
  $("#modalRoot").append(dialog);
  dialog.showModal();

  const stage = dialog.querySelector("[data-crop-stage]");
  const canvas = dialog.querySelector("[data-crop-canvas]");
  const context = canvas.getContext("2d");
  const previewCanvas = dialog.querySelector("[data-crop-preview]");
  const previewContext = previewCanvas.getContext("2d");
  const zoomInput = dialog.querySelector("[data-crop-zoom]");
  const maxZoom = 4;
  let boxW = 1;
  let boxH = 1;
  let dpr = 1;
  let baseScale = 1;
  let zoom = 1;
  let offsetX = 0;
  let offsetY = 0;
  let dragOrigin = null;
  let pinch = null;
  const pointers = new Map();

  const drawSize = () => {
    const scale = baseScale * zoom;
    return { scale, w: image.naturalWidth * scale, h: image.naturalHeight * scale };
  };

  const clampOffsets = () => {
    const { w, h } = drawSize();
    const maxX = Math.max(0, (w - boxW) / 2);
    const maxY = Math.max(0, (h - boxH) / 2);
    offsetX = Math.min(maxX, Math.max(-maxX, offsetX));
    offsetY = Math.min(maxY, Math.max(-maxY, offsetY));
  };

  const draw = () => {
    const { w, h } = drawSize();
    const x = (boxW - w) / 2 + offsetX;
    const y = (boxH - h) / 2 + offsetY;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, boxW, boxH);
    context.imageSmoothingQuality = "high";
    context.drawImage(image, x, y, w, h);

    const pw = previewCanvas.width;
    const ph = previewCanvas.height;
    const ratio = pw / boxW;
    previewContext.setTransform(1, 0, 0, 1, 0, 0);
    previewContext.clearRect(0, 0, pw, ph);
    previewContext.imageSmoothingQuality = "high";
    previewContext.drawImage(image, x * ratio, y * ratio, w * ratio, h * ratio);
  };

  const setZoom = (value) => {
    const next = Math.min(maxZoom, Math.max(1, value));
    if (Math.abs(next - zoom) < 0.001) return;
    const ratio = next / zoom;
    zoom = next;
    offsetX *= ratio;
    offsetY *= ratio;
    clampOffsets();
    zoomInput.value = String(Math.round(zoom * 100));
    draw();
  };

  const layout = () => {
    const rect = stage.getBoundingClientRect();
    boxW = Math.max(1, Math.round(rect.width));
    boxH = Math.max(1, Math.round(rect.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(boxW * dpr);
    canvas.height = Math.round(boxH * dpr);
    canvas.style.width = `${boxW}px`;
    canvas.style.height = `${boxH}px`;
    previewCanvas.width = Math.round(240 * (previewAspect >= 1 ? 1 : previewAspect));
    previewCanvas.height = Math.max(1, Math.round(previewCanvas.width / previewAspect));
    baseScale = Math.max(boxW / image.naturalWidth, boxH / image.naturalHeight);
    clampOffsets();
    draw();
  };

  const resetFraming = () => {
    zoom = 1;
    offsetX = 0;
    offsetY = 0;
    zoomInput.value = "100";
    clampOffsets();
    draw();
  };

  const finish = (dataUrl) => {
    dialog.close();
    dialog.remove();
    if (typeof onApply === "function") onApply(dataUrl);
  };

  const cancel = () => {
    dialog.close();
    dialog.remove();
  };

  const apply = () => {
    const factor = outW / boxW;
    const { w, h } = drawSize();
    const x = (boxW - w) / 2 + offsetX;
    const y = (boxH - h) / 2 + offsetY;
    const output = document.createElement("canvas");
    output.width = outW;
    output.height = outH;
    const outContext = output.getContext("2d");
    outContext.imageSmoothingQuality = "high";
    outContext.drawImage(image, x * factor, y * factor, w * factor, h * factor);
    const webp = output.toDataURL("image/webp", 0.9);
    finish(webp.startsWith("data:image/webp") ? webp : output.toDataURL("image/png"));
  };

  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) {
      dragOrigin = { x: event.clientX, y: event.clientY, ox: offsetX, oy: offsetY };
      pinch = null;
      stage.classList.add("is-dragging");
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        zoom,
        ox: offsetX,
        oy: offsetY
      };
      dragOrigin = null;
    }
  });

  stage.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2 && pinch) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      setZoom(pinch.zoom * (distance / pinch.distance));
      return;
    }
    if (!dragOrigin) return;
    offsetX = dragOrigin.ox + (event.clientX - dragOrigin.x);
    offsetY = dragOrigin.oy + (event.clientY - dragOrigin.y);
    clampOffsets();
    draw();
  });

  const endPointer = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
    if (!pointers.size) {
      dragOrigin = null;
      stage.classList.remove("is-dragging");
    } else if (pointers.size === 1) {
      const [point] = [...pointers.values()];
      dragOrigin = { x: point.x, y: point.y, ox: offsetX, oy: offsetY };
    }
  };
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    const step = event.deltaY > 0 ? -0.12 : 0.12;
    setZoom(zoom * (1 + step));
  }, { passive: false });

  stage.addEventListener("dblclick", resetFraming);
  zoomInput.addEventListener("input", () => setZoom(Number(zoomInput.value) / 100));
  dialog.querySelector("[data-crop-zoom-in]")?.addEventListener("click", () => setZoom(zoom + 0.15));
  dialog.querySelector("[data-crop-zoom-out]")?.addEventListener("click", () => setZoom(zoom - 0.15));
  dialog.querySelector("[data-crop-reset]")?.addEventListener("click", resetFraming);
  dialog.querySelectorAll("[data-crop-cancel]").forEach((button) => button.addEventListener("click", cancel));
  dialog.querySelector("[data-crop-apply]")?.addEventListener("click", apply);
  dialog.addEventListener("keydown", (event) => {
    const nudge = event.shiftKey ? 24 : 8;
    const moves = {
      ArrowLeft: [-nudge, 0], ArrowRight: [nudge, 0],
      ArrowUp: [0, -nudge], ArrowDown: [0, nudge]
    };
    if (moves[event.key]) {
      event.preventDefault();
      offsetX += moves[event.key][0];
      offsetY += moves[event.key][1];
      clampOffsets();
      draw();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) cancel();
  });
  dialog.addEventListener("close", () => {
    dialog.remove();
    window.removeEventListener("resize", layout);
  }, { once: true });
  window.addEventListener("resize", layout);
  layout();
}

/* ---------- Avatar + decoration preview ---------- */

function avatarWithDecoration(user, size, decoration, extraClass = "") {
  const deco = decoration || decorationById("deco-none", user);
  const has = deco && ((deco.style && deco.style !== "none") || deco.image);
  const style = has && deco.style && deco.style !== "none"
    ? `data-deco="${escapeAttr(deco.style)}" style="--deco-a:${escapeAttr(deco.colorA)};--deco-b:${escapeAttr(deco.colorB)};--deco-speed:${Number(deco.speed) || 7}s;--deco-icon:'${escapeAttr(deco.icon || "✦")}'"`
    : "";
  const image = deco?.image ? `<img class="avatar-deco-image" src="${escapeAttr(deco.image)}" alt="" aria-hidden="true">` : "";
  const plusRing = user.plus ? `<span class="plus-ring" aria-hidden="true"></span>` : "";
  return `<span class="avatar-wrap ${has ? "has-deco" : ""} ${plusRing ? "is-plus" : ""} ${extraClass}" data-effect="${escapeAttr(user.avatarEffect || "none")}" ${style}>${avatarCore(user, size)}${plusRing}${image}<span class="avatar-deco" aria-hidden="true"></span></span>`;
}

function bannerPreviewHtml(banner, effect = "none") {
  return `<div class="banner-preview ${bannerClass(banner)}" data-banner-effect="${escapeAttr(effect || "none")}" style="${bannerStyle(banner)}"></div>`;
}

/* ---------- Profile ---------- */

function openProfile(userId) {
  const user = getUser(userId);
  const isSelf = user.id === me().id;
  const shared = world.servers.filter((server) => isMember(server, user.id) && isMember(server, me().id));
  const server = ui.view === "server" ? getActiveServer() : shared[0] || null;
  const roles = server && isMember(server, user.id) ? getMemberRoles(server, user.id) : [];
  const badges = fullBadges(user, server);
  const badgeIcons = compactBadges(user, server, 4);
  const canGrantBadges = me().id === world.ownerId;
  const body = `
    <div class="profile-hero ${bannerClass(user.banner)} ${user.banner?.type === "image" ? "has-image" : ""}" data-banner-effect="${escapeAttr(user.bannerEffect || "none")}" style="${bannerStyle(user.banner)}">
      <div class="profile-hero-glow"></div>
      <button class="profile-close" type="button" data-close aria-label="Close profile">${icon("x")}</button>
      <div class="profile-hero-status"><span class="presence-dot ${isUserOnline(user) ? "on" : ""}"></span>${escapeHtml(user.customStatus || statusLabel(user))}</div>
    </div>
    <div class="profile-body">
      <div class="profile-avatar-row">
        <div class="profile-avatar-shell">${avatarWrap(user, "avatar-96")}</div>
        <div class="profile-avatar-badges">${badgeIcons || `<span class="muted-small">No badges yet</span>`}</div>
      </div>
      <div class="profile-name-row">
        <h2 style="color:${escapeAttr(roleColor(server, user.id) || "var(--text)")}">${escapeHtml(user.name)}</h2>
        ${plusBadgeHtml(user)}
        ${isSelf ? `<button class="ghost-btn small" type="button" data-action="open-profile-editor">${icon("edit")} Edit</button>` : ""}
      </div>
      <p class="profile-handle">@${escapeHtml(user.handle)} ${user.pronouns ? `· ${escapeHtml(user.pronouns)}` : ""}</p>
      ${user.customStatus ? `<div class="profile-custom"><span class="presence-dot ${isUserOnline(user) ? "on" : ""}"></span>${escapeHtml(user.customStatus)}</div>` : ""}
      <div class="profile-divider"></div>
      <div class="profile-label">About me</div>
      <p class="profile-about">${escapeHtml(user.bio || "This yapper hasn't written a bio yet.")}</p>
      ${roles.length ? `<div class="profile-divider"></div><div class="profile-label">Roles</div><div class="profile-roles">${roles.map((role) => `<span class="role-chip" style="--role-color:${escapeAttr(role.color)}">${roleIconHtml(role, 10)}${escapeHtml(role.name)}</span>`).join("")}</div>` : ""}
      ${badges ? `<div class="profile-divider"></div><div class="profile-label">Badges</div><div class="profile-badges">${badges}</div>` : ""}
      <div class="profile-divider"></div>
      <div class="profile-label">Member since</div>
      <p class="profile-about">${formatShortDate(user.createdAt)}${shared.length ? ` · ${plural(shared.length, "shared server")}` : ""}</p>
      <div class="profile-actions">
        ${isSelf
          ? `<button class="primary-btn" type="button" data-action="open-profile-editor">${icon("edit")} Edit profile</button>
             <button class="ghost-btn" type="button" data-action="open-appearance">${icon("palette")} Appearance</button>`
          : `<button class="primary-btn" type="button" data-action="message-user" data-user-id="${escapeAttr(user.id)}">${icon("message")} Message</button>
             <button class="ghost-btn" type="button" data-action="friend-more" data-user-id="${escapeAttr(user.id)}">${icon((world.friendIds || []).includes(user.id) ? "userCheck" : "userPlus")} ${(world.friendIds || []).includes(user.id) ? "Friends" : "Add friend"}</button>`}
        ${canGrantBadges ? `<button class="ghost-btn" type="button" data-action="manage-badges" data-user-id="${escapeAttr(user.id)}">${icon("trophy")} Manage badges</button>` : ""}
      </div>
    </div>`;
  openRawModal(body, { className: "profile-modal" });
}

/* ---------- Self profile panel ---------- */

const STATUS_OPTIONS = [
  { id: "online", label: "Online", hint: "Available and ready to chat." },
  { id: "idle", label: "Idle", hint: "Away from the keyboard." },
  { id: "dnd", label: "Do Not Disturb", hint: "Mute pings and show a red dot." },
  { id: "invisible", label: "Invisible", hint: "Appear offline to everyone." }
];

function selfStatusDot(status = "offline") {
  const safe = STATUS_OPTIONS.some((option) => option.id === status) ? status : "offline";
  return `<span class="self-dot ${escapeAttr(safe)}" aria-hidden="true"></span>`;
}

function openSelfPanel({ anchor = "chip" } = {}) {
  const user = me();
  const server = ui.view === "server" ? getActiveServer() : null;
  const status = STATUS_OPTIONS.find((option) => option.id === user.status) ? user.status : "online";
  const statusLabelText = STATUS_OPTIONS.find((option) => option.id === status)?.label || "Online";
  const badges = compactBadges(user, server, 3);
  const body = `
    <div class="self-panel">
      <div class="self-banner profile-hero ${bannerClass(user.banner)} ${user.banner?.type === "image" ? "banner-image" : ""}" data-banner-effect="${escapeAttr(user.bannerEffect || "none")}" style="${bannerStyle(user.banner)}">
        <div class="self-banner-shade"></div>
        <div class="self-banner-actions">
          <button class="self-icon-btn" type="button" data-action="open-profile-editor" title="Edit profile" aria-label="Edit profile">${icon("edit")}</button>
          <button class="self-icon-btn" type="button" data-close title="Close" aria-label="Close">${icon("x")}</button>
        </div>
      </div>
      <div class="self-body">
        <div class="self-avatar">${avatarWrap(user, "avatar-72")}</div>
        <div class="self-identity">
          <div class="self-name-row">
            <strong style="color:${escapeAttr(roleColor(server, user.id) || "var(--text)")}">${escapeHtml(user.name)}</strong>
            ${plusBadgeHtml(user)}
            ${badges ? `<span class="self-badges">${badges}</span>` : ""}
          </div>
          <span class="self-handle">@${escapeHtml(user.handle)}${user.pronouns ? ` <span class="self-pronouns">· ${escapeHtml(user.pronouns)}</span>` : ""}</span>
          <span class="self-custom" data-self-status-copy>${escapeHtml(user.customStatus || "No custom status set.")}</span>
        </div>
        <div class="self-menu">
          <button class="self-row" type="button" data-self-status-toggle aria-expanded="false">
            ${selfStatusDot(status)}
            <span class="self-row-label">${escapeHtml(statusLabelText)}</span>
            <span class="self-row-chevron">${icon("chevronDown")}</span>
          </button>
          <div class="self-status-menu" data-self-status-menu hidden>
            ${STATUS_OPTIONS.map((option) => `
              <button class="self-status-option ${option.id === status ? "active" : ""}" type="button" data-self-status="${escapeAttr(option.id)}">
                ${selfStatusDot(option.id)}
                <span><strong>${escapeHtml(option.label)}</strong><small>${escapeHtml(option.hint)}</small></span>
                ${option.id === status ? icon("check") : ""}
              </button>`).join("")}
          </div>
          <div class="self-status-editor" data-self-status-editor hidden>
            <input class="self-status-input" type="text" maxlength="80" placeholder="What are you up to?" value="${escapeAttr(user.customStatus || "")}" aria-label="Custom status">
            <div class="self-status-editor-actions">
              <button class="ghost-btn small" type="button" data-self-status-cancel>Cancel</button>
              <button class="primary-btn small" type="button" data-self-status-save>${icon("check")} Save</button>
            </div>
          </div>
          <button class="self-row" type="button" data-self-edit-status>
            <span class="self-row-icon">${icon("smile")}</span>
            <span class="self-row-label">Edit custom status</span>
            <span class="self-row-chevron">${icon("chevronRight")}</span>
          </button>
          <label class="self-row self-row-switch">
            <span class="self-row-icon">${icon("bell")}</span>
            <span class="self-row-label">Notification sounds</span>
            <input type="checkbox" data-self-pref="notificationSounds" ${prefGet("notificationSounds") ? "checked" : ""}>
            <span class="switch"></span>
          </label>
          <label class="self-row self-row-switch">
            <span class="self-row-icon">${icon("bellOff")}</span>
            <span class="self-row-label">Pause notifications</span>
            <input type="checkbox" data-self-pref="pauseNotifications" ${prefGet("pauseNotifications") ? "checked" : ""}>
            <span class="switch"></span>
          </label>
          <div class="self-sep"></div>
          <button class="self-row" type="button" data-action="self-view-profile">
            <span class="self-row-icon">${icon("users")}</span>
            <span class="self-row-label">View my profile</span>
            <span class="self-row-chevron">${icon("chevronRight")}</span>
          </button>
          <button class="self-row" type="button" data-action="self-leaderboards">
            <span class="self-row-icon">${icon("trophy")}</span>
            <span class="self-row-label">Leaderboards</span>
            <span class="self-row-chevron">${icon("chevronRight")}</span>
          </button>
          <button class="self-row" type="button" data-action="self-keybinds">
            <span class="self-row-icon">${icon("key")}</span>
            <span class="self-row-label">Keyboard shortcuts</span>
            <span class="self-row-chevron">${icon("chevronRight")}</span>
          </button>
          <button class="self-row" type="button" data-action="self-switch-account">
            <span class="self-row-icon">${icon("logOut")}</span>
            <span class="self-row-label">Switch accounts</span>
            <span class="self-row-chevron">${icon("chevronRight")}</span>
          </button>
        </div>
      </div>
    </div>`;
  openRawModal(body, {
    className: `self-panel-modal ${anchor === "topbar" ? "is-centered" : "is-anchored"}`,
    onMount: bindSelfPanel
  });
}

function bindSelfPanel(root) {
  const menu = root.querySelector("[data-self-status-menu]");
  const toggle = root.querySelector("[data-self-status-toggle]");
  toggle?.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-open", open);
  });

  root.querySelectorAll("[data-self-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.selfStatus;
      if (!STATUS_OPTIONS.some((option) => option.id === next)) return;
      me().status = next;
      commitWorld({ render: false });
      renderApp();
      openSelfPanel();
      toast(`Status set to ${STATUS_OPTIONS.find((option) => option.id === next).label}.`, "success");
    });
  });

  const editor = root.querySelector("[data-self-status-editor]");
  const input = root.querySelector(".self-status-input");
  root.querySelector("[data-self-edit-status]")?.addEventListener("click", () => {
    editor.hidden = false;
    menu.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.classList.remove("is-open");
    input?.focus();
    input?.select();
  });
  root.querySelector("[data-self-status-cancel]")?.addEventListener("click", () => {
    editor.hidden = true;
  });
  const saveCustomStatus = () => {
    me().customStatus = String(input?.value || "").trim().slice(0, 80);
    commitWorld({ render: false });
    renderApp();
    openSelfPanel();
    toast(me().customStatus ? "Custom status updated." : "Custom status cleared.", "success");
  };
  root.querySelector("[data-self-status-save]")?.addEventListener("click", saveCustomStatus);
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveCustomStatus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      editor.hidden = true;
    }
  });

  root.querySelectorAll("[data-self-pref]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const path = checkbox.dataset.selfPref;
      prefSet(path, checkbox.checked);
      savePrefs();
      applyPrefs();
      const name = path === "notificationSounds" ? "Notification sounds" : "Notifications";
      toast(`${name} ${checkbox.checked ? (path === "notificationSounds" ? "on" : "resumed") : (path === "notificationSounds" ? "off" : "paused")}.`);
    });
  });
}

function openBadgeManager(userId) {
  const user = getUser(userId);
  if (!user || me().id !== world.ownerId) return;
  const owned = new Set(user.badges || []);
  const isOwnerAccount = user.id === world.ownerId;
  const body = `
    <div class="badge-manager">
      <div class="badge-manager-head">${avatarWrap(user, "avatar-48")}<div><strong>${escapeHtml(user.name)}</strong><span>@${escapeHtml(user.handle)}</span></div></div>
      <div class="badge-manager-list">
        ${BADGE_ORDER.map((id) => {
          const badge = BADGES[id];
          const locked = isOwnerAccount && id === "owner";
          return `<label class="badge-manager-row ${locked ? "is-locked" : ""}">
            <input type="checkbox" data-badge-id="${escapeAttr(id)}" ${owned.has(id) || locked ? "checked" : ""} ${locked ? "disabled" : ""}>
            <span class="badge-card-icon" style="--badge-a:${badge.a};--badge-b:${badge.b}">${icon(badge.path)}</span>
            <span class="badge-manager-copy"><strong>${escapeHtml(badge.label)}</strong><small>${escapeHtml(badge.about)}</small></span>
            <span class="badge-check" aria-hidden="true">${icon("check")}</span>
          </label>`;
        }).join("")}
      </div>
      <p class="field-hint">${icon("shieldCheck")} Staff and owners never see emails or passwords. Badges are granted manually by the owner.</p>
    </div>`;
  openModal({
    title: `Badges for ${user.name}`,
    eyebrow: "Owner controls",
    subtitle: "Grant or remove badges. Nobody else can change these.",
    body,
    className: "badges-modal badge-manager-modal",
    footer: `<span class="foot-tip">${icon("trophy")} Owner only</span><button class="primary-btn" type="button" data-action="save-badges" data-user-id="${escapeAttr(user.id)}">${icon("check")} Save badges</button>`
  });
}

function saveBadgeGrants(userId) {
  const user = getUser(userId);
  const root = activeModal;
  if (!user || !root || me().id !== world.ownerId) return;
  const selected = [...root.querySelectorAll("[data-badge-id]:checked")].map((box) => box.dataset.badgeId);
  const next = BADGE_ORDER.filter((id) => selected.includes(id));
  if (user.id === world.ownerId && !next.includes("owner")) next.unshift("owner");
  user.badges = next;
  user.displayBadges = [...new Set([...(user.displayBadges || []).filter((id) => next.includes(id)), ...next])].slice(0, 3);
  commitWorld({ render: false });
  toast(`Badges updated for ${user.name}.`, "success");
  openProfile(user.id);
}

function openProfileEditor() {
  const user = me();
  profileEditorDraft = {
    ...user,
    avatar: { ...(user.avatar || {}) },
    banner: { ...(user.banner || { type: "preset", value: "aurora" }) },
    displayBadges: [...(user.displayBadges || user.badges || [])]
  };
  const body = `
    <div class="profile-editor-shell">
      <div class="editor-preview-pane">
        <div class="eyebrow">Live preview</div>
        <div class="profile-preview-card" id="profileEditorPreview">${profilePreviewHtml(profileEditorDraft)}</div>
        <div class="editor-preview-tip">${icon("sparkles")} Avatar effects are free. Some marketplace frames cost shards.</div>
      </div>
      <div class="editor-form-pane">
        <div class="editor-tabs" role="tablist">
          <button class="editor-tab active" type="button" data-editor-tab="identity">${icon("users")} Identity</button>
          <button class="editor-tab" type="button" data-editor-tab="look">${icon("palette")} Look</button>
          <button class="editor-tab" type="button" data-editor-tab="decor">${icon("wand")} Decoration</button>
        </div>

        <div class="editor-panel" data-editor-panel="identity">
          <div class="field-row">
            <label class="field"><span>Display name</span><input id="editName" maxlength="32" value="${escapeAttr(profileEditorDraft.name)}"></label>
            <label class="field"><span>Handle</span><input id="editHandle" maxlength="24" value="${escapeAttr(profileEditorDraft.handle)}"></label>
          </div>
          <div class="field-row">
            <label class="field"><span>Pronouns</span><input id="editPronouns" maxlength="20" placeholder="they/them" value="${escapeAttr(profileEditorDraft.pronouns || "")}"></label>
            <label class="field"><span>Status</span><select id="editStatus">
              ${["online", "idle", "dnd", "invisible"].map((status) => `<option value="${status}" ${profileEditorDraft.status === status ? "selected" : ""}>${status === "dnd" ? "Do not disturb" : status[0].toUpperCase() + status.slice(1)}</option>`).join("")}
            </select></label>
          </div>
          <label class="field"><span>Custom status</span><input id="editCustomStatus" maxlength="80" placeholder="What are you up to?" value="${escapeAttr(profileEditorDraft.customStatus || "")}"></label>
          <label class="field"><span>About me</span><textarea id="editBio" rows="4" maxlength="320" placeholder="Tell people who you are.">${escapeHtml(profileEditorDraft.bio || "")}</textarea></label>
          <label class="field"><span>Accent color</span><input id="editAccent" type="color" value="${escapeAttr(profileEditorDraft.accent || "#ff8a3d")}"></label>
        </div>

        <div class="editor-panel" data-editor-panel="look" hidden>
          <div class="editor-subhead">Avatar</div>
          <div class="emoji-choice-row">
            <button class="emoji-choice initial-choice ${profileEditorDraft.avatar?.type === "initial" ? "active" : ""}" type="button" data-avatar-initial title="Use the first letter of your name">${escapeHtml((profileEditorDraft.name || "N").trim().charAt(0).toUpperCase() || "N")}</button>
            ${AVATAR_EMOJIS.map((emoji) => `<button class="emoji-choice ${profileEditorDraft.emoji === emoji && !profileEditorDraft.avatar?.value && profileEditorDraft.avatar?.type !== "initial" ? "active" : ""}" type="button" data-avatar-emoji="${escapeAttr(emoji)}">${emoji}</button>`).join("")}
          </div>
          <div class="tone-picker">
            ${TONE_KEYS.map((tone) => `<button class="tone-choice ${profileEditorDraft.tone === tone ? "active" : ""}" type="button" data-avatar-tone="${escapeAttr(tone)}" style="--tone-a:${TONES[tone].a};--tone-b:${TONES[tone].b}" title="${escapeAttr(tone)}"></button>`).join("")}
          </div>
          <button class="upload-btn" type="button" data-upload="avatar">${icon("upload")} Upload a custom avatar</button>
          <div class="editor-subhead">Avatar effect</div>
          <div class="choice-grid compact">
            ${AVATAR_EFFECTS.map((effect) => `<button class="choice-card ${profileEditorDraft.avatarEffect === effect.id ? "active" : ""}" type="button" data-avatar-effect="${escapeAttr(effect.id)}">${escapeHtml(effect.label)}</button>`).join("")}
          </div>
          <div class="editor-subhead">Banner</div>
          <div class="banner-choice-grid">
            ${BANNER_PRESETS.map((preset) => `<button class="banner-choice ${profileEditorDraft.banner?.type !== "image" && profileEditorDraft.banner?.value === preset.id ? "active" : ""}" type="button" data-banner-preset="${escapeAttr(preset.id)}" style="--banner-a:${preset.a};--banner-b:${preset.b};--banner-c:${preset.c}"><span>${escapeHtml(preset.label)}</span></button>`).join("")}
          </div>
          <button class="upload-btn" type="button" data-upload="banner">${icon("image")} Upload a custom banner</button>
          <div class="editor-subhead">Banner movement</div>
          <div class="choice-grid compact">
            ${BANNER_EFFECTS.map((effect) => `<button class="choice-card ${profileEditorDraft.bannerEffect === effect.id ? "active" : ""}" type="button" data-banner-effect="${escapeAttr(effect.id)}">${escapeHtml(effect.label)}</button>`).join("")}
          </div>
        </div>

        <div class="editor-panel" data-editor-panel="decor" hidden>
          <div class="editor-subhead">Profile decoration</div>
          <div class="deco-choice-grid">
            ${usableDecorationLibrary(profileEditorDraft).map((deco) => `<button class="deco-choice ${profileEditorDraft.decoration === deco.id ? "active" : ""}" type="button" data-decoration="${escapeAttr(deco.id)}">${avatarWithDecoration(profileEditorDraft, "avatar-56", deco)}<span>${escapeHtml(deco.name)}</span></button>`).join("")}
          </div>
          <button class="upload-btn" type="button" data-action="open-studio">${icon("wand")} Make your own decoration</button>
          <div class="editor-subhead">Show off your badges</div>
          <div class="badge-picker">
            ${getUserBadges(me()).map((id) => `
              <label class="badge-pick ${profileEditorDraft.displayBadges.includes(id) ? "picked" : ""}">
                <input type="checkbox" value="${escapeAttr(id)}" ${profileEditorDraft.displayBadges.includes(id) ? "checked" : ""} data-badge-pick>
                ${badgeIconHtml(id, 20)}<span>${escapeHtml(BADGES[id].label)}</span>
              </label>`).join("")}
          </div>
          <p class="field-hint">${icon("info")} Pick up to 3 badges to show next to your name.</p>
        </div>
      </div>
    </div>
    <div class="modal-foot editor-foot">
      <span class="foot-tip">${icon("sparkles")} Saved locally · no paywall</span>
      <div class="editor-foot-actions">
        <button class="ghost-btn" type="button" data-close>Cancel</button>
        <button class="primary-btn" type="button" data-action="save-profile">${icon("check")} Save profile</button>
      </div>
    </div>`;
  openRawModal(body, {
    className: "profile-editor-modal",
    onMount: (root) => bindProfileEditor(root)
  });
}

function profilePreviewHtml(draft) {
  const deco = decorationById(draft.decoration || "deco-none");
  return `
    <div class="preview-banner ${bannerClass(draft.banner)}" data-banner-effect="${escapeAttr(draft.bannerEffect || "none")}" style="${bannerStyle(draft.banner)}"></div>
    <div class="preview-body">
      <div class="preview-avatar">${avatarWithDecoration(draft, "avatar-72", deco)}</div>
      <strong style="color:${escapeAttr(draft.accent || "var(--text)")}">${escapeHtml(draft.name || "Your name")}</strong>
      <span>@${escapeHtml(draft.handle || "handle")}</span>
      <p>${escapeHtml(draft.customStatus || "Your custom status")}</p>
      <div class="profile-badges">${(draft.displayBadges || []).slice(0, 3).map((id) => badgeIconHtml(id, 18)).join("")}</div>
    </div>`;
}

function refreshProfilePreview() {
  const preview = $("#profileEditorPreview");
  if (preview && profileEditorDraft) preview.innerHTML = profilePreviewHtml(profileEditorDraft);
}

function bindProfileEditor(root) {
  const draft = profileEditorDraft;
  if (!draft) return;
  root.querySelectorAll("[data-editor-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("[data-editor-tab]").forEach((item) => item.classList.toggle("active", item === button));
      root.querySelectorAll("[data-editor-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.editorPanel !== button.dataset.editorTab;
      });
    });
  });
  const bindInput = (selector, key) => {
    const input = root.querySelector(selector);
    if (!input) return;
    input.addEventListener("input", () => {
      draft[key] = input.value;
      refreshProfilePreview();
    });
  };
  bindInput("#editName", "name");
  bindInput("#editHandle", "handle");
  bindInput("#editPronouns", "pronouns");
  bindInput("#editCustomStatus", "customStatus");
  bindInput("#editBio", "bio");
  bindInput("#editAccent", "accent");
  const status = root.querySelector("#editStatus");
  status?.addEventListener("change", () => { draft.status = status.value; });
  const initialButton = root.querySelector("[data-avatar-initial]");
  initialButton?.addEventListener("click", () => {
    draft.avatar = { type: "initial" };
    draft.emoji = (draft.name || "N").trim().charAt(0).toUpperCase() || "N";
    root.querySelectorAll("[data-avatar-emoji]").forEach((item) => item.classList.remove("active"));
    initialButton.classList.add("active");
    refreshProfilePreview();
  });
  root.querySelectorAll("[data-avatar-emoji]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.emoji = button.dataset.avatarEmoji;
      draft.avatar = {};
      root.querySelector("[data-avatar-initial]")?.classList.remove("active");
      root.querySelectorAll("[data-avatar-emoji]").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-avatar-tone]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.tone = button.dataset.avatarTone;
      root.querySelectorAll("[data-avatar-tone]").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-avatar-effect]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.avatarEffect = button.dataset.avatarEffect;
      root.querySelectorAll("[data-avatar-effect]").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-banner-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.banner = { type: "preset", value: button.dataset.bannerPreset };
      root.querySelectorAll("[data-banner-preset]").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-banner-effect]").forEach((button) => {
    if (!button.classList.contains("choice-card")) return;
    button.addEventListener("click", () => {
      draft.bannerEffect = button.dataset.bannerEffect;
      root.querySelectorAll("[data-banner-effect].choice-card").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-decoration]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.decoration = button.dataset.decoration;
      root.querySelectorAll("[data-decoration]").forEach((item) => item.classList.toggle("active", item === button));
      refreshProfilePreview();
    });
  });
  root.querySelectorAll("[data-badge-pick]").forEach((input) => {
    input.addEventListener("change", () => {
      const picked = [...root.querySelectorAll("[data-badge-pick]:checked")].map((box) => box.value);
      if (picked.length > 3) {
        input.checked = false;
        toast("Pick up to 3 badges.", "error");
        return;
      }
      draft.displayBadges = picked;
      input.closest(".badge-pick")?.classList.toggle("picked", input.checked);
      refreshProfilePreview();
    });
  });
  root.querySelector('[data-upload="avatar"]')?.addEventListener("click", () => {
    chooseCroppedImage({
      aspect: 1,
      outputWidth: 480,
      shape: "circle",
      title: "Crop your avatar",
      subtitle: "Drag to center yourself, then zoom until it looks right.",
      applyLabel: "Use avatar"
    }, (dataUrl) => {
      draft.avatar = { type: "image", value: dataUrl };
      refreshProfilePreview();
      toast("Avatar ready. Save to apply it.");
    });
  });
  root.querySelector('[data-upload="banner"]')?.addEventListener("click", () => {
    chooseCroppedImage({
      aspect: 3,
      outputWidth: 1500,
      shape: "square",
      title: "Crop your banner",
      subtitle: "Wide images look best. Drag and zoom to frame the part you want.",
      applyLabel: "Use banner"
    }, (dataUrl) => {
      draft.banner = { type: "image", value: dataUrl };
      refreshProfilePreview();
      toast("Banner ready. Save to apply it.");
    });
  });
  root.querySelector('[data-action="save-profile"]')?.addEventListener("click", saveProfileDraft);
}

function saveProfileDraft() {
  if (!profileEditorDraft) return;
  const draft = profileEditorDraft;
  const handle = String(draft.handle || "").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, "") || "yapper";
  const duplicate = Object.values(world.users).find((user) => user.id !== me().id && user.handle?.toLowerCase() === handle);
  if (duplicate) {
    toast("That handle is already taken.", "error");
    return;
  }
  world.users[me().id] = {
    ...me(),
    ...draft,
    name: String(draft.name || "Yapper").trim().slice(0, 32) || "Yapper",
    handle,
    bio: String(draft.bio || "").slice(0, 320),
    customStatus: String(draft.customStatus || "").slice(0, 80),
    displayBadges: (draft.displayBadges || []).slice(0, 3)
  };
  commitWorld();
  profileEditorDraft = null;
  closeModal();
  toast("Profile updated. Looking good.", "success");
}

function openBadgeCollection() {
  const earned = getUserBadges(me());
  const body = `
    <div class="badge-showcase">
      ${BADGE_ORDER.map((id) => {
        const badge = BADGES[id];
        const has = earned.includes(id);
        return `<div class="badge-card ${has ? "" : "locked"}">
          <div class="badge-card-icon" style="--badge-a:${badge.a};--badge-b:${badge.b}">${icon(badge.path)}</div>
          <div class="badge-card-copy">
            <strong>${escapeHtml(badge.label)} ${has ? `<span class="owned-dot">owned</span>` : `<span class="locked-label">locked</span>`}</strong>
            <p>${escapeHtml(badge.about)}</p>
          </div>
        </div>`;
      }).join("")}
    </div>
    <p class="field-hint" style="padding:0 2px">${icon("info")} Badges come from your roles and your history in the community. Show up to 3 on your profile.</p>`;
  openModal({
    title: "Badge collection",
    eyebrow: "Your reputation",
    subtitle: `${earned.length} of ${BADGE_ORDER.length} badges earned. No purchase required, ever.`,
    body,
    className: "badges-modal",
    footer: `<span class="foot-tip">${icon("trophy")} Role-based and community-earned</span><button class="primary-btn" type="button" data-action="open-profile-editor">${icon("edit")} Choose badges</button>`
  });
}

/* ---------- Decoration studio ---------- */

function openDecorationStudio() {
  studioDraft = studioDraft || {
    name: "", style: "halo", colorA: "#ffd166", colorB: "#ff8a3d", icon: "✦", speed: 7, image: "", price: 0
  };
  const library = decorationLibrary();
  const mine = (world.submissions || []).filter((sub) => sub.authorId === me().id);
  const body = `
    <div class="studio-shell">
      <div class="studio-builder">
        <div class="studio-intro">
          <div class="eyebrow">Build a frame</div>
          <h3 class="studio-title">Decoration studio</h3>
          <p class="studio-sub">Make a frame for your avatar in four short steps. Change anything you like — the preview updates as you go.</p>
          <ul class="studio-how">
            <li>${icon("edit")} <span><strong>Name it</strong> and pick a look.</span></li>
            <li>${icon("upload")} <span><strong>Upload art</strong> only if you want your own drawing.</span></li>
            <li>${icon("shieldCheck")} <span><strong>Submit it.</strong> A moderator approves frames before they appear in the marketplace.</span></li>
          </ul>
        </div>

        <div class="studio-steps">
          <section class="studio-step">
            <div class="studio-step-head"><span class="studio-step-num">1</span><div><strong>Name your frame</strong><small>This is what people see in the marketplace.</small></div></div>
            <label class="field"><span>Frame name</span><input id="studioName" maxlength="28" placeholder="Petal Storm" value="${escapeAttr(studioDraft.name)}"></label>
          </section>

          <section class="studio-step">
            <div class="studio-step-head"><span class="studio-step-num">2</span><div><strong>Pick a look</strong><small>Choose a shape and two colors. That's the whole trick.</small></div></div>
            <label class="field"><span>Shape and motion</span><select id="studioStyle">
              ${DECO_STYLES.map((style) => `<option value="${style.id}" ${studioDraft.style === style.id ? "selected" : ""}>${escapeHtml(style.label)}</option>`).join("")}
            </select></label>
            <div class="field-row">
              <label class="field"><span>Color one</span><input id="studioColorA" type="color" value="${escapeAttr(studioDraft.colorA)}"></label>
              <label class="field"><span>Color two</span><input id="studioColorB" type="color" value="${escapeAttr(studioDraft.colorB)}"></label>
            </div>
            <div class="field-row">
              <label class="field"><span>Center symbol</span><input id="studioIcon" maxlength="4" value="${escapeAttr(studioDraft.icon)}" placeholder="✦"></label>
              <label class="field"><span>Animation speed <output id="studioSpeedOut">${studioDraft.speed}</output></span><input id="studioSpeed" type="range" min="2" max="12" step="1" value="${studioDraft.speed}"></label>
            </div>
          </section>

          <section class="studio-step">
            <div class="studio-step-head"><span class="studio-step-num">3</span><div><strong>Add your own art</strong><small>Optional. Skip it if the colors above are enough.</small></div></div>
            <div class="deco-upload-row">
              <button class="ghost-btn small" type="button" data-action="upload-deco-image">${icon("upload")} ${studioDraft.image ? "Replace image" : "Upload a PNG or JPG"}</button>
              ${studioDraft.image ? `<button class="ghost-btn small" type="button" data-action="clear-deco-image">${icon("x")} Remove image</button>` : ""}
            </div>
            ${studioDraft.image ? `<div class="deco-upload-preview"><img src="${escapeAttr(studioDraft.image)}" alt="Uploaded decoration preview"><span>Auto-fitted to the avatar</span></div>` : `<p class="field-hint">${icon("wand")} Nodum trims empty edges and centers the art in a square frame for you.</p>`}
          </section>

          <section class="studio-step">
            <div class="studio-step-head"><span class="studio-step-num">4</span><div><strong>Set a price</strong><small>Free is always fine. Paid frames send you shards when someone buys.</small></div></div>
            <label class="field"><span>Price in shards <small class="field-inline-hint">0 means free</small></span><input id="studioPrice" type="number" min="0" max="5000" step="1" value="${Math.max(0, Number(studioDraft.price) || 0)}"></label>
          </section>
        </div>

        <div class="studio-submit">
          <button class="primary-btn full" type="button" data-action="submit-decoration">${icon("upload")} Submit for moderation</button>
          <p class="field-hint">${icon("info")} Nothing is public yet. You can keep editing after you submit.</p>
        </div>
      </div>
      <div class="studio-preview">
        <div class="eyebrow">Live preview</div>
        <div class="studio-preview-avatar" id="studioPreview">${avatarWithDecoration(me(), "avatar-96", studioDraft)}</div>
        <strong id="studioPreviewName">${escapeHtml(studioDraft.name || "Untitled frame")}</strong>
        <span class="muted-small" id="studioPreviewMeta">${studioDraft.image ? "Uploaded art" : "Animated"} · ${escapeHtml(studioDraft.style)}${Number(studioDraft.price) ? ` · ${Number(studioDraft.price)} shards` : " · free"}</span>
        <div class="studio-preview-note">${icon("shieldCheck")} Moderators review every submission. You can keep editing until it's approved.</div>
      </div>
    </div>
    <div class="studio-library">
      <div class="studio-section-head"><span>Marketplace</span><span class="market-balance">${icon("sparkles")} ${myShards().toLocaleString()} shards${me().plus ? " · Plus 20% off" : ""}</span></div>
      <p class="muted-small" style="margin:0 2px 8px">Free frames are open to everyone. Paid frames unlock for buyers, and the creator gets the shards.</p>
      <div class="deco-library-grid">
        ${library.filter((deco) => deco.id !== "deco-none").map((deco) => {
          const author = deco.authorId ? getUser(deco.authorId) : null;
          const price = Math.max(0, Number(deco.price) || 0);
          const finalPrice = marketPriceFor(me(), deco);
          const owned = decorationUnlocked(deco, me());
          const isMine = deco.authorId === me().id;
          return `<div class="deco-library-card market-card ${owned ? "owned" : ""}">
            ${avatarWithDecoration(me(), "avatar-56", deco)}
            <strong>${escapeHtml(deco.name)}</strong>
            <small>${author ? `by ${escapeHtml(author.name)}` : "Nodum original"}</small>
            <div class="market-card-foot">
              ${price > 0
                ? owned
                  ? `<span class="status-pill approved">${isMine ? "Yours" : "Owned"}</span><span class="market-price">${price} shards</span>`
                  : `<span class="market-price">${finalPrice} shards</span><button class="primary-btn small" type="button" data-action="buy-decoration" data-decoration-id="${escapeAttr(deco.id)}">${icon("sparkles")} Buy</button>`
                : `<span class="status-pill">Free</span>`}
              ${isMine && deco.authorId ? `<button class="ghost-btn small" type="button" data-action="price-decoration" data-decoration-id="${escapeAttr(deco.id)}">${icon("edit")} Price</button>` : ""}
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    <div class="studio-library">
      <div class="studio-section-head"><span>Your submissions</span><span>${mine.length} · ${Number(me().decoSales || 0)} sold</span></div>
      ${mine.length ? mine.map((sub) => `
        <div class="submission-row">
          ${avatarWithDecoration(me(), "avatar-40", sub.decoration)}
          <div class="submission-copy"><strong>${escapeHtml(sub.decoration.name)}</strong><small>${escapeHtml(sub.status)} · ${formatRelative(sub.createdAt)}${Number(sub.decoration.price) ? ` · ${Number(sub.decoration.price)} shards` : ""}</small>${sub.note ? `<p>“${escapeHtml(sub.note)}”</p>` : ""}</div>
          <span class="status-pill ${escapeAttr(sub.status)}">${escapeHtml(sub.status)}</span>
          ${sub.status === "approved" ? `<button class="ghost-btn small" type="button" data-action="price-decoration" data-decoration-id="${escapeAttr(sub.decoration.id)}">${icon("edit")} Price</button>` : ""}
          <button class="submission-delete" type="button" data-action="delete-decoration" data-submission-id="${escapeAttr(sub.id)}" title="Delete submission" aria-label="Delete ${escapeAttr(sub.decoration.name)}">${icon("trash")}</button>
        </div>`).join("") : `<div class="muted-small" style="padding:4px 2px">Nothing submitted yet. Build something weird.</div>`}
    </div>
    <div class="modal-foot studio-foot">
      <span class="foot-tip">${icon("sparkles")} Approved frames can be free or sold for shards</span>
      <div class="editor-foot-actions">
        ${canModerateGlobal() ? `<button class="ghost-btn" type="button" data-action="open-modqueue">${icon("shieldCheck")} Moderation queue ${pendingSubmissions().length ? `· ${pendingSubmissions().length}` : ""}</button>` : ""}
        <button class="primary-btn" type="button" data-close>Done</button>
      </div>
    </div>`;
  openRawModal(body, {
    className: "studio-modal",
    onMount: (root) => {
      const update = () => {
        studioDraft.name = root.querySelector("#studioName").value;
        studioDraft.style = root.querySelector("#studioStyle").value;
        studioDraft.colorA = root.querySelector("#studioColorA").value;
        studioDraft.colorB = root.querySelector("#studioColorB").value;
        studioDraft.icon = root.querySelector("#studioIcon").value || "✦";
        studioDraft.speed = Number(root.querySelector("#studioSpeed").value);
        studioDraft.price = Math.max(0, Math.min(5000, Math.round(Number(root.querySelector("#studioPrice")?.value) || 0)));
        const speedOut = root.querySelector("#studioSpeedOut");
        if (speedOut) speedOut.textContent = studioDraft.speed;
        const preview = root.querySelector("#studioPreview");
        if (preview) preview.innerHTML = avatarWithDecoration(me(), "avatar-96", studioDraft);
        const previewName = root.querySelector("#studioPreviewName");
        if (previewName) previewName.textContent = studioDraft.name.trim() || "Untitled frame";
        const previewMeta = root.querySelector("#studioPreviewMeta");
        if (previewMeta) {
          const styleLabel = DECO_STYLES.find((style) => style.id === studioDraft.style)?.label || studioDraft.style;
          previewMeta.textContent = `${studioDraft.image ? "Uploaded art" : "Animated"} · ${styleLabel}${studioDraft.price ? ` · ${studioDraft.price} shards` : " · free"}`;
        }
      };
      root.querySelectorAll("#studioName,#studioStyle,#studioColorA,#studioColorB,#studioIcon,#studioSpeed,#studioPrice").forEach((input) => {
        input.addEventListener("input", update);
        input.addEventListener("change", update);
      });
    }
  });
}

function refreshStudio() {
  if (activeModal) openDecorationStudio();
}

function submitDecoration() {
  if (!studioDraft) return;
  if (!studioDraft.name.trim()) {
    toast("Give your decoration a name first.", "error");
    return;
  }
  const decoration = {
    ...studioDraft,
    id: uid("deco"),
    price: Math.max(0, Math.min(5000, Math.round(Number(studioDraft.price) || 0))),
    image: studioDraft.image || ""
  };
  world.submissions ||= [];
  world.submissions.unshift({
    id: uid("sub"), authorId: me().id, status: "pending", createdAt: new Date().toISOString(), note: "", decoration
  });
  commitWorld({ render: false });
  studioDraft = null;
  toast("Submitted. A moderator will take a look.", "success");
  openDecorationStudio();
}

function openModerationQueue() {
  if (!canModerateGlobal()) {
    toast("You need a moderator role to review submissions.", "error");
    return;
  }
  const pending = pendingSubmissions();
  const body = pending.length ? `
    <div class="mod-queue-list">
      ${pending.map((sub) => {
        const author = getUser(sub.authorId);
        return `<div class="mod-card" data-submission-id="${escapeAttr(sub.id)}">
          <div class="mod-card-top">
            ${avatarWithDecoration(author, "avatar-56", sub.decoration)}
            <div class="mod-card-copy">
              <strong>${escapeHtml(sub.decoration.name)}</strong>
              <small>by ${escapeHtml(author.name)} · ${formatRelative(sub.createdAt)}</small>
              <div class="mod-card-tags"><span class="status-pill pending">pending</span><span class="role-chip">${escapeHtml(sub.decoration.style)}</span><span class="role-chip">${Number(sub.decoration.speed) || 7}s</span></div>
            </div>
          </div>
          <label class="field"><span>Moderator note (optional)</span><input class="mod-note" maxlength="160" placeholder="Why are you approving or rejecting this?"></label>
          <div class="mod-card-actions">
            <button class="danger-btn small" type="button" data-action="reject-submission" data-submission-id="${escapeAttr(sub.id)}">${icon("x")} Reject</button>
            <button class="primary-btn small" type="button" data-action="approve-submission" data-submission-id="${escapeAttr(sub.id)}">${icon("check")} Approve</button>
          </div>
        </div>`;
      }).join("")}
    </div>` : `<div class="empty-yap"><span class="empty-emoji">🛡️</span><h3>Queue is clear</h3><p>Nothing waiting for review. Enjoy the calm.</p></div>`;
  openModal({
    title: "Moderation queue",
    eyebrow: "Keep the yap good",
    subtitle: `${pending.length} pending ${pending.length === 1 ? "submission" : "submissions"}. Approve good frames, reject the slop.`,
    body,
    className: "moderation-modal",
    footer: `<span class="foot-tip">${icon("shieldStar")} Staff applications: ${pendingStaffApplications().length} · Plus orders: ${pendingPlusOrders().length}</span><div class="editor-foot-actions"><button class="ghost-btn" type="button" data-action="open-staff-apps">${icon("shieldCheck")} Staff apps</button><button class="ghost-btn" type="button" data-action="open-plus-orders">${icon("gift")} Plus orders</button><button class="ghost-btn" type="button" data-action="open-studio">${icon("wand")} Studio</button></div>`
  });
}

function approveSubmission(submissionId) {
  const sub = (world.submissions || []).find((item) => item.id === submissionId);
  if (!sub) return;
  const note = activeModal?.querySelector(`[data-submission-id="${submissionId}"] .mod-note`)?.value || "";
  sub.status = "approved";
  sub.note = note;
  sub.reviewedAt = new Date().toISOString();
  sub.reviewedBy = me().id;
  if (!world.decorations.some((deco) => deco.id === sub.decoration.id)) {
    world.decorations.push({ ...sub.decoration, authorId: sub.authorId, status: "approved", createdAt: sub.createdAt });
  }
  commitWorld({ render: false });
  toast(`Approved ${sub.decoration.name}.`, "success");
  openModerationQueue();
}

function rejectSubmission(submissionId) {
  const sub = (world.submissions || []).find((item) => item.id === submissionId);
  if (!sub) return;
  const note = activeModal?.querySelector(`[data-submission-id="${submissionId}"] .mod-note`)?.value || "";
  sub.status = "rejected";
  sub.note = note || "Needs another pass.";
  sub.reviewedAt = new Date().toISOString();
  sub.reviewedBy = me().id;
  commitWorld({ render: false });
  toast(`Rejected ${sub.decoration.name}.`, "error");
  openModerationQueue();
}

function deleteSubmission(submissionId) {
  const sub = (world.submissions || []).find((item) => item.id === submissionId);
  if (!sub) return;
  if (sub.authorId !== me().id) {
    toast("You can only delete your own decorations.", "error");
    return;
  }
  const approved = sub.status === "approved";
  confirmDialog({
    title: `Delete ${sub.decoration.name}?`,
    message: approved
      ? "This removes the frame from the community library and resets anyone using it. This cannot be undone."
      : "This deletes your submission for good. You can always build a new one.",
    confirmLabel: "Delete",
    danger: true
  }).then((ok) => {
    if (!ok) {
      openDecorationStudio();
      return;
    }
    world.submissions = (world.submissions || []).filter((item) => item.id !== submissionId);
    world.decorations = (world.decorations || []).filter((deco) => deco.id !== sub.decoration.id);
    Object.values(world.users || {}).forEach((user) => {
      if (user.decoration === sub.decoration.id) user.decoration = "deco-none";
    });
    commitWorld({ render: false });
    toast(`Deleted ${sub.decoration.name}.`);
    openDecorationStudio();
    renderApp();
  });
}

/* ---------- Appearance / settings ---------- */

const SETTINGS_GROUPS = [
  { label: "USER SETTINGS", items: [
    { id: "my-account", label: "My Account", icon: "users" },
    { id: "my-profile", label: "My Profile", icon: "userCheck" },
    { id: "authorized-apps", label: "Authorized Apps", icon: "key" }
  ] },
  { label: "APP SETTINGS", items: [
    { id: "appearance", label: "Appearance", icon: "palette" },
    { id: "chat", label: "Chat", icon: "chat" },
    { id: "language", label: "Language", icon: "globe" },
    { id: "voice", label: "Voice & Audio", icon: "volume" },
    { id: "sounds", label: "Sounds", icon: "headphones" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "keybinds", label: "Keybinds", icon: "slash" }
  ] },
  { label: "DESKTOP APP", items: [
    { id: "desktop", label: "Desktop app", icon: "screen" }
  ] },
  { label: "ADVANCED", items: [
    { id: "advanced", label: "Advanced", icon: "settings" },
    { id: "developer", label: "Developer", icon: "chip" }
  ] },
  { label: "NODUM", items: [
    { id: "subscriptions", label: "Subscriptions", icon: "star" },
    { id: "creators", label: "Creators", icon: "rocket" },
    { id: "leaderboards", label: "Leaderboards", icon: "trophy" },
    { id: "shards", label: "Shards", icon: "sparkles" },
    { id: "plus", label: "Nodum Plus", icon: "crown" },
    { id: "staff", label: "Staff team", icon: "shieldCheck" }
  ] },
  { label: "MODERATION", modOnly: true, items: [
    { id: "staff-apps", label: "Staff applications", icon: "shieldStar", modOnly: true },
    { id: "plus-orders", label: "Plus orders", icon: "gift", modOnly: true }
  ] }
];

function settingsGroups() {
  return SETTINGS_GROUPS
    .filter((group) => !group.modOnly || canModerateGlobal())
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.modOnly || canModerateGlobal())
    }));
}

const AUTHORIZED_APP_CATALOG = [
  { id: "nodum-studio", name: "Nodum Studio", by: "Nodum", copy: "Theme and decoration tools for your profile." },
  { id: "codeforge", name: "CodeForge", by: "local developer", copy: "Snippet manager that links to your local profile." },
  { id: "soundboard-lab", name: "Soundboard Lab", by: "local developer", copy: "Builds local sound packs for voice rooms." }
];

const SOUND_EVENTS = [
  { id: "dm", label: "New message in a DM or a mention" },
  { id: "sent", label: "Message sent" },
  { id: "call", label: "Incoming or outgoing call" },
  { id: "join", label: "You join a voice channel" },
  { id: "leave", label: "You leave a voice channel" }
];

const LANGUAGE_OPTIONS = [
  ["en", "English"], ["es", "Español"], ["fr", "Français"], ["de", "Deutsch"],
  ["pt-BR", "Português (Brasil)"], ["ja", "日本語"], ["ko", "한국어"], ["zh-CN", "中文"]
];

let keybindCapture = null;
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
});

function prefGet(path) {
  return String(path).split(".").reduce((target, key) => target?.[key], prefs);
}

function prefSet(path, value) {
  const parts = String(path).split(".");
  let target = prefs;
  parts.slice(0, -1).forEach((key) => {
    target[key] ||= {};
    target = target[key];
  });
  target[parts.at(-1)] = value;
}

function settingSwitch(label, copy, path, checked = prefGet(path)) {
  return `<label class="switch-row"><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></span><input type="checkbox" data-pref="${escapeAttr(path)}" ${checked ? "checked" : ""}><span class="switch"></span></label>`;
}

function settingRange(label, copy, path, value, min = 0, max = 100, step = 1, suffix = "%") {
  return `<div class="settings-row settings-row-range"><div><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></div><div class="range-wrap"><input type="range" data-pref="${escapeAttr(path)}" min="${min}" max="${max}" step="${step}" value="${Number(value)}"><output data-pref-out="${escapeAttr(path)}" data-pref-suffix="${escapeAttr(suffix)}">${Number(value)}${escapeHtml(suffix)}</output></div></div>`;
}

function settingSelect(label, copy, path, options, value = prefGet(path)) {
  return `<div class="settings-row"><div><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></div><select class="settings-select" data-pref="${escapeAttr(path)}" data-refresh="true">${options.map(([id, text]) => `<option value="${escapeAttr(id)}" ${id === value ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}</select></div>`;
}

function maskEmail(email) {
  const [user, domain] = String(email || "").split("@");
  if (!domain) return email || "not set";
  return `${user.slice(0, 2)}${"•".repeat(Math.max(3, user.length - 2))}@${domain}`;
}

function currentAccount() {
  return Object.values(loadAuth().accounts).find((account) => account.id === me().id) || null;
}

function localMessageCount(userId) {
  let count = 0;
  Object.values(world.messages || {}).forEach((list) => (list || []).forEach((message) => { if (message.authorId === userId) count += 1; }));
  Object.values(world.dms || {}).forEach((dm) => (dm.messages || []).forEach((message) => { if (message.authorId === userId) count += 1; }));
  return count;
}

function accountLevel(count) {
  return Math.max(1, Math.floor(Math.sqrt(count / 12)) + 1);
}

function leaderboardValue(kind, user) {
  if (kind === "shards") return user.id === me().id ? myShards() : Math.max(0, Number(user.shards || 0));
  if (kind === "invites") return (world.servers || []).filter((server) => server.ownerId === user.id).length;
  if (kind === "gifts") return Math.max(0, Number(user.decoSales || 0));
  if (kind === "voice") return Math.round(localMessageCount(user.id) / 18);
  return localMessageCount(user.id);
}

function leaderboardRows(kind) {
  return Object.values(world.users || {})
    .map((user) => ({ user, value: leaderboardValue(kind, user) }))
    .sort((a, b) => b.value - a.value || a.user.name.localeCompare(b.user.name))
    .slice(0, 20);
}

function playTestSound(kind = "dm", { silent = false } = {}) {
  if (!prefs.notificationSounds && kind !== "sent") {
    if (!silent) toast("Notification sounds are off. Turn them on first.", "error");
    return;
  }
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) {
    toast("This browser cannot play test sounds.", "error");
    return;
  }
  const patterns = {
    dm: [[660, 0, 0.12], [880, 0.13, 0.18]],
    sent: [[520, 0, 0.08]],
    mention: [[880, 0, 0.1], [1100, 0.11, 0.16]],
    call: [[440, 0, 0.16], [440, 0.22, 0.16]],
    join: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.16]],
    leave: [[784, 0, 0.1], [523, 0.1, 0.16]]
  };
  const context = new AudioCtor();
  const now = context.currentTime;
  const volume = Math.max(0, Number(prefs.masterVolume ?? 80)) / 100;
  (patterns[kind] || patterns.dm).forEach(([frequency, delay, duration]) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.linearRampToValueAtTime(0.18 * volume, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
    osc.connect(gain).connect(context.destination);
    osc.start(now + delay);
    osc.stop(now + delay + duration + 0.02);
  });
  window.setTimeout(() => context.close().catch(() => {}), 900);
  if (!silent) toast(`Played ${kind} sound.`);
}

async function enableDesktopNotifications() {
  if (!("Notification" in window)) {
    toast("This browser does not support desktop notifications.", "error");
    return false;
  }
  if (Notification.permission === "default") await Notification.requestPermission();
  if (Notification.permission !== "granted") {
    toast("Desktop notifications were blocked in your browser.", "error");
    return false;
  }
  return true;
}

function sendTestNotification() {
  if (!prefs.desktopNotifications) {
    toast("Turn on desktop notifications first.", "error");
    return;
  }
  if (!("Notification" in window) || Notification.permission !== "granted") {
    toast("Desktop notifications are not allowed yet.", "error");
    return;
  }
  new Notification("Nodum", { body: "This is what a new message pop-up looks like.", icon: "favicon.svg" });
}

function claimDailyShard() {
  const last = prefs.lastShardClaim ? new Date(prefs.lastShardClaim).getTime() : 0;
  const remaining = 86_400_000 - (Date.now() - last);
  if (remaining > 0) {
    const hours = Math.max(1, Math.ceil(remaining / 3_600_000));
    toast(`Next daily shard in about ${hours}h.`, "error");
    return false;
  }
  const amount = me()?.plus ? 10 : 5;
  prefs.lastShardClaim = new Date().toISOString();
  addShards(amount, me()?.plus ? "Daily check-in (Plus)" : "Daily check-in");
  return amount;
}

function randomToken(length = 24) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const values = new Uint8Array(length);
  if (window.crypto?.getRandomValues) window.crypto.getRandomValues(values);
  else values.forEach((_, index) => { values[index] = Math.floor(Math.random() * 256); });
  return Array.from(values).map((value) => alphabet[value % alphabet.length]).join("");
}

function copyText(value) {
  const text = String(value || "");
  const fallback = () => {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    try {
      document.execCommand("copy");
      toast("Copied.");
    } catch {
      toast("Could not copy.", "error");
    }
    area.remove();
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Copied.")).catch(fallback);
  } else {
    fallback();
  }
}

function openSettings(tab = "appearance") {
  const groups = settingsGroups();
  if (!groups.some((group) => group.items.some((item) => item.id === tab))) tab = "appearance";
  settingsDraft = { ...(settingsDraft || {}), leaderboardTab: settingsDraft?.leaderboardTab || "messages", revealEmail: false };
  const nav = groups.map((group) => `
    <div class="settings-nav-group">
      <div class="settings-nav-label">${escapeHtml(group.label)}</div>
      ${group.items.map((item) => `<button class="settings-nav-btn ${item.id === tab ? "active" : ""}" type="button" data-settings-tab="${item.id}">${icon(item.icon)} ${escapeHtml(item.label)}</button>`).join("")}
    </div>`).join("");
  const body = `
    <div class="settings-layout">
      <button class="settings-close" type="button" data-close aria-label="Close settings">${icon("x")}</button>
      <nav class="settings-nav">
        <label class="settings-search"><span data-icon="search"></span><input id="settingsSearch" type="search" placeholder="Search settings" autocomplete="off"></label>
        <div class="settings-nav-scroll" id="settingsNavScroll">${nav}</div>
      </nav>
      <div class="settings-content" id="settingsContent">${settingsPanelHtml(tab)}</div>
    </div>`;
  openRawModal(body, {
    className: "settings-modal-new",
    onMount: (root) => {
      root.dataset.settingsCurrent = tab;
      root.querySelector("#settingsSearch")?.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase();
        root.querySelectorAll(".settings-nav-group").forEach((group) => {
          let visible = 0;
          group.querySelectorAll(".settings-nav-btn").forEach((button) => {
            const match = !query || button.textContent.toLowerCase().includes(query);
            button.hidden = !match;
            if (match) visible += 1;
          });
          group.hidden = visible === 0;
        });
      });
      root.querySelectorAll("[data-settings-tab]").forEach((button) => {
        button.addEventListener("click", () => {
          root.querySelectorAll("[data-settings-tab]").forEach((item) => item.classList.toggle("active", item === button));
          root.dataset.settingsCurrent = button.dataset.settingsTab;
          root.querySelector("#settingsContent").innerHTML = settingsPanelHtml(button.dataset.settingsTab);
          hydrateIcons(root);
          bindSettingsPanel(root);
          root.querySelector(".settings-content")?.scrollTo({ top: 0 });
        });
      });
      bindSettingsPanel(root);
    }
  });
}

function refreshSettingsPanel(root = activeModal) {
  if (!root) return;
  const tab = root.dataset.settingsCurrent || "appearance";
  const content = root.querySelector("#settingsContent");
  if (!content) return;
  content.innerHTML = settingsPanelHtml(tab);
  hydrateIcons(root);
  bindSettingsPanel(root);
}

function settingsPanelHtml(tab) {
  const user = me();
  if (tab === "my-account") {
    const account = currentAccount();
    const verified = account?.emailVerified !== false;
    const revealed = Boolean(settingsDraft?.revealEmail);
    return `
      <div class="settings-panel">
        <div class="settings-title-row"><div><h3>My Account</h3><p class="muted-small">Your identity lives on this device. Nobody else can read it.</p></div><span class="status-pill ${verified ? "approved" : "pending"}">${icon(verified ? "shieldCheck" : "info")} ${verified ? "Email verified" : "Unverified"}</span></div>
        <div class="account-card">${avatarWrap(user, "avatar-56")}<div><strong>${escapeHtml(user.name)}</strong><span>@${escapeHtml(user.handle)}</span><small>${plural(getUserBadges(user).length, "badge")} · joined ${formatShortDate(user.createdAt)}</small></div><button class="ghost-btn small" type="button" data-action="open-profile-editor">${icon("edit")} Edit</button></div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Email</strong><small>${escapeHtml(revealed ? account?.email || "not set" : maskEmail(account?.email))}</small></div><button class="ghost-btn small" type="button" data-settings-action="reveal-email">${icon(revealed ? "eyeOff" : "eye")} ${revealed ? "Hide" : "Reveal"}</button></div>
          <div class="settings-row"><div><strong>Verification</strong><small>${verified ? `Verified ${account?.verifiedAt ? formatShortDate(account.verifiedAt) : "on this device"}.` : "This account was created before verification was added."}</small></div><span class="status-pill ${verified ? "approved" : "pending"}">${verified ? "Verified" : "Legacy"}</span></div>
          <div class="settings-row"><div><strong>Account ID</strong><small>${escapeHtml(user.id)}</small></div><button class="ghost-btn small" type="button" data-settings-action="copy-text" data-copy="${escapeAttr(user.id)}">${icon("copy")} Copy</button></div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Display name & username</strong><small>People see this everywhere in Nodum.</small></div>
          <div class="form-stack">
            <div class="field-row">
              <label class="field"><span>Display name</span><input id="settingsAccountName" maxlength="32" value="${escapeAttr(user.name)}"></label>
              <label class="field"><span>Username</span><input id="settingsAccountHandle" maxlength="24" value="${escapeAttr(user.handle)}"></label>
            </div>
            <div class="settings-actions"><button class="primary-btn" type="button" data-settings-action="save-identity">${icon("check")} Save changes</button></div>
          </div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Password and authentication</strong><small>Changing it re-hashes the password locally. Nobody can recover it for you.</small></div>
          <div class="form-stack">
            <div class="field-row">
              <label class="field"><span>Current password</span><input id="settingsCurrentPassword" type="password" autocomplete="current-password" placeholder="Current password"></label>
              <label class="field"><span>New password</span><input id="settingsNewPassword" type="password" autocomplete="new-password" minlength="6" placeholder="At least 6 characters"></label>
            </div>
            <div class="settings-actions"><button class="ghost-btn" type="button" data-settings-action="change-password">${icon("lock")} Change password</button><button class="ghost-btn" type="button" data-action="sign-out">${icon("logOut")} Sign out</button></div>
          </div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Passkeys</strong><small>Sign in with your fingerprint, face, or device PIN. Passkeys stay on this device and never leave it.</small></div>
          <div class="settings-card">
            ${(account?.passkeys || []).length
              ? (account.passkeys || []).map((passkey) => `<div class="settings-row"><div><strong>${escapeHtml(passkey.label || "Passkey")}</strong><small>Added ${formatShortDate(passkey.createdAt)} · this device only</small></div><button class="danger-btn small" type="button" data-settings-action="remove-passkey" data-passkey-id="${escapeAttr(passkey.id)}">${icon("trash")} Remove</button></div>`).join("")
              : `<div class="settings-row"><div><strong>No passkeys yet</strong><small>Add one to skip your password next time.</small></div><span class="status-pill">${icon("info")} Optional</span></div>`}
            <div class="settings-actions">
              <button class="primary-btn small" type="button" data-settings-action="add-passkey" ${passkeysSupported() ? "" : "disabled"}>${icon("key")} Add a passkey</button>
              ${passkeysSupported() ? "" : `<span class="muted-small">${window.isSecureContext ? "This browser can't create passkeys." : "Passkeys need HTTPS or localhost."}</span>`}
            </div>
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Account standing</strong><small>Good standing. No reports, no limits, no waiting rooms.</small></div><span class="status-pill approved">${icon("check")} All good</span></div>
        </div>
      </div>`;
  }
  if (tab === "my-profile") {
    return `
      <div class="settings-panel">
        <h3>My Profile</h3>
        <p class="muted-small">Your card, badges, effects, and the little details people see when they hover your name.</p>
        <div class="settings-preview-card settings-profile-preview">${avatarWrap(user, "avatar-56")}<div><strong>${escapeHtml(user.name)}</strong><span>@${escapeHtml(user.handle)} ${user.pronouns ? `· ${escapeHtml(user.pronouns)}` : ""}</span><small>${escapeHtml(user.bio || "No bio yet.")}</small></div><span class="badge-pill">${icon("sparkles")}<span>${escapeHtml(user.customStatus || "online")}</span></span></div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Custom status</strong><small>What are you up to right now?</small></div><div class="inline-field"><input class="settings-inline-input" id="settingsStatus" maxlength="80" value="${escapeAttr(user.customStatus || "")}" placeholder="coding, listening, hiding"><button class="ghost-btn small" type="button" data-settings-action="save-status">${icon("check")} Save</button></div></div>
          <div class="settings-row"><div><strong>Badges</strong><small>${plural(getUserBadges(user).length, "badge")} earned in this world.</small></div><button class="ghost-btn small" type="button" data-action="open-badges">${icon("trophy")} Manage</button></div>
          <div class="settings-row"><div><strong>Avatar decoration</strong><small>${escapeHtml(decorationLibrary().find((deco) => deco.id === user.decoration)?.name || "None")}</small></div><button class="ghost-btn small" type="button" data-action="open-studio">${icon("wand")} Decoration studio</button></div>
          <div class="settings-row"><div><strong>Profile link</strong><small>Share your local profile handle.</small></div><button class="ghost-btn small" type="button" data-settings-action="copy-text" data-copy="nodum:@${escapeAttr(user.handle)}">${icon("copy")} Copy</button></div>
        </div>
        <div class="settings-actions">
          <button class="primary-btn" type="button" data-action="open-profile-editor">${icon("edit")} Edit profile</button>
          <button class="ghost-btn" type="button" data-settings-action="copy-text" data-copy="@${escapeAttr(user.handle)}">${icon("at")} Copy username</button>
        </div>
      </div>`;
  }
  if (tab === "authorized-apps") {
    const apps = prefs.authorizedApps || [];
    const available = AUTHORIZED_APP_CATALOG.filter((app) => !apps.some((item) => item.id === app.id));
    return `
      <div class="settings-panel">
        <h3>Authorized Apps</h3>
        <p class="muted-small">Sites and local tools you allowed to read your username, display name, and profile picture. Remove one and it loses access immediately.</p>
        ${apps.length ? `<div class="authorized-list">${apps.map((app) => `
          <div class="authorized-app">
            <span class="authorized-mark">${icon("key")}</span>
            <div><strong>${escapeHtml(app.name)}</strong><small>by ${escapeHtml(app.by || "local developer")}</small><p>Can: see your username, display name and profile picture</p><span>Added ${formatShortDate(app.addedAt)} · last used ${app.lastUsed ? formatShortDate(app.lastUsed) : "today"}</span></div>
            <button class="danger-btn small" type="button" data-settings-action="remove-app" data-app-id="${escapeAttr(app.id)}">${icon("trash")} Remove</button>
          </div>`).join("")}</div>` : `<div class="settings-empty">${icon("key")}<strong>No authorized apps</strong><p>Nothing else can see your profile. Authorize a local tool below when you want one to.</p></div>`}
        <div class="settings-block">
          <div class="settings-block-head"><strong>Authorize a local app</strong><small>These are local tools, not remote services. Nothing leaves this browser.</small></div>
          ${available.length ? `<div class="inline-form"><select class="settings-select" id="authorizedAppSelect">${available.map((app) => `<option value="${escapeAttr(app.id)}">${escapeHtml(app.name)} · by ${escapeHtml(app.by)}</option>`).join("")}</select><button class="primary-btn" type="button" data-settings-action="authorize-app">${icon("plus")} Authorize</button></div>` : `<p class="muted-small">Every local app in the catalog is already authorized.</p>`}
        </div>
        <p class="field-hint">${icon("shieldCheck")} Removing an app only deletes its local access record. It never had your password.</p>
      </div>`;
  }
  if (tab === "appearance") {
    const custom = prefs.accent === "custom";
    const accentLabel = custom ? "Custom" : (ACCENTS[prefs.accent]?.label || "Teal");
    const accentA = custom ? prefs.customTheme.a : (ACCENTS[prefs.accent]?.a || "#55c5bd");
    const accentB = custom ? prefs.customTheme.b : (ACCENTS[prefs.accent]?.b || "#3aa9a2");
    const skin = prefs.customBackground || SKIN_DEFAULT;
    const skinFields = [["bg", "Background"], ["side", "Sidebar"], ["chat", "Chat"], ["card", "Cards"]];
    const presetActive = (preset) => Object.entries(preset.colors).every(([key, value]) => safeHex(skin[key], "") === value);
    return `
      <div class="settings-panel">
        <h3>Appearance</h3>
        <p class="muted-small">Make the place feel like yours. Every colour and size is stored on this device.</p>
        <div class="settings-card">
          <div class="settings-row settings-row-theme"><div><strong>Theme</strong><small>Dark is home. Light is for the brave. Custom repaints the whole window.</small></div>
            <div class="segmented segmented-four">
              <button class="${prefs.theme === "dark" ? "active" : ""}" type="button" data-theme-choice="dark">${icon("moon")} Dark</button>
              <button class="${prefs.theme === "light" ? "active" : ""}" type="button" data-theme-choice="light">${icon("sun")} Light</button>
              <button class="${prefs.theme === "system" ? "active" : ""}" type="button" data-theme-choice="system">${icon("screen")} System</button>
              <button class="${prefs.theme === "custom" ? "active" : ""}" type="button" data-theme-choice="custom">${icon("brush")} Custom</button>
            </div>
          </div>
          ${prefs.theme === "custom" ? `
          <div class="settings-row settings-row-col custom-skin-row">
            <div><strong>Custom background</strong><small>These four colours repaint the whole app. Text, borders and hover shades adjust automatically.</small></div>
            <div class="custom-theme-grid custom-skin-grid">
              ${skinFields.map(([key, label]) => `<label class="color-field"><span>${escapeHtml(label)}</span><input type="color" data-pref="customBackground.${key}" value="${escapeAttr(safeHex(skin[key], SKIN_DEFAULT[key]))}"></label>`).join("")}
            </div>
            <div class="skin-presets">
              <span class="eyebrow">Quick presets</span>
              <div class="skin-preset-row">
                ${SKIN_PRESETS.map((preset) => `<button class="skin-preset ${presetActive(preset) ? "active" : ""}" type="button" data-settings-action="apply-skin-preset" data-preset="${escapeAttr(preset.id)}" style="--preset-bg:${preset.colors.bg};--preset-side:${preset.colors.side};--preset-chat:${preset.colors.chat};--preset-card:${preset.colors.card}"><span class="skin-preset-chip"></span>${escapeHtml(preset.label)}</button>`).join("")}
              </div>
            </div>
            <div class="settings-actions">
              <button class="ghost-btn small" type="button" data-settings-action="reset-skin">${icon("refresh")} Reset colours</button>
              <span class="muted-small skin-hint">${icon("shieldCheck")} Contrast is derived from your chat colour.</span>
            </div>
          </div>` : ""}
          <div class="settings-row settings-row-col"><div><strong>Colour themes</strong><small>Pick the accent that runs through buttons, links and highlights.</small></div>
            <div class="accent-picker accent-picker-wide">
              ${Object.entries(ACCENTS).map(([id, accent]) => `<button class="accent-swatch ${prefs.accent === id ? "active" : ""}" type="button" data-accent-choice="${escapeAttr(id)}" style="--swatch-a:${accent.a};--swatch-b:${accent.b}" title="${escapeAttr(accent.label)}"><span>${escapeHtml(accent.label)}</span></button>`).join("")}
              <button class="accent-swatch accent-swatch-custom ${custom ? "active" : ""}" type="button" data-accent-choice="custom" style="--swatch-a:${prefs.customTheme.a};--swatch-b:${prefs.customTheme.b}" title="Custom"><span>Custom</span></button>
            </div>
          </div>
          <div class="settings-row settings-row-col"><div><strong>Custom accent</strong><small>Three colours for the accent itself. Separate from your background skin.</small></div>
            <div class="custom-theme-grid">
              <label class="color-field"><span>Primary</span><input type="color" data-pref="customTheme.a" value="${escapeAttr(prefs.customTheme.a)}"></label>
              <label class="color-field"><span>Secondary</span><input type="color" data-pref="customTheme.b" value="${escapeAttr(prefs.customTheme.b)}"></label>
              <label class="color-field"><span>Third</span><input type="color" data-pref="customTheme.c" value="${escapeAttr(prefs.customTheme.c)}"></label>
            </div>
          </div>
          ${settingRange("Accent intensity", "How strongly the accent colours blend into the background.", "intensity", prefs.intensity, 0, 100, 1, "%")}
          ${settingRange("Message text size", "Scale chat text without zooming the whole window.", "fontScale", prefs.fontScale, 85, 135, 5, "%")}
          ${settingSwitch("Compact messages", "Tighter spacing for more conversation per screen.", "compact")}
          ${settingSwitch("Reduce motion", "Disable decorative animations and movement.", "reduceMotion")}
        </div>
        <div class="settings-preview">
          <span class="eyebrow">Preview</span>
          <div class="settings-preview-card">
            ${avatarWrap(user, "avatar-40")}
            <div><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.customStatus || "online")}</small></div>
            <span class="badge-pill" style="--badge-a:${accentA};--badge-b:${accentB}">${icon("sparkles")}<span>${escapeHtml(accentLabel)}</span></span>
          </div>
        </div>
      </div>`;
  }
  if (tab === "chat") {
    return `
      <div class="settings-panel">
        <h3>Chat</h3>
        <p class="muted-small">How messages feel while you read and write them.</p>
        <div class="settings-card">
          ${settingRange("Message text size", "Scale chat text on its own.", "fontScale", prefs.fontScale, 85, 135, 5, "%")}
          ${settingSwitch("Compact messages", "Less breathing room, more messages.", "compact")}
          ${settingSwitch("Group consecutive messages", "Fold messages from the same person into one block.", "messageGrouping")}
          ${settingSwitch("Show timestamps", "Show the time next to each message group.", "showTimestamps")}
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Composer</strong><small>Everything sends instantly. Enter sends, Shift+Enter makes a new line.</small></div>
          <div class="settings-card">
            ${settingSwitch("Emoji picker", "Keep the quick emoji button beside the composer.", "emojiPicker")}
            ${settingSwitch("Link previews", "Let link cards expand in messages.", "showLinkPreviews")}
            ${settingSwitch("Inline media", "Show images and attachments expanded instead of as links.", "inlineMedia")}
          </div>
        </div>
      </div>`;
  }
  if (tab === "language") {
    let sample = "";
    try {
      sample = new Intl.DateTimeFormat(prefs.language, { dateStyle: "full", timeStyle: "short" }).format(new Date());
    } catch {
      sample = new Date().toLocaleString();
    }
    return `
      <div class="settings-panel">
        <h3>Language</h3>
        <p class="muted-small">Dates, times, and number formatting follow this choice. Nodum's interface copy is currently English.</p>
        <div class="settings-card">
          ${settingSelect("Language", "Used for dates, times, and calendar labels.", "language", LANGUAGE_OPTIONS)}
          <div class="settings-row"><div><strong>Preview</strong><small>${escapeHtml(sample)}</small></div><span class="status-pill approved">${escapeHtml(prefs.language)}</span></div>
        </div>
        <p class="field-hint">${icon("info")} Chat messages are not translated automatically. This only changes how Nodum formats dates and times for you.</p>
      </div>`;
  }
  if (tab === "voice") {
    return `
      <div class="settings-panel">
        <h3>Voice &amp; Audio</h3>
        <p class="muted-small">Pick the headset and microphone Nodum should use. Audio is peer-to-peer; nothing is recorded and no remote server hears your mic.</p>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Devices</strong><small>Choose what Nodum listens to and plays through.</small></div>
          <div class="settings-card">
            <div class="settings-row"><div><strong>Microphone</strong><small>Used when you join a voice channel or test your mic.</small></div>
              <select class="settings-select" id="voiceInputDevice" aria-label="Microphone">${voiceDeviceOptions("input", prefs.inputDeviceId)}</select></div>
            <div class="settings-row"><div><strong>Speaker / headphones</strong><small>Where other people's voices play.</small></div>
              <select class="settings-select" id="voiceOutputDevice" aria-label="Speaker or headphones">${voiceDeviceOptions("output", prefs.outputDeviceId)}</select></div>
            <div class="settings-row"><div><strong>Microphone access</strong><small>Allow Nodum to read device names and test your mic.</small></div>
              <div class="inline-actions"><button class="ghost-btn small" type="button" data-settings-action="request-mic">${icon("mic")} Allow</button><button class="ghost-btn small" type="button" data-settings-action="refresh-devices">${icon("refresh")} Refresh</button></div></div>
            <div class="settings-row settings-row-mic"><div><strong>Mic test</strong><small id="micTestCopy">Say something and watch the level.</small></div>
              <div class="mic-test"><div class="mic-level" id="micLevel" aria-hidden="true"><span></span></div><button class="ghost-btn small" type="button" data-settings-action="test-mic">${icon("play")} Test</button></div></div>
          </div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Levels and cleanup</strong><small>Fine-tune how you sound and how loud everyone else is.</small></div>
          <div class="settings-card">
            ${settingRange("Input volume", "How loud your mic sounds to everyone else.", "inputVolume", prefs.inputVolume)}
            ${settingRange("Output volume", "How loud other people sound to you.", "outputVolume", prefs.outputVolume)}
            ${settingSwitch("Noise suppression", "Filter fans, keyboards, and background hiss.", "noiseSuppression")}
            ${settingSwitch("Echo cancellation", "Stop your speakers from feeding back into your mic.", "echoCancellation")}
            ${settingSwitch("Join and leave sounds", "Play a short tone when you enter or leave a room.", "joinSound")}
          </div>
        </div>
        <p class="field-hint">${icon("info")} If audio is blocked, click once anywhere on the page and rejoin the channel. Device names appear after you allow microphone access.</p>
      </div>`;
  }
  if (tab === "sounds") {
    return `
      <div class="settings-panel">
        <h3>Sounds</h3>
        <p class="muted-small">How loud Nodum's own sounds are. Calls and the soundboard have their own volume in Voice & Audio.</p>
        <div class="settings-card">
          ${settingRange("Sound volume", "Master volume for notifications and interface sounds.", "masterVolume", prefs.masterVolume)}
          ${settingSwitch("Notification sounds", "Off means no ping for new messages.", "notificationSounds")}
        </div>
        ${prefs.pauseNotifications ? `<p class="field-hint">${icon("bellOff")} You are paused. Only sounds for things you do yourself will play.</p>` : ""}
        <div class="settings-block">
          <div class="settings-block-head"><strong>Notification sounds</strong><small>Test each one. These are generated locally with Web Audio.</small></div>
          <div class="settings-card">
            ${SOUND_EVENTS.map((event) => `<div class="settings-row"><div><strong>${escapeHtml(event.label)}</strong><small>${prefGet(`soundEvents.${event.id}`) ? "On" : "Off"}</small></div><div class="inline-actions"><label class="mini-switch"><input type="checkbox" data-pref="soundEvents.${event.id}" ${prefGet(`soundEvents.${event.id}`) ? "checked" : ""}><span class="switch"></span></label><button class="ghost-btn small" type="button" data-settings-action="test-sound" data-sound="${event.id}">${icon("play")} Test</button></div></div>`).join("")}
          </div>
        </div>
      </div>`;
  }
  if (tab === "notifications") {
    const requests = (world.friendRequests || []).length;
    const unreadDms = Object.values(world.dms || {}).filter((dm) => dm.participants?.includes(me().id) && unreadForDm(dm) > 0).length;
    const pending = canModerateGlobal() ? pendingSubmissions().length + pendingStaffApplications().length + pendingPlusOrders().length : 0;
    return `
      <div class="settings-panel">
        <h3>Notifications</h3>
        <p class="muted-small">Choose what gets your attention and what can wait.</p>
        <div class="settings-card">
          ${settingSwitch("Desktop notifications", "Get a pop-up for new messages while Nodum is not in focus.", "desktopNotifications")}
          ${settingSwitch("Pause notifications", "Mute badges and sounds until you turn this back off.", "pauseNotifications")}
          <div class="settings-row"><div><strong>Test a desktop notification</strong><small>Checks that your browser allows pop-ups from Nodum.</small></div><button class="ghost-btn small" type="button" data-settings-action="test-notification">${icon("bell")} Send test</button></div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Inbox</strong><small>Everything waiting for you right now.</small></div>
          <div class="settings-card">
            <div class="settings-row"><div><strong>Friend requests</strong><small>${requests ? `${requests} waiting for an answer.` : "Nothing waiting."}</small></div><span class="status-pill ${requests ? "pending" : "approved"}">${requests}</span></div>
            <div class="settings-row"><div><strong>Unread DMs</strong><small>${unreadDms ? `${unreadDms} conversation${unreadDms === 1 ? "" : "s"} with new messages.` : "All caught up."}</small></div><span class="status-pill ${unreadDms ? "pending" : "approved"}">${unreadDms}</span></div>
            <div class="settings-row"><div><strong>Mod queue</strong><small>${pending ? `${pending} submission${pending === 1 ? "" : "s"} to review.` : "Nothing to review."}</small></div><span class="status-pill ${pending ? "pending" : "approved"}">${pending}</span></div>
          </div>
        </div>
        <div class="settings-actions">
          <button class="primary-btn" type="button" data-action="open-notifications">${icon("bell")} Open inbox</button>
          <button class="ghost-btn" type="button" data-settings-action="mark-read">${icon("check")} Mark all read</button>
        </div>
      </div>`;
  }
  if (tab === "keybinds") {
    const rows = [
      ["search", "Open search", "Jump to messages, people, channels, and servers."],
      ["mute", "Mute / unmute", "Toggle your mic anywhere in the app."],
      ["settings", "Open settings", "Jump straight into Nodum settings."],
      ["close", "Close a dialog", "Dismiss the open window or menu."]
    ];
    return `
      <div class="settings-panel">
        <h3>Keybinds</h3>
        <p class="muted-small">Click a shortcut, then press the keys you want. Changes save instantly.</p>
        <div class="settings-card">
          ${rows.map(([id, label, copy]) => `<div class="settings-row"><div><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></div><div class="keybind-row"><kbd>${escapeHtml(prefs.keybinds[id] || "Not set")}</kbd><button class="ghost-btn small" type="button" data-settings-action="change-keybind" data-keybind="${id}">${icon("edit")} Change</button></div></div>`).join("")}
        </div>
        <div class="settings-actions"><button class="ghost-btn" type="button" data-settings-action="reset-keybinds">${icon("refresh")} Reset to defaults</button></div>
        <p class="field-hint">${icon("info")} Shortcuts work while you are not typing in a text field, except the search shortcut which always works.</p>
      </div>`;
  }
  if (tab === "desktop") {
    return `
      <div class="settings-panel">
        <h3>Desktop app</h3>
        <p class="muted-small">Nodum is a local-first web app. Install it from the browser to get its own window and launcher icon.</p>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Install Nodum</strong><small>${deferredInstallPrompt ? "Your browser is ready to install Nodum right now." : "Use your browser menu and choose Install Nodum or Add to Home Screen."}</small></div><button class="primary-btn small" type="button" data-settings-action="install-desktop">${icon("download")} Install</button></div>
          <div class="settings-row"><div><strong>Open in its own window</strong><small>Launches Nodum in a separate app-like window.</small></div><button class="ghost-btn small" type="button" data-settings-action="open-window">${icon("maximize")} Open window</button></div>
          ${settingSwitch("Minimise to tray", "Keep Nodum running quietly when you close the window.", "desktop.minimizeToTray")}
          ${settingSwitch("Open at startup", "Launch Nodum when this computer starts.", "desktop.launchOnStartup")}
          ${settingSwitch("Hardware acceleration", "Use the GPU for smoother animations. Takes effect next launch.", "desktop.hardwareAcceleration")}
        </div>
        <p class="field-hint">${icon("shieldCheck")} There is no remote desktop service. These switches only save local preferences.</p>
      </div>`;
  }
  if (tab === "advanced") {
    const sites = prefs.trustedSites || [];
    return `
      <div class="settings-panel">
        <h3>Advanced</h3>
        <p class="muted-small">Power-user switches and local safety tools.</p>
        <div class="settings-card">
          ${settingSwitch("Desktop notifications", "Get a pop-up for new messages while Nodum is not in focus.", "desktopNotifications")}
          ${settingSwitch("Developer mode", "Show IDs and copy helpers for building local integrations.", "developerMode")}
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Trusted sites</strong><small>Links to these domains open without asking. Only add sites you actually trust.</small></div>
          <div class="settings-card">
            ${sites.length ? sites.map((site) => `<div class="settings-row"><div><strong>${escapeHtml(site)}</strong><small>Links open directly.</small></div><button class="danger-btn small" type="button" data-settings-action="remove-trusted-site" data-site="${escapeAttr(site)}">${icon("trash")} Remove</button></div>`).join("") : `<div class="settings-row"><div><strong>No trusted sites</strong><small>You have not trusted any domains yet.</small></div><button class="ghost-btn small" type="button" data-settings-action="add-trusted-site">${icon("plus")} Add</button></div>`}
          </div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Email delivery</strong><small>Nodum sends verification codes through a tiny local relay. Run <code>node mail-relay.mjs</code> in the Nodum folder, then test it here.</small></div>
          <div class="settings-card">
            <div class="settings-row settings-row-col"><div><strong>Relay address</strong><small>The relay listens on port 4319 by default.</small></div>
              <div class="inline-form"><input class="settings-inline-input" id="mailEndpointInput" value="${escapeAttr(prefs.mailEndpoint || "http://127.0.0.1:4319")}" placeholder="http://127.0.0.1:4319"><button class="ghost-btn small" type="button" data-settings-action="save-mail-endpoint">${icon("check")} Save</button></div>
            </div>
            <div class="settings-row"><div><strong>Connection</strong><small id="mailRelayStatus">Test the relay after starting it.</small></div><button class="ghost-btn small" type="button" data-settings-action="test-mail-relay">${icon("send")} Test relay</button></div>
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Join the staff team</strong><small>Answer a few questions and let moderators review your application.</small></div><button class="ghost-btn small" type="button" data-settings-action="goto-staff">${icon("shieldCheck")} Staff team</button></div>
          <div class="settings-row"><div><strong>Local storage</strong><small>World, accounts, preferences, and sessions on this device.</small></div><button class="ghost-btn small" type="button" data-action="export-data">${icon("download")} Export</button></div>
        </div>
        <div class="settings-actions"><button class="danger-btn" type="button" data-action="reset-world">${icon("trash")} Reset everything</button></div>
      </div>`;
  }
  if (tab === "developer") {
    const apps = prefs.devApps || [];
    return `
      <div class="settings-panel">
        <h3>Developer Portal</h3>
        <p class="muted-small">Local apps, tokens, and API reference in one place. Nothing here creates accounts, bots, or remote services.</p>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Developer mode</strong><small>Show IDs and copy helpers while you build.</small></div><input type="checkbox" class="settings-check" data-pref="developerMode" ${prefs.developerMode ? "checked" : ""}></div>
          <div class="settings-row"><div><strong>Your user ID</strong><small>${escapeHtml(user.id)}</small></div><button class="ghost-btn small" type="button" data-settings-action="copy-text" data-copy="${escapeAttr(user.id)}">${icon("copy")} Copy</button></div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Apps</strong><small>Create a local client ID and secret. Secrets are shown once unless you reveal them.</small></div>
          <div class="inline-form"><input class="settings-inline-input" id="devAppName" maxlength="32" placeholder="My local app"><button class="primary-btn" type="button" data-settings-action="create-dev-app">${icon("plus")} New app</button></div>
          ${apps.length ? `<div class="dev-app-list">${apps.map((app) => `
            <div class="dev-app">
              <div class="dev-app-head"><span class="authorized-mark">${icon("chip")}</span><div><strong>${escapeHtml(app.name)}</strong><small>Created ${formatShortDate(app.createdAt)}</small></div><button class="danger-btn small" type="button" data-settings-action="delete-dev-app" data-app-id="${escapeAttr(app.id)}">${icon("trash")} Delete</button></div>
              <div class="dev-token"><span>Client ID</span><code>${escapeHtml(app.clientId)}</code><button class="icon-btn small" type="button" data-settings-action="copy-text" data-copy="${escapeAttr(app.clientId)}" aria-label="Copy client ID">${icon("copy")}</button></div>
              <div class="dev-token"><span>Client secret</span><code>${settingsDraft?.revealSecret === app.id ? escapeHtml(app.secret) : "••••••••••••••••••••"}</code><button class="ghost-btn small" type="button" data-settings-action="reveal-secret" data-app-id="${escapeAttr(app.id)}">${settingsDraft?.revealSecret === app.id ? "Hide" : "Reveal"}</button><button class="ghost-btn small" type="button" data-settings-action="rotate-secret" data-app-id="${escapeAttr(app.id)}">${icon("refresh")} Rotate</button></div>
            </div>`).join("")}</div>` : `<div class="settings-empty small">${icon("chip")}<strong>No apps yet</strong><p>Make one to get a client ID and secret.</p></div>`}
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>API reference</strong><small>Base URL <code>local://nodum/api/v1</code>. Authorization header: <code>Bearer &lt;token&gt;</code>.</small></div>
          <div class="api-list">
            ${[["GET", "/users/@me", "Read your local profile."], ["GET", "/servers", "List servers you belong to."], ["GET", "/channels/:id/messages", "Read messages in a channel."], ["POST", "/channels/:id/messages", "Send a message as you."], ["GET", "/friends", "List your real friends."]].map(([method, path, copy]) => `<div class="api-row"><span class="api-method ${method === "POST" ? "post" : "get"}">${method}</span><code>${escapeHtml(path)}</code><small>${escapeHtml(copy)}</small><button class="icon-btn small" type="button" data-settings-action="copy-text" data-copy="${escapeAttr(`${method} ${path}`)}" aria-label="Copy endpoint">${icon("copy")}</button></div>`).join("")}
          </div>
        </div>
        <div class="settings-actions">
          <button class="ghost-btn" type="button" data-settings-action="copy-text" data-copy="${escapeAttr("Authorization: Bearer <token>")}">${icon("key")} Copy auth header</button>
          <button class="ghost-btn" type="button" data-settings-action="copy-starter">${icon("copy")} Copy starter snippet</button>
        </div>
      </div>`;
  }
  if (tab === "subscriptions") {
    const order = myPlusOrder();
    const active = me().plus;
    return `
      <div class="settings-panel">
        <h3>Subscriptions</h3>
        <p class="muted-small">Nodum has one optional tier. This local build cannot charge Robux or cards; Plus is approved by a moderator.</p>
        <div class="plan-card featured">
          <div class="plan-head"><span class="plan-mark">${icon("crown")}</span><div><strong>Nodum Plus</strong><small>${active ? "Active on this profile" : order ? "Request waiting for approval" : "1,000 Robux gamepass request"}</small></div><span class="status-pill ${active ? "approved" : order ? "pending" : ""}">${active ? "Active" : order ? "Pending" : "Optional"}</span></div>
          <ul class="plan-list"><li>${icon("check")} Colored PLUS tag and animated avatar ring</li><li>${icon("check")} 2x chat shards and 10-shard daily check-in</li><li>${icon("check")} 2 server boosts on approval</li><li>${icon("check")} 20% off paid decoration frames</li></ul>
          <div class="settings-actions"><button class="primary-btn small" type="button" data-settings-action="goto-plus">${icon("sparkles")} ${active ? "Open Plus" : order ? "View request" : "Explore Plus"}</button><button class="ghost-btn small" type="button" data-settings-action="restore-purchases">${icon("refresh")} Restore purchases</button></div>
        </div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Payment method</strong><small>No card or Roblox login is stored on this device.</small></div><span class="status-pill">None</span></div>
          <div class="settings-row"><div><strong>Billing history</strong><small>${order ? `Local request · ${escapeHtml(order.reference || "no reference")}` : active ? "Plus approved locally. No charge was made." : "No local orders yet."}</small></div><span class="status-pill">${active ? "local" : order ? "pending" : "Empty"}</span></div>
        </div>
      </div>`;
  }
  if (tab === "creators") {
    const application = prefs.creatorApplication;
    return `
      <div class="settings-panel">
        <h3>Creator Program</h3>
        <p class="muted-small">Make videos or posts about Nodum and earn Plus, a badge, and Shards for every real person your invite link brings in.</p>
        <div class="settings-card">
          <div class="settings-row"><div><strong>What you still need</strong><small>A public channel on YouTube, TikTok, Twitch, Instagram or X with 1,000+ followers and a post in the last 60 days.</small></div><span class="status-pill ${application ? "approved" : "pending"}">${application ? "Applied" : "Not applied"}</span></div>
          <div class="settings-row"><div><strong>Verification line</strong><small>Put this in your channel bio until your badge arrives.</small></div><div class="keybind-row"><kbd>nodum: ${escapeHtml(user.handle)}</kbd><button class="ghost-btn small" type="button" data-settings-action="copy-text" data-copy="nodum: ${escapeAttr(user.handle)}">${icon("copy")} Copy</button></div></div>
        </div>
        ${application ? `
          <div class="settings-empty small">${icon("rocket")}<strong>Application received</strong><p>Submitted ${formatShortDate(application.submittedAt)} · ${escapeHtml(application.channel)} · ${escapeHtml(String(application.followers))} followers. Applications are stored locally in this build.</p><button class="ghost-btn small" type="button" data-settings-action="creator-withdraw">Withdraw application</button></div>` : `
          <div class="settings-block">
            <div class="settings-block-head"><strong>Apply right here</strong><small>Link your channel and tell us how many followers you have.</small></div>
            <div class="form-stack">
              <label class="field"><span>Channel URL</span><input id="creatorChannel" placeholder="https://youtube.com/@yourname"></label>
              <label class="field"><span>Followers or subscribers</span><input id="creatorFollowers" type="number" min="0" placeholder="1000"></label>
              <div class="settings-actions"><button class="primary-btn" type="button" data-settings-action="creator-apply">${icon("send")} Apply for the program</button></div>
            </div>
          </div>`}
      </div>`;
  }
  if (tab === "leaderboards") {
    const kinds = [["messages", "Messages"], ["voice", "Voice"], ["shards", "Shards"], ["gifts", "Gifts"], ["invites", "Invites"]];
    const active = settingsDraft?.leaderboardTab || "messages";
    const rows = leaderboardRows(active);
    return `
      <div class="settings-panel">
        <h3>Leaderboards</h3>
        <p class="muted-small">Built only from real activity in this local world. No fake profiles, no seeded scores.</p>
        <div class="leaderboard-tabs">${kinds.map(([id, label]) => `<button class="ghost-btn small ${active === id ? "active" : ""}" type="button" data-settings-action="leaderboard-tab" data-tab="${id}">${escapeHtml(label)}</button>`).join("")}</div>
        <div class="settings-card leaderboard-card">
          ${rows.map(({ user: entry, value }, index) => `<div class="leaderboard-row ${entry.id === user.id ? "me" : ""}"><span class="leaderboard-rank">${index + 1}</span>${avatarWrap(entry, "avatar-32")}<div><strong>${escapeHtml(entry.name)} ${entry.id === user.id ? `<span class="you-pill">you</span>` : ""}</strong><small>@${escapeHtml(entry.handle)} · level ${accountLevel(localMessageCount(entry.id))}</small></div><span class="leaderboard-value">${value.toLocaleString()}</span></div>`).join("")}
        </div>
        <p class="field-hint">${icon("info")} Levels grow with real messages. Voice is estimated from your message activity because this build does not log call time.</p>
      </div>`;
  }
  if (tab === "shards") {
    const history = prefs.shardHistory || [];
    const bonus = me().plus ? 10 : 5;
    return `
      <div class="settings-panel">
        <h3>Shards</h3>
        <p class="muted-small">Shards are Nodum's local reward currency. Chat every day, check in, and sell decorations to earn them.</p>
        <div class="shard-hero">
          <span class="shard-gem">${icon("sparkles")}</span>
          <div><strong>${myShards().toLocaleString()} shards</strong><small>${prefs.lastShardClaim ? `Last claimed ${formatShortDate(prefs.lastShardClaim)}` : "You have not claimed your daily shard yet."}</small></div>
          <button class="primary-btn small" type="button" data-settings-action="claim-shard">${icon("gift")} Claim daily +${bonus}</button>
        </div>
        <div class="settings-card">
          <div class="settings-row"><div><strong>Daily check-in</strong><small>${bonus} shards every 24 hours${me().plus ? " with Plus" : " · Plus doubles it"}.</small></div><span class="status-pill approved">+${bonus}</span></div>
          <div class="settings-row"><div><strong>Chat activity</strong><small>Earn shards as you chat, with a daily streak bonus. Plus earns 2x.</small></div><span class="status-pill approved">${chatRewardToday().earned}/${chatShardCap()}</span></div>
          <div class="settings-row"><div><strong>Sell decorations</strong><small>List an approved frame for shards. Buyers unlock it and you keep the shards.</small></div><button class="ghost-btn small" type="button" data-action="open-studio">${icon("wand")} Studio</button></div>
          <div class="settings-row"><div><strong>Creator rewards</strong><small>Earn shards when real people join from your invite link.</small></div><button class="ghost-btn small" type="button" data-settings-action="goto-creators">${icon("rocket")} Creator program</button></div>
          <div class="settings-row"><div><strong>Gifts</strong><small>Shards can be gifted locally to real friends.</small></div><button class="ghost-btn small" type="button" data-settings-action="gift-shard">${icon("gift")} Gift shards</button></div>
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>History</strong><small>Every local shard change.</small></div>
          <div class="settings-card">
            ${history.length ? history.map((entry) => `<div class="settings-row"><div><strong>${entry.amount > 0 ? "+" : ""}${entry.amount} shards</strong><small>${escapeHtml(entry.reason || "Local reward")} · ${formatShortDate(entry.at)}</small></div><span class="status-pill">${entry.amount > 0 ? "earned" : "spent"}</span></div>`).join("") : `<div class="settings-row"><div><strong>No history yet</strong><small>Claim your daily shard to start.</small></div><span class="status-pill">0</span></div>`}
          </div>
        </div>
      </div>`;
  }
  if (tab === "staff") {
    const application = staffApplicationFor(me().id);
    const isStaff = (world.staffTeam || []).includes(me().id) || (me().badges || []).includes("moderator");
    const pending = application?.status === "pending";
    const declined = application?.status === "declined";
    return `
      <div class="settings-panel">
        <h3>Staff team</h3>
        <p class="muted-small">Staff keep Nodum safe. Applications use real questions and are reviewed by moderators, just like decoration submissions.</p>
        ${isStaff ? `
          <div class="settings-card">
            <div class="settings-row"><div><strong>You're on the staff team</strong><small>Your moderator badge is active. Reviews show up in the Moderation section of settings.</small></div><span class="status-pill approved">${icon("shieldCheck")} Staff</span></div>
            ${canModerateGlobal() ? `<div class="settings-row"><div><strong>Review queue</strong><small>${pendingStaffApplications().length} staff application${pendingStaffApplications().length === 1 ? "" : "s"} waiting.</small></div><button class="ghost-btn small" type="button" data-settings-action="goto-staff-apps">${icon("shieldStar")} Open queue</button></div>` : ""}
          </div>` : ""}
        ${pending ? `
          <div class="staff-application-card">
            <div class="staff-app-head"><span class="staff-app-mark">${icon("send")}</span><div><strong>Application under review</strong><small>Submitted ${formatRelative(application.submittedAt)}</small></div><span class="status-pill pending">pending</span></div>
            <dl class="staff-answers">
              <div><dt>Why staff?</dt><dd>${escapeHtml(application.answers?.why || "")}</dd></div>
              <div><dt>Weekly time</dt><dd>${escapeHtml(application.answers?.time || "")}</dd></div>
              <div><dt>Experience</dt><dd>${escapeHtml(application.answers?.experience || "")}</dd></div>
              <div><dt>Raid scenario</dt><dd>${escapeHtml(application.answers?.scenario || "")}</dd></div>
            </dl>
            <div class="settings-actions"><button class="ghost-btn small" type="button" data-settings-action="withdraw-staff-app">${icon("x")} Withdraw application</button></div>
          </div>` : ""}
        ${declined ? `
          <div class="staff-application-card declined">
            <div class="staff-app-head"><span class="staff-app-mark">${icon("info")}</span><div><strong>Previous application declined</strong><small>${formatRelative(application.reviewedAt || application.submittedAt)}</small></div><span class="status-pill rejected">declined</span></div>
            ${application.note ? `<p class="staff-app-note-copy">“${escapeHtml(application.note)}”</p>` : ""}
            <p class="muted-small">You can apply again with updated answers.</p>
          </div>` : ""}
        ${!isStaff && !pending ? `
          <div class="settings-block">
            <div class="settings-block-head"><strong>Application questions</strong><small>Answer honestly. Short, low-effort answers are declined.</small></div>
            <div class="form-stack">
              <label class="field"><span>Why do you want to join Nodum staff?</span><textarea class="settings-textarea" id="staffWhy" rows="3" maxlength="500" placeholder="What you want to help with, and why now."></textarea></label>
              <div class="field-row">
                <label class="field"><span>Time available each week</span><input id="staffTime" maxlength="80" placeholder="e.g. 8 hours, evenings UTC"></label>
                <label class="field"><span>18+ confirmation</span><label class="check-row staff-check"><input id="staffAge" type="checkbox"><span>I am 18 or older</span></label></label>
              </div>
              <label class="field"><span>Moderation experience</span><textarea class="settings-textarea" id="staffExperience" rows="3" maxlength="500" placeholder="Communities, tools, or situations you have handled."></textarea></label>
              <label class="field"><span>Scenario: a raid starts in three channels at once. What do you do first?</span><textarea class="settings-textarea" id="staffScenario" rows="4" maxlength="600" placeholder="Walk us through your first five minutes."></textarea></label>
              <label class="check-row staff-check"><input id="staffRules" type="checkbox"><span>I agree to follow the staff guidelines and keep reports private.</span></label>
              <div class="settings-actions"><button class="primary-btn" type="button" data-settings-action="submit-staff-app">${icon("send")} Submit application</button></div>
            </div>
          </div>` : ""}
        <p class="field-hint">${icon("shieldCheck")} Every application gets its own review card. Moderators can accept or decline from the Staff applications panel.</p>
      </div>`;
  }
  if (tab === "staff-apps") {
    if (!canModerateGlobal()) {
      return `<div class="settings-panel"><h3>Staff applications</h3><div class="empty-yap"><h3>Moderators only</h3><p>You need a moderator role to review applications.</p></div></div>`;
    }
    const pending = pendingStaffApplications();
    const recent = (world.staffApplications || []).filter((app) => app.status !== "pending").slice(0, 6);
    return `
      <div class="settings-panel">
        <div class="settings-title-row"><div><h3>Staff applications</h3><p class="muted-small">One card per application. Read every answer, add a note, then accept or decline.</p></div><span class="status-pill ${pending.length ? "pending" : "approved"}">${pending.length} pending</span></div>
        ${pending.length ? pending.map((app) => {
          const applicant = getUser(app.userId);
          return `<div class="staff-application-card" data-staff-app-id="${escapeAttr(app.id)}">
            <div class="staff-app-head">
              ${avatarWrap(applicant, "avatar-40")}
              <div><strong>${escapeHtml(applicant.name)}</strong><small>@${escapeHtml(applicant.handle)} · submitted ${formatRelative(app.submittedAt)}</small></div>
              <span class="status-pill pending">pending</span>
            </div>
            <dl class="staff-answers">
              <div><dt>Why staff?</dt><dd>${escapeHtml(app.answers?.why || "")}</dd></div>
              <div><dt>Weekly time</dt><dd>${escapeHtml(app.answers?.time || "")}</dd></div>
              <div><dt>Experience</dt><dd>${escapeHtml(app.answers?.experience || "")}</dd></div>
              <div><dt>Raid scenario</dt><dd>${escapeHtml(app.answers?.scenario || "")}</dd></div>
            </dl>
            <label class="field"><span>Moderator note (optional)</span><input class="settings-inline-input staff-app-note" maxlength="200" placeholder="Why are you accepting or declining?"></label>
            <div class="mod-card-actions">
              <button class="danger-btn small" type="button" data-settings-action="decline-staff-app" data-app-id="${escapeAttr(app.id)}">${icon("x")} Decline</button>
              <button class="primary-btn small" type="button" data-settings-action="accept-staff-app" data-app-id="${escapeAttr(app.id)}">${icon("check")} Accept</button>
            </div>
          </div>`;
        }).join("") : `<div class="empty-yap small"><span class="empty-emoji">🛡️</span><h3>No applications waiting</h3><p>New staff applications appear here automatically.</p></div>`}
        ${recent.length ? `<div class="settings-block"><div class="settings-block-head"><strong>Recently reviewed</strong><small>Accepted and declined applications.</small></div><div class="settings-card">${recent.map((app) => { const applicant = getUser(app.userId); return `<div class="settings-row"><div><strong>${escapeHtml(applicant.name)}</strong><small>${escapeHtml(app.status)} · ${formatRelative(app.reviewedAt || app.submittedAt)}${app.note ? ` · ${escapeHtml(app.note)}` : ""}</small></div><span class="status-pill ${app.status === "accepted" ? "approved" : "rejected"}">${escapeHtml(app.status)}</span></div>`; }).join("")}</div></div>` : ""}
      </div>`;
  }
  if (tab === "plus-orders") {
    if (!canModerateGlobal()) {
      return `<div class="settings-panel"><h3>Plus orders</h3><div class="empty-yap"><h3>Moderators only</h3><p>You need a moderator role to review Plus requests.</p></div></div>`;
    }
    const pending = pendingPlusOrders();
    const recent = (world.plusOrders || []).filter((order) => order.status !== "pending").slice(0, 8);
    return `
      <div class="settings-panel">
        <div class="settings-title-row"><div><h3>Plus orders</h3><p class="muted-small">Local Robux gamepass requests. This app never charges Robux; approval here unlocks Plus and grants 2 server boosts.</p></div><span class="status-pill ${pending.length ? "pending" : "approved"}">${pending.length} pending</span></div>
        ${pending.length ? pending.map((order) => {
          const buyer = getUser(order.userId);
          return `<div class="staff-application-card plus-order-card" data-plus-order-id="${escapeAttr(order.id)}">
            <div class="staff-app-head">
              ${avatarWrap(buyer, "avatar-40")}
              <div><strong>${escapeHtml(buyer.name)}</strong><small>@${escapeHtml(buyer.handle)} · ${formatRelative(order.submittedAt)}</small></div>
              <span class="status-pill pending">${Number(order.cost || 1000).toLocaleString()} R$</span>
            </div>
            <div class="plus-order-reference"><span>Reference</span><strong>${escapeHtml(order.reference || "none")}</strong></div>
            ${order.note ? `<p class="staff-app-note-copy">“${escapeHtml(order.note)}”</p>` : ""}
            <label class="field"><span>Moderator note (optional)</span><input class="settings-inline-input plus-order-note" maxlength="200" placeholder="Gamepass checked, or why this is declined."></label>
            <div class="mod-card-actions">
              <button class="danger-btn small" type="button" data-settings-action="decline-plus-order" data-order-id="${escapeAttr(order.id)}">${icon("x")} Decline</button>
              <button class="primary-btn small" type="button" data-settings-action="approve-plus-order" data-order-id="${escapeAttr(order.id)}">${icon("check")} Approve Plus</button>
            </div>
          </div>`;
        }).join("") : `<div class="empty-yap small"><span class="empty-emoji">👑</span><h3>No Plus requests</h3><p>Requests appear here when someone asks for Plus through the gamepass flow.</p></div>`}
        ${recent.length ? `<div class="settings-block"><div class="settings-block-head"><strong>Reviewed requests</strong><small>Local approval history.</small></div><div class="settings-card">${recent.map((order) => { const buyer = getUser(order.userId); return `<div class="settings-row"><div><strong>${escapeHtml(buyer.name)}</strong><small>${escapeHtml(order.status)} · ${escapeHtml(order.reference || "no reference")} · ${formatRelative(order.reviewedAt || order.submittedAt)}${order.note ? ` · ${escapeHtml(order.note)}` : ""}</small></div><span class="status-pill ${order.status === "approved" ? "approved" : "rejected"}">${escapeHtml(order.status)}</span></div>`; }).join("")}</div></div>` : ""}
      </div>`;
  }
  if (tab === "plus") {
    const pendingOrder = myPlusOrder();
    const active = Boolean(user.plus);
    const boosts = myBoostCredits();
    const boostServers = (world.servers || []).filter((server) => isMember(server, user.id) || server.ownerId === user.id);
    return `
      <div class="settings-panel">
        <h3>Nodum Plus</h3>
        <p class="muted-small">Plus is a local reward tier. There is no real billing connection in this build, and nothing renews automatically.</p>
        <div class="plus-hero">
          <span class="plus-mark">${icon("crown")}</span>
          <div><span class="eyebrow">Nodum Plus</span><strong>${active ? "Plus is active on your profile." : "Stand out, earn faster, boost servers."}</strong><p>Colored PLUS tag, animated ring, 2x chat shards, a 10-shard daily check-in, two server boosts, and 20% off marketplace frames.</p></div>
          <span class="status-pill ${active ? "approved" : ""}">${icon(active ? "check" : "crown")} ${active ? "Active" : "1,000 R$"}</span>
        </div>
        <div class="plus-grid">
          ${[["sparkles", "PLUS tag and ring", "A colored PLUS tag and an animated ring on your avatar."], ["zap", "2x chat shards", "Every chat reward and streak bonus earns twice as much."], ["gift", "10-shard daily", "Daily check-in pays 10 shards instead of 5."], ["rocket", "2 server boosts", "Approval grants two boosts you can spend on any server you are in."], ["wand", "20% marketplace discount", "Paid decoration frames cost 20% fewer shards."]].map(([iconName, label, copy]) => `<div class="plus-feature"><span>${icon(iconName)}</span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></div>`).join("")}
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Robux gamepass order</strong><small>1,000 Robux. This local build cannot verify or charge Robux; a moderator approves the request by hand.</small></div>
          ${active ? `
            <div class="settings-card">
              <div class="settings-row"><div><strong>Plus status</strong><small>Active since ${user.plusSince ? formatShortDate(user.plusSince) : "today"} · approved locally.</small></div><span class="status-pill approved">${icon("check")} Active</span></div>
              <div class="settings-row"><div><strong>Boost credits</strong><small>${boosts} boost${boosts === 1 ? "" : "s"} ready to use.</small></div><span class="status-pill">${icon("rocket")} ${boosts}</span></div>
            </div>` : pendingOrder ? `
            <div class="staff-application-card plus-order-card">
              <div class="staff-app-head"><span class="staff-app-mark">${icon("info")}</span><div><strong>Request waiting for approval</strong><small>Reference: ${escapeHtml(pendingOrder.reference || "none")} · ${formatRelative(pendingOrder.submittedAt)}</small></div><span class="status-pill pending">pending</span></div>
              <p class="muted-small">A moderator can approve it from Plus orders. No Robux is charged by Nodum.</p>
              <div class="settings-actions"><button class="ghost-btn small" type="button" data-settings-action="cancel-plus-order" data-order-id="${escapeAttr(pendingOrder.id)}">${icon("x")} Cancel request</button></div>
            </div>` : `
            <div class="settings-card">
              <div class="settings-row"><div><strong>Nodum Plus · 1,000 Robux gamepass</strong><small>Create or buy a gamepass in Roblox, then send the reference here. Nodum only records the request.</small></div><button class="primary-btn small" type="button" data-settings-action="request-plus">${icon("crown")} Request Plus</button></div>
              <div class="settings-row"><div><strong>What happens next</strong><small>A moderator checks the reference, approves it, and your account gets Plus plus 2 server boosts.</small></div><span class="status-pill">manual</span></div>
            </div>`}
        </div>
        <div class="settings-block">
          <div class="settings-block-head"><strong>Your server boosts</strong><small>Spend boost credits on any server you belong to. They are cosmetic and permanent for that server.</small></div>
          <div class="settings-card">
            ${boostServers.length ? boostServers.map((server) => `<div class="settings-row"><div><strong>${escapeHtml(server.name)}</strong><small>${plural(server.boostCount || 0, "boost")} · ${server.ownerId === user.id ? "you own this server" : "member"}</small></div><button class="ghost-btn small" type="button" data-action="boost-server" data-server-id="${escapeAttr(server.id)}" ${boosts < 1 ? "disabled" : ""}>${icon("rocket")} Boost${boosts < 1 ? "" : ` (${boosts})`}</button></div>`).join("") : `<div class="settings-row"><div><strong>No servers yet</strong><small>Join or create a server to use a boost.</small></div></div>`}
          </div>
        </div>
        <div class="settings-card">
          ${settingSwitch("Show the PLUS tag on your profile", "A colored PLUS tag next to your name. Entirely cosmetic.", "plusBadge")}
          <div class="settings-row"><div><strong>Gift Plus to a friend</strong><small>Generate a local gift code you can hand to a real friend.</small></div><button class="ghost-btn small" type="button" data-settings-action="gift-plus">${icon("gift")} Generate code</button></div>
          <div class="settings-row"><div><strong>Purchases</strong><small>Approved local orders can be restored if Plus is ever removed from your profile.</small></div><button class="ghost-btn small" type="button" data-settings-action="restore-purchases">${icon("refresh")} Restore</button></div>
          ${canModerateGlobal() ? `<div class="settings-row"><div><strong>Review requests</strong><small>${pendingPlusOrders().length} Plus order${pendingPlusOrders().length === 1 ? "" : "s"} waiting for a moderator.</small></div><button class="ghost-btn small" type="button" data-settings-action="goto-plus-orders">${icon("gift")} Plus orders</button></div>` : ""}
        </div>
      </div>`;
  }
  return settingsPanelHtml("plus");
}

function startKeybindCapture(root, action, button) {
  if (keybindCapture) document.removeEventListener("keydown", keybindCapture, true);
  button.textContent = "Press keys…";
  button.classList.add("capturing");
  keybindCapture = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const combo = formatKeyCombo(event);
    if (!combo) return;
    prefs.keybinds[action] = combo;
    savePrefs();
    document.removeEventListener("keydown", keybindCapture, true);
    keybindCapture = null;
    toast(`Shortcut set to ${combo}.`);
    refreshSettingsPanel(root);
  };
  document.addEventListener("keydown", keybindCapture, true);
}

function formatKeyCombo(event) {
  if (["Control", "Shift", "Alt", "Meta"].includes(event.key)) return "";
  const parts = [];
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.metaKey) parts.push("Meta");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");
  let key = event.key;
  if (key === " ") key = "Space";
  if (key.length === 1) key = key.toUpperCase();
  parts.push(key);
  return parts.join("+");
}

function eventMatchesKeybind(event, combo) {
  if (!combo) return false;
  const parts = combo.split("+");
  const key = parts.pop();
  const needCtrl = parts.includes("Ctrl");
  const needMeta = parts.includes("Meta");
  const needAlt = parts.includes("Alt");
  const needShift = parts.includes("Shift");
  const eventKey = event.key.length === 1 ? event.key.toUpperCase() : event.key;
  return eventKey === key
    && event.ctrlKey === needCtrl
    && event.metaKey === needMeta
    && event.altKey === needAlt
    && event.shiftKey === needShift;
}

function bindSettingsPanel(root) {
  root.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      prefs.theme = button.dataset.themeChoice;
      savePrefs();
      applyPrefs();
      refreshSettingsPanel(root);
    });
  });
  root.querySelectorAll("[data-accent-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      prefs.accent = button.dataset.accentChoice;
      savePrefs();
      applyPrefs();
      refreshSettingsPanel(root);
    });
  });
  const voiceInput = root.querySelector("#voiceInputDevice");
  const voiceOutput = root.querySelector("#voiceOutputDevice");
  if (voiceInput) {
    voiceInput.addEventListener("change", () => {
      prefs.inputDeviceId = voiceInput.value;
      savePrefs();
      applyInputDevice();
    });
  }
  if (voiceOutput) {
    voiceOutput.addEventListener("change", () => {
      prefs.outputDeviceId = voiceOutput.value;
      savePrefs();
      applyOutputDevices();
      toast("Speaker updated.", "success");
    });
  }
  if (root.dataset.settingsCurrent === "voice") refreshVoiceDevices(root);
  root.querySelectorAll("[data-pref]").forEach((input) => {
    const path = input.dataset.pref;
    const update = async () => {
      let value = input.type === "checkbox" ? input.checked : input.value;
      if (input.type === "range") value = Number(value);
      if (path === "desktopNotifications" && value) {
        const allowed = await enableDesktopNotifications();
        if (!allowed) {
          input.checked = false;
          value = false;
        }
      }
      prefSet(path, value);
      if (path === "plusBadge") {
        me().showPlusBadge = Boolean(value);
        commitWorld({ render: false });
        renderApp();
      }
      savePrefs();
      applyPrefs();
      const output = root.querySelector(`[data-pref-out="${path}"]`);
      if (output) output.textContent = `${input.value}${output.dataset.prefSuffix || ""}`;
      if (path === "outputVolume") {
        document.querySelectorAll("audio[data-voice-peer]").forEach((audio) => { audio.volume = Number(value) / 100; });
      }
      if (path === "showTimestamps" || path === "messageGrouping" || path === "fontScale" || path === "emojiPicker" || path === "inlineMedia") renderApp();
      if (input.dataset.refresh === "true") refreshSettingsPanel(root);
      if (path === "notificationSounds" || path.startsWith("soundEvents.")) refreshSettingsPanel(root);
    };
    input.addEventListener("change", update);
    if (path.startsWith("customBackground.")) {
      input.addEventListener("input", () => {
        prefSet(path, input.value);
        savePrefs();
        applyPrefs();
        root.querySelectorAll(".skin-preset").forEach((preset) => preset.classList.remove("active"));
      });
    }
    if (input.type === "range") {
      input.addEventListener("input", () => {
        const output = root.querySelector(`[data-pref-out="${path}"]`);
        if (output) output.textContent = `${input.value}${output.dataset.prefSuffix || ""}`;
      });
    }
  });
  root.querySelectorAll("[data-settings-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.settingsAction;
      if (action === "reveal-email") {
        settingsDraft.revealEmail = !settingsDraft.revealEmail;
        refreshSettingsPanel(root);
        return;
      }
      if (action === "apply-skin-preset") {
        const preset = SKIN_PRESETS.find((entry) => entry.id === button.dataset.preset);
        if (!preset) return;
        prefs.customBackground = { ...preset.colors };
        savePrefs();
        applyPrefs();
        refreshSettingsPanel(root);
        return;
      }
      if (action === "reset-skin") {
        prefs.customBackground = { ...SKIN_DEFAULT };
        savePrefs();
        applyPrefs();
        refreshSettingsPanel(root);
        return;
      }
      if (action === "save-identity") {
        const name = String(root.querySelector("#settingsAccountName")?.value || "").trim().slice(0, 32);
        const handle = normalizeHandle(root.querySelector("#settingsAccountHandle")?.value).slice(0, 24);
        if (name.length < 2 || handle.length < 2) {
          toast("Use a display name and username with at least 2 characters.", "error");
          return;
        }
        const taken = Object.values(world.users).some((entry) => entry.id !== me().id && entry.handle?.toLowerCase() === handle);
        if (taken) {
          toast("That username is already taken.", "error");
          return;
        }
        me().name = name;
        me().handle = handle;
        commitWorld({ render: false });
        toast("Account updated.");
        refreshSettingsPanel(root);
        renderApp();
        return;
      }
      if (action === "change-password") {
        const current = String(root.querySelector("#settingsCurrentPassword")?.value || "");
        const next = String(root.querySelector("#settingsNewPassword")?.value || "");
        const account = currentAccount();
        if (!account) return;
        if (next.length < 6) {
          toast("Use a new password with at least 6 characters.", "error");
          return;
        }
        const currentHash = await hashPassword(current, account.salt);
        if (currentHash !== account.hash) {
          toast("That current password is not right.", "error");
          return;
        }
        const salt = randomSalt();
        account.salt = salt;
        account.hash = await hashPassword(next, salt);
        const auth = loadAuth();
        auth.accounts[account.id] = account;
        saveAuth(auth);
        toast("Password changed.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "test-mic") {
        await testMic();
        return;
      }
      if (action === "request-mic") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          stream.getTracks().forEach((track) => track.stop());
          await refreshVoiceDevices(root);
          toast("Microphone allowed. Device names are now visible.", "success");
        } catch {
          toast("Mic access was blocked. Allow it in your browser settings.", "error");
        }
        return;
      }
      if (action === "refresh-devices") {
        await refreshVoiceDevices(root);
        toast("Device list refreshed.", "success");
        return;
      }
      if (action === "add-passkey") {
        await registerPasskey();
        return;
      }
      if (action === "remove-passkey") {
        removePasskey(button.dataset.passkeyId);
        return;
      }
      if (action === "save-mail-endpoint") {
        const endpoint = String(root.querySelector("#mailEndpointInput")?.value || "").trim().replace(/\/+$/, "");
        if (endpoint && !/^https?:\/\/[^\s]+$/i.test(endpoint)) {
          toast("Use a full http:// or https:// address.", "error");
          return;
        }
        prefs.mailEndpoint = endpoint || "http://127.0.0.1:4319";
        savePrefs();
        toast("Email delivery endpoint saved.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "test-mail-relay") {
        const endpoint = String(root.querySelector("#mailEndpointInput")?.value || prefs.mailEndpoint || "").trim().replace(/\/+$/, "");
        const copy = root.querySelector("#mailRelayStatus");
        if (copy) copy.textContent = "Checking…";
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 5000);
        try {
          const response = await fetch(`${endpoint}/health`, { signal: controller.signal });
          const data = await response.json().catch(() => ({}));
          const configured = data.configured !== false;
          if (copy) copy.textContent = configured ? "Relay is running and SMTP is configured." : "Relay is running, but mail-config.json still needs SMTP details.";
          toast(configured ? "Mail relay is ready." : "Relay is up. Add SMTP details to mail-config.json.", configured ? "success" : "info", 5000);
        } catch {
          if (copy) copy.textContent = "No relay found at that address. Run node mail-relay.mjs in the Nodum folder.";
          toast("Couldn't reach the mail relay.", "error");
        } finally {
          window.clearTimeout(timer);
        }
        return;
      }
      if (action === "save-status") {
        me().customStatus = String(root.querySelector("#settingsStatus")?.value || "").trim().slice(0, 80);
        commitWorld({ render: false });
        toast("Status updated.");
        refreshSettingsPanel(root);
        renderApp();
        return;
      }
      if (action === "authorize-app") {
        const id = root.querySelector("#authorizedAppSelect")?.value;
        const app = AUTHORIZED_APP_CATALOG.find((item) => item.id === id);
        if (!app) return;
        prefs.authorizedApps = [...(prefs.authorizedApps || []), { id: app.id, name: app.name, by: app.by, addedAt: new Date().toISOString(), lastUsed: new Date().toISOString() }];
        savePrefs();
        toast(`${app.name} authorized.`);
        refreshSettingsPanel(root);
        return;
      }
      if (action === "remove-app") {
        prefs.authorizedApps = (prefs.authorizedApps || []).filter((app) => app.id !== button.dataset.appId);
        savePrefs();
        toast("Access removed.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "test-sound") {
        playTestSound(button.dataset.sound);
        return;
      }
      if (action === "test-notification") {
        sendTestNotification();
        return;
      }
      if (action === "mark-read") {
        markAllRead({ close: false, silent: false });
        refreshSettingsPanel(root);
        return;
      }
      if (action === "install-desktop") {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          const choice = await deferredInstallPrompt.userChoice.catch(() => null);
          deferredInstallPrompt = null;
          toast(choice?.outcome === "accepted" ? "Installing Nodum." : "Install dismissed.");
        } else {
          toast("Open your browser menu and choose Install Nodum or Add to Home Screen.", "info", 5000);
        }
        refreshSettingsPanel(root);
        return;
      }
      if (action === "open-window") {
        const popup = window.open(location.href, "nodum-window", "width=1280,height=820,noopener");
        if (!popup) toast("Your browser blocked the pop-up. Allow pop-ups for Nodum.", "error");
        return;
      }
      if (action === "add-trusted-site") {
        const site = window.prompt("Domain to trust (for example, example.com):", "");
        const clean = String(site || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        if (!clean) return;
        if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(clean)) {
          toast("Enter a valid domain.", "error");
          return;
        }
        prefs.trustedSites = [...new Set([...(prefs.trustedSites || []), clean])];
        savePrefs();
        toast(`${clean} trusted.`);
        refreshSettingsPanel(root);
        return;
      }
      if (action === "remove-trusted-site") {
        prefs.trustedSites = (prefs.trustedSites || []).filter((site) => site !== button.dataset.site);
        savePrefs();
        refreshSettingsPanel(root);
        return;
      }
      if (action === "staff-apply" || action === "goto-staff") {
        root.querySelector('[data-settings-tab="staff"]')?.click();
        return;
      }
      if (action === "submit-staff-app") {
        submitStaffApplication(root);
        return;
      }
      if (action === "withdraw-staff-app") {
        withdrawStaffApplication(root);
        return;
      }
      if (action === "accept-staff-app") {
        reviewStaffApplication(button.dataset.appId, "accepted", root);
        return;
      }
      if (action === "decline-staff-app") {
        reviewStaffApplication(button.dataset.appId, "declined", root);
        return;
      }
      if (action === "goto-staff-apps") {
        root.querySelector('[data-settings-tab="staff-apps"]')?.click();
        return;
      }
      if (action === "goto-plus-orders") {
        root.querySelector('[data-settings-tab="plus-orders"]')?.click();
        return;
      }
      if (action === "request-plus") {
        openPlusOrder();
        return;
      }
      if (action === "approve-plus-order") {
        reviewPlusOrder(button.dataset.orderId, "approved", root);
        return;
      }
      if (action === "decline-plus-order") {
        reviewPlusOrder(button.dataset.orderId, "declined", root);
        return;
      }
      if (action === "cancel-plus-order") {
        const order = (world.plusOrders || []).find((item) => item.id === button.dataset.orderId);
        if (order && order.userId === me().id && order.status === "pending") {
          order.status = "cancelled";
          order.note = "Cancelled by member.";
          order.reviewedAt = new Date().toISOString();
          commitWorld({ render: false });
          toast("Plus request cancelled.");
          refreshSettingsPanel(root);
        }
        return;
      }
      if (action === "create-dev-app") {
        const name = String(root.querySelector("#devAppName")?.value || "").trim().slice(0, 32);
        if (name.length < 2) {
          toast("Give your app a name first.", "error");
          return;
        }
        const app = {
          id: uid("app"),
          name,
          clientId: `nodum_${randomToken(18)}`,
          secret: randomToken(32),
          createdAt: new Date().toISOString()
        };
        prefs.devApps = [app, ...(prefs.devApps || [])];
        settingsDraft.revealSecret = app.id;
        savePrefs();
        toast("App created. Copy the secret now.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "reveal-secret") {
        settingsDraft.revealSecret = settingsDraft.revealSecret === button.dataset.appId ? null : button.dataset.appId;
        refreshSettingsPanel(root);
        return;
      }
      if (action === "rotate-secret") {
        const app = (prefs.devApps || []).find((item) => item.id === button.dataset.appId);
        if (!app) return;
        app.secret = randomToken(32);
        settingsDraft.revealSecret = app.id;
        savePrefs();
        toast("Secret rotated. The old one stops working.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "delete-dev-app") {
        prefs.devApps = (prefs.devApps || []).filter((item) => item.id !== button.dataset.appId);
        savePrefs();
        toast("App deleted.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "copy-text") {
        copyText(button.dataset.copy);
        return;
      }
      if (action === "copy-starter") {
        copyText(`// Nodum local starter\nconst profile = await fetch("local://nodum/api/v1/users/@me", {\n  headers: { Authorization: "Bearer <token>" }\n}).then((response) => response.json());\nconsole.log(profile);`);
        return;
      }
      if (action === "goto-plus") {
        root.querySelector('[data-settings-tab="plus"]')?.click();
        return;
      }
      if (action === "goto-creators") {
        root.querySelector('[data-settings-tab="creators"]')?.click();
        return;
      }
      if (action === "restore-purchases") {
        const approved = (world.plusOrders || []).filter((order) => order.userId === me().id && order.status === "approved");
        if (!approved.length) {
          toast("No approved local purchases to restore.", "info");
          return;
        }
        if (me().plus) {
          toast("Plus is already active on this profile.", "info");
          return;
        }
        activatePlus(me().id);
        commitWorld({ render: false });
        renderApp();
        toast("Plus restored from your approved local order.", "success");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "creator-apply") {
        const channel = String(root.querySelector("#creatorChannel")?.value || "").trim();
        const followers = Number(root.querySelector("#creatorFollowers")?.value || 0);
        if (!/^https?:\/\/.+\..+/.test(channel)) {
          toast("Paste a full channel URL.", "error");
          return;
        }
        if (followers < 1000) {
          toast("The program needs 1,000+ followers or subscribers.", "error");
          return;
        }
        prefs.creatorApplication = { channel, followers, submittedAt: new Date().toISOString(), status: "pending" };
        savePrefs();
        toast("Creator application submitted.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "creator-withdraw") {
        prefs.creatorApplication = null;
        savePrefs();
        toast("Application withdrawn.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "leaderboard-tab") {
        settingsDraft.leaderboardTab = button.dataset.tab || "messages";
        refreshSettingsPanel(root);
        return;
      }
      if (action === "claim-shard") {
        const amount = claimDailyShard();
        if (amount) {
          toast(`+${amount} shards claimed.`);
          refreshSettingsPanel(root);
        }
        return;
      }
      if (action === "gift-shard") {
        if (myShards() < 5) {
          toast("You need at least 5 shards to gift.", "error");
          return;
        }
        addShards(-5, "Gift code generated");
        copyText(`nodum-gift-${randomToken(10)}`);
        toast("5 shards gifted. Code copied.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "gift-plus") {
        copyText(`NODUM-PLUS-${randomToken(4).toUpperCase()}-${randomToken(4).toUpperCase()}`);
        toast("Plus gift code copied.");
        return;
      }
      if (action === "reset-keybinds") {
        prefs.keybinds = defaultPrefs().keybinds;
        savePrefs();
        toast("Keybinds reset.");
        refreshSettingsPanel(root);
        return;
      }
      if (action === "change-keybind") {
        startKeybindCapture(root, button.dataset.keybind, button);
      }
    });
  });
}

function openAppearance() {
  openSettings("appearance");
}

/* ---------- Server creation ---------- */

let createServerIconImage = "";

function openCreateServer() {
  createServerIconImage = "";
  const body = `
    <div class="create-community">
      <div class="create-community-head">
        <div>
          <h2>Create a community</h2>
          <p>Set the tone now. You can change everything later.</p>
        </div>
        <button class="icon-btn modal-close" type="button" data-close aria-label="Close">${icon("x")}</button>
      </div>
      <div class="create-community-body">
        <div class="community-icon-row">
          <div class="community-icon" id="createServerIconPreview"><span>🪩</span><img alt="" hidden></div>
          <div class="community-icon-copy">
            <strong>Community icon</strong>
            <small>Type an emoji or upload a square image.</small>
            <div class="inline-actions">
              <button class="ghost-btn small" type="button" data-create-icon>${icon("upload")} Upload</button>
              <button class="ghost-btn small" type="button" data-clear-icon hidden>${icon("x")} Remove</button>
            </div>
          </div>
          <label class="community-emoji-field"><span>Emoji</span><input id="newServerEmoji" maxlength="4" value="🪩" aria-label="Community emoji"></label>
          <input type="file" id="createServerIconFile" accept="image/*" hidden>
        </div>

        <div class="field-row">
          <label class="field"><span>Name</span><input id="newServerName" maxlength="40" placeholder="My cozy corner"></label>
          <label class="field"><span>Address</span><div class="address-field"><span>nodum.app/</span><input id="newServerAddress" maxlength="30" placeholder="cozy-corner"></div></label>
        </div>

        <label class="field"><span>Description</span><textarea id="newServerTagline" maxlength="500" rows="3" placeholder="A cozy all-purpose hangout with announcements, chat, and voice."></textarea><span class="field-counter" id="createServerDescCount">0/500</span></label>

        <label class="field"><span>Topics</span><input id="newServerTopics" maxlength="120" placeholder="design, music, gaming"><small class="field-hint">Separate topics with commas. Up to five.</small></label>

        <div class="field"><span>Visibility</span>
          <div class="visibility-options">
            <label class="visibility-option active"><input type="radio" name="newServerVisibility" value="public" checked><span class="visibility-mark">${icon("globe")}</span><span><strong>Public</strong><small>Anyone can find, preview and join.</small></span></label>
            <label class="visibility-option"><input type="radio" name="newServerVisibility" value="private"><span class="visibility-mark">${icon("lock")}</span><span><strong>Private</strong><small>Only people with an invite can join.</small></span></label>
          </div>
        </div>
      </div>
      <div class="create-community-foot">
        <span class="foot-tip">${icon("globe")} Free forever · boosts optional</span>
        <div class="editor-foot-actions"><button class="ghost-btn" type="button" data-close>Cancel</button><button class="primary-btn" type="button" data-action="create-server-submit">Create community</button></div>
      </div>
    </div>`;
  openRawModal(body, {
    className: "create-server-modal create-community-modal",
    onMount: (root) => {
      const name = root.querySelector("#newServerName");
      const address = root.querySelector("#newServerAddress");
      const description = root.querySelector("#newServerTagline");
      const counter = root.querySelector("#createServerDescCount");
      const preview = root.querySelector("#createServerIconPreview");
      const emojiInput = root.querySelector("#newServerEmoji");
      const fileInput = root.querySelector("#createServerIconFile");
      const clearButton = root.querySelector("[data-clear-icon]");
      let addressTouched = false;

      const paintIcon = () => {
        const span = preview?.querySelector("span");
        const image = preview?.querySelector("img");
        if (!span || !image) return;
        if (createServerIconImage) {
          span.hidden = true;
          image.src = createServerIconImage;
          image.hidden = false;
        } else {
          image.hidden = true;
          image.removeAttribute("src");
          span.hidden = false;
          span.textContent = emojiInput?.value || "🪩";
        }
        if (clearButton) clearButton.hidden = !createServerIconImage;
      };
      const syncAddress = () => {
        if (addressTouched || !address) return;
        const slug = slugify(name?.value || "");
        address.value = slug === "new-channel" ? "" : slug;
      };
      name?.addEventListener("input", syncAddress);
      address?.addEventListener("input", () => { addressTouched = Boolean(address.value); });
      emojiInput?.addEventListener("input", () => { createServerIconImage = ""; paintIcon(); });
      description?.addEventListener("input", () => {
        if (counter) counter.textContent = `${description.value.length}/500`;
      });
      root.querySelector("[data-create-icon]")?.addEventListener("click", () => fileInput?.click());
      clearButton?.addEventListener("click", () => { createServerIconImage = ""; paintIcon(); });
      fileInput?.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        fileInput.value = "";
        if (!file) return;
        if (!file.type.startsWith("image/")) {
          toast("That file is not an image.", "error");
          return;
        }
        if (file.size > 8 * 1024 * 1024) {
          toast("That image is too large. Pick something under 8 MB.", "error");
          return;
        }
        readImageFile(file).then((image) => {
          openImageCropper({
            image,
            aspect: 1,
            outputWidth: 512,
            shape: "square",
            title: "Crop the community logo",
            subtitle: "Square images work best. Drag and zoom to center the logo.",
            applyLabel: "Use logo",
            onApply: (dataUrl) => {
              createServerIconImage = dataUrl;
              paintIcon();
            }
          });
        }).catch(() => toast("Could not read that image.", "error"));
      });
      root.querySelectorAll('input[name="newServerVisibility"]').forEach((input) => {
        input.addEventListener("change", () => {
          root.querySelectorAll(".visibility-option").forEach((option) => option.classList.toggle("active", option.contains(input) && input.checked));
        });
      });
      paintIcon();
      syncAddress();
      window.setTimeout(() => name?.focus(), 80);
    }
  });
}

function createServerFromForm() {
  const root = activeModal;
  if (!root) return;
  const name = root.querySelector("#newServerName").value.trim();
  if (!name) {
    toast("Give your community a name.", "error");
    return;
  }
  const addressRaw = String(root.querySelector("#newServerAddress")?.value || "").trim();
  const template = SERVER_TEMPLATE;
  const emoji = root.querySelector("#newServerEmoji").value || template.icon;
  const description = (root.querySelector("#newServerTagline").value.trim() || template.blurb).slice(0, 500);
  const topics = String(root.querySelector("#newServerTopics")?.value || "")
    .split(",")
    .map((topic) => topic.trim().replace(/^#/, ""))
    .filter(Boolean)
    .slice(0, 5);
  const visibility = root.querySelector('input[name="newServerVisibility"]:checked')?.value || "public";
  const serverId = slugify(addressRaw || name) || uid("server");
  const unique = world.servers.some((server) => server.id === serverId) ? `${serverId}-${uid("s").slice(-4)}` : serverId;
  const categories = template.categories.map((category, categoryIndex) => ({
    id: uid("cat"),
    name: category.name,
    channels: category.channels.map((channel, channelIndex) => ({
      id: `${unique}-${slugify(channel.name)}-${categoryIndex}${channelIndex}`,
      name: channel.name,
      type: channel.type,
      topic: channel.topic || "",
      readOnly: Boolean(channel.readOnly),
      userLimit: channel.userLimit || 10
    }))
  }));
  const roles = baseRoles();
  const server = {
    id: unique, name: name.slice(0, 40),
    icon: createServerIconImage ? { type: "image", value: createServerIconImage } : { type: "emoji", value: emoji },
    tone: randomItem(TONE_KEYS), tagline: description, topics,
    private: visibility === "private", visibility,
    banner: { type: "preset", value: template.banner }, bannerEffect: "shimmer",
    ownerId: me().id, boostCount: 0, inviteCode: `${unique}-${Math.random().toString(36).slice(2, 6)}`,
    memberIds: [me().id], roles,
    members: { [me().id]: { roleIds: ["role-owner"] } },
    categories, createdAt: new Date().toISOString()
  };
  createServerIconImage = "";
  world.servers.push(server);
  ui.view = "server";
  ui.activeServer = unique;
  ui.activeChannels[unique] = categories[0]?.channels[0]?.id || null;
  categories.flatMap((category) => category.channels).forEach((channel) => {
    if (channel.type === "text") world.messages[channel.id] = [];
    markRead(channel.id);
  });
  commitWorld({ render: false });
  closeModal();
  renderApp({ scroll: true });
  toast(`${server.name} is live. Invite someone.`, "success");
}

/* ---------- Server settings ---------- */

function openServerSettings(serverId, tab = "overview") {
  const server = getServer(serverId);
  if (!server) return;
  if (!isMember(server, me().id) && server.ownerId !== me().id) {
    toast("Join that server first.", "error");
    return;
  }
  settingsDraft = { serverId: server.id, tab };
  const body = serverSettingsBody(server, tab);
  openRawModal(body, {
    className: "server-settings-modal",
    onMount: (root) => bindServerSettings(root)
  });
}

function serverSettingsBody(server, tab) {
  const canManage = memberHasPerm(server, me().id, "manageCommunity") || server.ownerId === me().id;
  const canChannels = memberHasPerm(server, me().id, "manageChannels") || server.ownerId === me().id;
  const canRoles = memberHasPerm(server, me().id, "manageRoles") || server.ownerId === me().id;
  return `
    <div class="server-settings-shell">
      <div class="server-settings-hero ${bannerClass(server.banner)}" data-banner-effect="shimmer" style="${bannerStyle(server.banner)}">
        <div class="server-settings-shade"></div>
        <div class="server-settings-id">${serverIconHtml(server, "server-emoji")}<div><h2>${escapeHtml(server.name)}</h2><p>${escapeHtml(server.tagline || "")}</p></div></div>
        <button class="profile-close" type="button" data-close>${icon("x")}</button>
      </div>
      <div class="settings-tabbar">
        <button class="${tab === "overview" ? "active" : ""}" type="button" data-server-tab="overview">Overview</button>
        <button class="${tab === "roles" ? "active" : ""}" type="button" data-server-tab="roles">Roles</button>
        <button class="${tab === "channels" ? "active" : ""}" type="button" data-server-tab="channels">Channels</button>
        <button class="${tab === "members" ? "active" : ""}" type="button" data-server-tab="members">Members</button>
        <button class="${tab === "invites" ? "active" : ""}" type="button" data-server-tab="invites">Invites</button>
      </div>
      <div class="server-settings-content" id="serverSettingsContent">${serverSettingsPanel(server, tab, { canManage, canChannels, canRoles })}</div>
    </div>`;
}

function serverSettingsPanel(server, tab, perms = {}) {
  const { canManage = false, canChannels = false, canRoles = false } = perms;
  if (tab === "roles") {
    return `
      <div class="settings-panel">
        <div class="panel-title-row"><div><h3>Roles</h3><p class="muted-small">Roles give members color, badges, and power.</p></div>${canRoles ? `<button class="primary-btn small" type="button" data-action="create-role">${icon("plus")} New role</button>` : ""}</div>
        <div class="role-list">
          ${[...server.roles].sort((a, b) => (b.position || 0) - (a.position || 0)).map((role) => `
            <div class="role-row">
              <span class="role-swatch" style="background:${escapeAttr(role.color)}"></span>
              <div class="role-row-copy"><strong style="color:${escapeAttr(role.color)}"><span class="role-row-name">${roleIconHtml(role, 14)}${escapeHtml(role.name)}</span></strong><small>${plural((role.permissions || []).length, "permission")}${role.hoist ? " · shown separately" : ""}${role.badgeId ? ` · ${escapeHtml(BADGES[role.badgeId]?.label || role.badgeId)}` : ""}</small></div>
              <div class="role-row-badges">${roleBadgeHtml(role)}</div>
              ${canRoles ? `<div class="row-actions"><button class="icon-btn small" type="button" data-action="edit-role" data-role-id="${escapeAttr(role.id)}" title="Edit role">${icon("edit")}</button>${role.id !== "role-owner" ? `<button class="icon-btn small danger" type="button" data-action="delete-role" data-role-id="${escapeAttr(role.id)}" title="Delete role">${icon("trash")}</button>` : ""}</div>` : ""}
            </div>`).join("")}
        </div>
      </div>`;
  }
  if (tab === "channels") {
    return `
      <div class="settings-panel">
        <div class="panel-title-row"><div><h3>Channels</h3><p class="muted-small">Text, voice, and everything between.</p></div>${canChannels ? `<button class="primary-btn small" type="button" data-action="create-channel">${icon("plus")} New channel</button>` : ""}</div>
        ${server.categories.map((category) => `
          <div class="channel-admin-group">
            <div class="channel-admin-head"><span>${escapeHtml(category.name)}</span>${canChannels ? `<button class="ghost-btn tiny" type="button" data-action="create-channel" data-category-id="${escapeAttr(category.id)}">${icon("plus")} Channel</button>` : ""}</div>
            ${category.channels.map((channel) => `
              <div class="channel-admin-row">
                <span class="channel-admin-icon">${icon(channel.type === "voice" ? "volume" : "hash")}</span>
                <div class="channel-admin-copy"><strong>${escapeHtml(channel.name)}</strong><small>${escapeHtml(channel.topic || (channel.type === "voice" ? "voice channel" : "text channel"))}</small></div>
                ${channel.readOnly ? `<span class="status-pill">read-only</span>` : ""}
                ${canChannels ? `<div class="row-actions"><button class="icon-btn small" type="button" data-action="edit-channel" data-channel-id="${escapeAttr(channel.id)}" title="Edit">${icon("edit")}</button><button class="icon-btn small danger" type="button" data-action="delete-channel" data-channel-id="${escapeAttr(channel.id)}" title="Delete">${icon("trash")}</button></div>` : ""}
              </div>`).join("")}
          </div>`).join("")}
      </div>`;
  }
  if (tab === "members") {
    const members = server.memberIds.map(getUser).sort((a, b) => (getTopRole(server, b.id)?.position || 0) - (getTopRole(server, a.id)?.position || 0));
    return `
      <div class="settings-panel">
        <div class="panel-title-row"><div><h3>Members — ${members.length}</h3><p class="muted-small">Assign roles without losing your mind.</p></div></div>
        <div class="member-admin-list">
          ${members.map((user) => `
            <div class="member-admin-row">
              ${avatarWrap(user, "avatar-32")}
              <div class="member-admin-copy"><strong style="color:${escapeAttr(getTopRole(server, user.id)?.color || "var(--text)")}">${roleCustomIconHtml(getTopRole(server, user.id), 13)}${escapeHtml(user.name)}</strong><small>@${escapeHtml(user.handle)} · ${getMemberRoles(server, user.id).map((role) => role.name).join(", ") || "Member"}</small></div>
              ${canRoles ? `<button class="ghost-btn small" type="button" data-action="manage-member-roles" data-user-id="${escapeAttr(user.id)}">${icon("key")} Roles</button>` : ""}
            </div>`).join("")}
        </div>
      </div>`;
  }
  if (tab === "invites") {
    return `
      <div class="settings-panel">
        <h3>Invites</h3>
        <p class="muted-small">This is a local-first demo. Invite codes let friends join on the same browser profile, or you can share the app and rebuild the world together.</p>
        <div class="invite-card">
          <span class="invite-code">${escapeHtml(server.inviteCode || "nodum-hq")}</span>
          <button class="primary-btn small" type="button" data-action="copy-invite" data-server-id="${escapeAttr(server.id)}">${icon("copy")} Copy invite</button>
        </div>
        <div class="settings-card" style="margin-top:14px">
          <div class="settings-row"><div><strong>Server ID</strong><small>${escapeHtml(server.id)}</small></div></div>
          <div class="settings-row"><div><strong>Created</strong><small>${server.createdAt ? formatShortDate(server.createdAt) : "a while ago"}</small></div></div>
          <div class="settings-row"><div><strong>Boosts</strong><small>Cosmetic. Boosts come from Plus members and stay on the server. ${server.boostCount || 0} for the vibe.</small></div><span class="status-pill approved">${server.boostCount || 0}</span></div>
        </div>
        <div class="settings-actions">
          <button class="ghost-btn" type="button" data-action="discover">${icon("compass")} Discover communities</button>
          ${server.ownerId === me().id
            ? `<button class="danger-btn" type="button" data-action="delete-server">${icon("trash")} Delete server</button>`
            : `<button class="danger-btn" type="button" data-action="leave-server">${icon("logOut")} Leave server</button>`}
        </div>
      </div>`;
  }
  return `
    <div class="settings-panel">
      <h3>Overview</h3>
      <p class="muted-small">Change the name, icon, banner, and vibe. Everything is free.</p>
      <div class="boost-card">
        <span class="boost-mark">${icon("rocket")}</span>
        <div><strong>${plural(server.boostCount || 0, "boost")} on this server</strong><small>${myBoostCredits()} boost credit${myBoostCredits() === 1 ? "" : "s"} available${me().plus ? " · Plus member" : " · Plus grants 2"}</small></div>
        <button class="primary-btn small" type="button" data-action="boost-server" data-server-id="${escapeAttr(server.id)}" ${myBoostCredits() < 1 ? "disabled" : ""}>${icon("rocket")} Boost</button>
      </div>
      ${canManage ? `
        <div class="form-stack">
          <div class="field-row">
            <label class="field"><span>Server name</span><input id="srvName" maxlength="40" value="${escapeAttr(server.name)}"></label>
            <label class="field"><span>Icon</span><input id="srvEmoji" maxlength="4" value="${escapeAttr(server.icon?.type === "image" ? "🪩" : server.icon?.value || "🪩")}"></label>
          </div>
          <label class="field"><span>Tagline</span><input id="srvTagline" maxlength="80" value="${escapeAttr(server.tagline || "")}"></label>
          <div class="field"><span>Banner</span><div class="banner-choice-grid">
            ${BANNER_PRESETS.map((preset) => `<label class="banner-choice ${server.banner?.type !== "image" && server.banner?.value === preset.id ? "active" : ""}" style="--banner-a:${preset.a};--banner-b:${preset.b};--banner-c:${preset.c}"><input type="radio" name="srvBanner" value="${escapeAttr(preset.id)}" ${server.banner?.type !== "image" && server.banner?.value === preset.id ? "checked" : ""}><span>${escapeHtml(preset.label)}</span></label>`).join("")}
          </div></div>
          <div class="settings-actions"><button class="primary-btn" type="button" data-action="save-server">${icon("check")} Save changes</button><button class="ghost-btn" type="button" data-action="upload-server-banner">${icon("image")} Upload banner</button><button class="ghost-btn" type="button" data-action="upload-server-icon">${icon("upload")} Upload icon</button></div>
        </div>` : `<div class="empty-yap small"><h3>You don't manage this server</h3><p>You can still browse channels and hang out.</p></div>`}
    </div>`;
}

function bindServerSettings(root) {
  root.querySelectorAll("[data-server-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!settingsDraft) return;
      settingsDraft.tab = button.dataset.serverTab;
      const server = getServer(settingsDraft.serverId);
      root.querySelectorAll("[data-server-tab]").forEach((item) => item.classList.toggle("active", item === button));
      const content = root.querySelector("#serverSettingsContent");
      const canManage = memberHasPerm(server, me().id, "manageCommunity") || server.ownerId === me().id;
      const canChannels = memberHasPerm(server, me().id, "manageChannels") || server.ownerId === me().id;
      const canRoles = memberHasPerm(server, me().id, "manageRoles") || server.ownerId === me().id;
      if (content) content.innerHTML = serverSettingsPanel(server, settingsDraft.tab, { canManage, canChannels, canRoles });
      hydrateIcons(root);
    });
  });
}

function saveServerSettings() {
  if (!settingsDraft) return;
  const server = getServer(settingsDraft.serverId);
  const root = activeModal;
  if (!server || !root) return;
  server.name = root.querySelector("#srvName")?.value.trim().slice(0, 40) || server.name;
  const emoji = root.querySelector("#srvEmoji")?.value;
  if (emoji) server.icon = { type: "emoji", value: emoji };
  server.tagline = root.querySelector("#srvTagline")?.value.trim().slice(0, 80) || "";
  const banner = root.querySelector('input[name="srvBanner"]:checked')?.value;
  if (banner) server.banner = { type: "preset", value: banner };
  commitWorld({ render: false });
  closeModal();
  renderApp();
  toast("Server updated.", "success");
}

function openRoleEditor(serverId, roleId = null) {
  const server = getServer(serverId);
  if (!server) return;
  const role = roleId ? server.roles.find((item) => item.id === roleId) : null;
  const draft = role || {
    id: uid("role"), name: "", color: "#8ab4ff", badgeId: "", badgeIcon: "star", iconEmoji: "", iconImage: "", hoist: false, position: 55,
    permissions: ["viewChannels", "createInvite", "sendMessages", "readHistory", "attachFiles", "addReactions", "useCommands", "createForumPosts", "connect", "speak"]
  };
  const body = `
    <div class="form-stack role-editor">
      <div class="field-row">
        <label class="field"><span>Role name</span><input id="roleName" maxlength="32" value="${escapeAttr(draft.name)}" placeholder="Event Crew"></label>
        <div class="field role-color-field"><span>Color</span>
          <div class="role-color-picker">
            <div class="role-color-swatches">
              ${ROLE_COLORS.map((color) => `<button class="role-color-swatch ${draft.color.toLowerCase() === color ? "is-active" : ""}" type="button" data-role-color="${color}" style="--swatch:${color}" aria-label="Use ${color}"></button>`).join("")}
            </div>
            <div class="role-color-custom">
              <input id="roleColorHex" maxlength="7" value="${escapeAttr(draft.color)}" spellcheck="false" aria-label="Role color hex">
              <button class="ghost-btn small" type="button" data-apply-role-color>Apply</button>
            </div>
            <small class="field-hint">Members use the colour of their highest coloured role on their name.</small>
          </div>
          <input id="roleColor" type="hidden" value="${escapeAttr(draft.color)}">
        </div>
      </div>
      <div class="field role-icon-field">
        <span>Role icon</span>
        <div class="role-icon-editor" id="roleIconEditor">
          <div class="role-icon-preview" id="roleIconPreview" aria-live="polite"></div>
          <div class="role-icon-controls">
            <div class="role-icon-tabs" role="tablist" aria-label="Role icon type">
              <button class="role-icon-tab ${draft.iconImage ? "" : "is-active"}" type="button" role="tab" aria-selected="${draft.iconImage ? "false" : "true"}" data-role-icon-tab="emoji">Emoji</button>
              <button class="role-icon-tab ${draft.iconImage ? "is-active" : ""}" type="button" role="tab" aria-selected="${draft.iconImage ? "true" : "false"}" data-role-icon-tab="image">Image</button>
            </div>
            <div class="role-icon-pane" data-role-icon-pane="emoji" ${draft.iconImage ? "hidden" : ""}>
              <div class="role-icon-emoji-row">
                <input id="roleIconEmoji" maxlength="16" value="${escapeAttr(draft.iconEmoji || "")}" placeholder="Type or paste an emoji" spellcheck="false" aria-label="Role icon emoji">
                <button class="ghost-btn small" type="button" data-clear-role-icon>Remove</button>
              </div>
              <div class="role-icon-emoji-grid">
                ${ROLE_ICON_EMOJIS.map((emoji) => `<button class="role-icon-emoji-choice ${draft.iconEmoji === emoji ? "is-active" : ""}" type="button" data-role-emoji="${escapeAttr(emoji)}" aria-label="Use ${escapeAttr(emoji)}">${emoji}</button>`).join("")}
              </div>
            </div>
            <div class="role-icon-pane" data-role-icon-pane="image" ${draft.iconImage ? "" : "hidden"}>
              <div class="role-icon-upload-row">
                <input type="file" id="roleIconFile" accept="image/png,image/jpeg,image/gif,image/webp" hidden>
                <button class="ghost-btn small" type="button" data-upload-role-icon>${icon("upload")} Upload image</button>
                <button class="ghost-btn small" type="button" data-clear-role-icon>Remove</button>
              </div>
              <small class="field-hint">PNG, JPG, GIF or WebP. Square images look best, 64×64 or larger. Animated GIFs stay animated up to 256 KB.</small>
            </div>
          </div>
        </div>
        <input id="roleIconImage" type="hidden" value="${escapeAttr(draft.iconImage || "")}">
        <input id="roleBadgeIcon" type="hidden" value="${escapeAttr(draft.badgeIcon || "")}">
      </div>
      <div class="field-row">
        <label class="field"><span>Linked badge</span><select id="roleBadgeId"><option value="">None</option>${BADGE_ORDER.map((id) => `<option value="${id}" ${draft.badgeId === id ? "selected" : ""}>${escapeHtml(BADGES[id].label)}</option>`).join("")}</select></label>
      </div>
      <label class="switch-row"><span><strong>Show separately</strong><small>Display this role as its own group in the member list.</small></span><input id="roleHoist" type="checkbox" ${draft.hoist ? "checked" : ""}><span class="switch"></span></label>
      <div class="field"><span>Permissions</span>
        <div class="permission-groups">
          ${PERMISSION_GROUPS.map((group) => {
            const perms = PERMISSIONS.filter((perm) => perm.group === group.id);
            const active = perms.filter((perm) => (draft.permissions || []).includes(perm.id)).length;
            return `<section class="permission-group" data-perm-group="${escapeAttr(group.id)}">
              <div class="permission-group-head">
                <div><strong>${escapeHtml(group.label)}</strong><small>${escapeHtml(group.blurb)}</small></div>
                <span class="permission-count">${active}/${perms.length}</span>
              </div>
              <div class="permission-grid">
                ${perms.map((perm) => `<label class="check-row${perm.id === "administrator" ? " perm-admin" : ""}"><input type="checkbox" value="${escapeAttr(perm.id)}" data-role-perm ${(draft.permissions || []).includes(perm.id) ? "checked" : ""}><span>${escapeHtml(perm.label)}</span><small>${escapeHtml(perm.hint)}</small></label>`).join("")}
              </div>
            </section>`;
          }).join("")}
        </div>
      </div>
      <div class="role-preview" id="rolePreview">
        <span class="role-chip" style="--role-color:${escapeAttr(draft.color)}">${roleIconHtml(draft, 10)}${escapeHtml(draft.name || "New role")}</span>
        ${draft.badgeId ? badgeIconHtml(draft.badgeId, 18) : ""}
      </div>
      <div class="confirm-actions">
        <button class="ghost-btn" type="button" data-close>Cancel</button>
        <button class="primary-btn" type="button" data-action="save-role" data-server-id="${escapeAttr(server.id)}" data-role-id="${escapeAttr(role ? role.id : "")}">${icon("check")} ${role ? "Save role" : "Create role"}</button>
      </div>
    </div>`;
  openRawModal(body, {
    className: "role-editor-modal",
    onMount: (root) => {
      const update = () => {
        const name = root.querySelector("#roleName").value || "New role";
        const color = root.querySelector("#roleColor").value;
        const badgeIcon = root.querySelector("#roleBadgeIcon").value;
        const badgeId = root.querySelector("#roleBadgeId").value;
        const iconEmoji = root.querySelector("#roleIconEmoji").value.trim();
        const iconImage = root.querySelector("#roleIconImage").value;
        const previewRole = { color, badgeIcon, iconEmoji, iconImage };
        root.querySelector("#rolePreview").innerHTML = `<span class="role-chip" style="--role-color:${color}">${roleIconHtml(previewRole, 10)}${escapeHtml(name)}</span>${badgeId ? badgeIconHtml(badgeId, 18) : ""}`;
        const iconPreview = root.querySelector("#roleIconPreview");
        if (iconPreview) {
          iconPreview.innerHTML = roleIconHtml(previewRole, 34) || `<span class="role-icon-placeholder">${icon("image")}</span>`;
          iconPreview.classList.toggle("is-empty", !previewRole.iconEmoji && !previewRole.iconImage && !previewRole.badgeIcon);
        }
      };
      const colorInput = root.querySelector("#roleColor");
      const hexInput = root.querySelector("#roleColorHex");
      const swatches = [...root.querySelectorAll("[data-role-color]")];
      const setColor = (value, { syncHex = true } = {}) => {
        const color = /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : colorInput.value;
        colorInput.value = color;
        if (syncHex) hexInput.value = color;
        swatches.forEach((swatch) => swatch.classList.toggle("is-active", swatch.dataset.roleColor.toLowerCase() === color));
        update();
      };
      swatches.forEach((swatch) => swatch.addEventListener("click", () => setColor(swatch.dataset.roleColor)));
      root.querySelector("[data-apply-role-color]")?.addEventListener("click", () => {
        const raw = hexInput.value.trim();
        const value = raw.startsWith("#") ? raw : `#${raw}`;
        if (!/^#[0-9a-f]{6}$/i.test(value)) {
          toast("Use a hex color like #8b9cf7.", "error");
          return;
        }
        setColor(value);
      });
      hexInput?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        root.querySelector("[data-apply-role-color]")?.click();
      });
      hexInput?.addEventListener("input", () => {
        const value = hexInput.value.trim();
        if (/^#[0-9a-f]{6}$/i.test(value)) setColor(value, { syncHex: false });
      });

      /* Role icon: emoji or uploaded image, one at a time. */
      const emojiInput = root.querySelector("#roleIconEmoji");
      const imageInput = root.querySelector("#roleIconImage");
      const fileInput = root.querySelector("#roleIconFile");
      const setIconTab = (tab) => {
        root.querySelectorAll("[data-role-icon-tab]").forEach((button) => {
          const active = button.dataset.roleIconTab === tab;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", String(active));
        });
        root.querySelectorAll("[data-role-icon-pane]").forEach((pane) => {
          pane.hidden = pane.dataset.roleIconPane !== tab;
        });
      };
      const paintEmojiChoices = (value) => {
        root.querySelectorAll("[data-role-emoji]").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.roleEmoji === value);
        });
      };
      root.querySelectorAll("[data-role-icon-tab]").forEach((button) => {
        button.addEventListener("click", () => setIconTab(button.dataset.roleIconTab));
      });
      emojiInput?.addEventListener("input", () => {
        const value = emojiInput.value.trim().slice(0, 16);
        if (value) imageInput.value = "";
        paintEmojiChoices(value);
        update();
      });
      root.querySelectorAll("[data-role-emoji]").forEach((button) => {
        button.addEventListener("click", () => {
          emojiInput.value = button.dataset.roleEmoji;
          imageInput.value = "";
          paintEmojiChoices(button.dataset.roleEmoji);
          setIconTab("emoji");
          update();
        });
      });
      root.querySelectorAll("[data-clear-role-icon]").forEach((button) => {
        button.addEventListener("click", () => {
          emojiInput.value = "";
          imageInput.value = "";
          root.querySelector("#roleBadgeIcon").value = "";
          paintEmojiChoices("");
          update();
        });
      });
      root.querySelector("[data-upload-role-icon]")?.addEventListener("click", () => fileInput?.click());
      fileInput?.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        const applyImage = (data) => {
          imageInput.value = data;
          emojiInput.value = "";
          paintEmojiChoices("");
          setIconTab("image");
          update();
        };
        if (file.type === "image/gif") {
          /* Keep GIFs animated instead of flattening them through a canvas. */
          if (file.size > 256 * 1024) {
            toast("Keep GIF role icons under 256 KB.", "error");
            return;
          }
          const reader = new FileReader();
          reader.onerror = () => toast("Could not read that image.", "error");
          reader.onload = () => applyImage(String(reader.result || ""));
          reader.readAsDataURL(file);
          return;
        }
        autoFitDecorationImage(file, 96).then(applyImage).catch(() => toast("Could not read that image.", "error"));
      });
      update();
      root.querySelectorAll("#roleName,#roleColor,#roleBadgeIcon,#roleBadgeId").forEach((input) => input.addEventListener("input", update));
      const adminBox = root.querySelector('[data-role-perm][value="administrator"]');
      const updateCounts = () => {
        root.querySelectorAll(".permission-group").forEach((section) => {
          const boxes = [...section.querySelectorAll("[data-role-perm]")];
          const count = section.querySelector(".permission-count");
          if (count) count.textContent = `${boxes.filter((box) => box.checked).length}/${boxes.length}`;
        });
      };
      const syncAdmin = () => {
        const isAdmin = Boolean(adminBox?.checked);
        root.querySelectorAll("[data-role-perm]").forEach((box) => {
          if (box === adminBox) return;
          box.disabled = isAdmin;
        });
        root.querySelector(".permission-groups")?.classList.toggle("is-admin", isAdmin);
        updateCounts();
      };
      adminBox?.addEventListener("change", syncAdmin);
      root.querySelectorAll("[data-role-perm]").forEach((box) => box.addEventListener("change", updateCounts));
      syncAdmin();
    }
  });
}

function saveRole(serverId, roleId) {
  const server = getServer(serverId);
  const root = activeModal;
  if (!server || !root) return;
  const name = root.querySelector("#roleName").value.trim();
  if (!name) {
    toast("Give the role a name.", "error");
    return;
  }
  const permissions = [...root.querySelectorAll("[data-role-perm]:checked")].map((box) => box.value);
  const iconImage = root.querySelector("#roleIconImage").value;
  const iconEmoji = root.querySelector("#roleIconEmoji").value.trim().slice(0, 16);
  const data = {
    name: name.slice(0, 32),
    color: root.querySelector("#roleColor").value,
    badgeId: root.querySelector("#roleBadgeId").value,
    badgeIcon: root.querySelector("#roleBadgeIcon").value,
    iconEmoji: iconImage ? "" : iconEmoji,
    iconImage,
    hoist: root.querySelector("#roleHoist").checked,
    permissions
  };
  let role = roleId ? server.roles.find((item) => item.id === roleId) : null;
  if (role) {
    Object.assign(role, data);
  } else {
    role = { id: uid("role"), position: 55, ...data };
    server.roles.push(role);
  }
  commitWorld({ render: false });
  toast(roleId ? "Role updated." : "Role created.", "success");
  openServerSettings(serverId, "roles");
}

function deleteRole(serverId, roleId) {
  const server = getServer(serverId);
  const role = server?.roles.find((item) => item.id === roleId);
  if (!server || !role || role.id === "role-owner") return;
  confirmDialog({ title: `Delete ${role.name}?`, message: "Members keep their other roles. This role will be removed from everyone.", confirmLabel: "Delete role", danger: true }).then((ok) => {
    if (!ok) return;
    server.roles = server.roles.filter((item) => item.id !== roleId);
    Object.values(server.members || {}).forEach((member) => {
      member.roleIds = (member.roleIds || []).filter((id) => id !== roleId);
    });
    commitWorld({ render: false });
    toast("Role deleted.", "success");
    openServerSettings(serverId, "roles");
  });
}

function openChannelEditor(serverId, categoryId, channelId = null) {
  const server = getServer(serverId);
  if (!server) return;
  const found = channelId ? findChannel(channelId) : null;
  const channel = found?.channel || null;
  const category = categoryId || found?.category?.id || server.categories[0]?.id;
  const body = `
    <div class="form-stack">
      <div class="field-row">
        <label class="field"><span>Channel name</span><input id="channelName" maxlength="32" value="${escapeAttr(channel?.name || "")}" placeholder="new-channel"></label>
        <label class="field"><span>Category</span><select id="channelCategory">
          ${server.categories.map((cat) => `<option value="${escapeAttr(cat.id)}" ${cat.id === category ? "selected" : ""}>${escapeHtml(cat.name)}</option>`).join("")}
        </select></label>
      </div>
      <div class="field"><span>Type</span><div class="type-choice-grid">
        <label class="type-choice"><input type="radio" name="channelType" value="text" ${channel?.type !== "voice" ? "checked" : ""}><span class="type-choice-icon">${icon("hash")}</span><span><strong>Text</strong><small>Yap, share, react.</small></span></label>
        <label class="type-choice"><input type="radio" name="channelType" value="voice" ${channel?.type === "voice" ? "checked" : ""}><span class="type-choice-icon">${icon("volume")}</span><span><strong>Voice</strong><small>Real peer-to-peer audio.</small></span></label>
      </div></div>
      <label class="field"><span>Topic</span><input id="channelTopic" maxlength="120" value="${escapeAttr(channel?.topic || "")}" placeholder="What is this channel for?"></label>
      <label class="switch-row"><span><strong>Read-only</strong><small>Only moderators can post.</small></span><input id="channelReadOnly" type="checkbox" ${channel?.readOnly ? "checked" : ""}><span class="switch"></span></label>
      <div class="confirm-actions">
        <button class="ghost-btn" type="button" data-close>Cancel</button>
        <button class="primary-btn" type="button" data-action="save-channel" data-server-id="${escapeAttr(server.id)}" data-channel-id="${escapeAttr(channel?.id || "")}">${icon("check")} ${channel ? "Save channel" : "Create channel"}</button>
      </div>
    </div>`;
  openRawModal(body, { className: "channel-editor-modal" });
}

function saveChannel(serverId, channelId) {
  const server = getServer(serverId);
  const root = activeModal;
  if (!server || !root) return;
  const name = root.querySelector("#channelName").value.trim().replace(/\s+/g, "-").toLowerCase();
  if (!name) {
    toast("Give the channel a name.", "error");
    return;
  }
  const type = root.querySelector('input[name="channelType"]:checked')?.value || "text";
  const categoryId = root.querySelector("#channelCategory").value;
  const category = server.categories.find((item) => item.id === categoryId) || server.categories[0];
  const data = {
    name: name.slice(0, 32), type,
    topic: root.querySelector("#channelTopic").value.trim().slice(0, 120),
    readOnly: root.querySelector("#channelReadOnly").checked,
    userLimit: 10
  };
  if (channelId) {
    const found = findChannel(channelId);
    if (!found) return;
    Object.assign(found.channel, data);
    if (found.category.id !== category.id) {
      found.category.channels = found.category.channels.filter((item) => item.id !== channelId);
      category.channels.push(found.channel);
    }
  } else {
    const channel = { id: uid("ch"), ...data };
    category.channels.push(channel);
    if (type === "text") {
      world.messages[channel.id] = [];
      markRead(channel.id);
    }
    ui.activeChannels[server.id] = channel.id;
  }
  commitWorld({ render: false });
  toast(channelId ? "Channel updated." : "Channel created.", "success");
  openServerSettings(serverId, "channels");
  renderApp();
}

function deleteChannel(channelId) {
  const found = findChannel(channelId);
  if (!found) return;
  const { channel, category, server } = found;
  const all = server.categories.flatMap((cat) => cat.channels);
  if (all.length <= 1) {
    toast("A server needs at least one channel.", "error");
    return;
  }
  confirmDialog({ title: `Delete #${channel.name}?`, message: "Messages in this channel will be removed too. This cannot be undone.", confirmLabel: "Delete channel", danger: true }).then((ok) => {
    if (!ok) return;
    category.channels = category.channels.filter((item) => item.id !== channelId);
    delete world.messages[channelId];
    if (ui.activeChannels[server.id] === channelId) ui.activeChannels[server.id] = server.categories.flatMap((cat) => cat.channels)[0]?.id || null;
    commitWorld({ render: false });
    toast("Channel deleted.", "success");
    openServerSettings(server.id, "channels");
    renderApp();
  });
}

function openMemberRoles(serverId, userId) {
  const server = getServer(serverId);
  const user = getUser(userId);
  if (!server) return;
  const current = getMemberRoleIds(server, userId);
  const removable = userId !== me().id && server.ownerId !== userId;
  const canKick = removable && memberHasPerm(server, me().id, "kickMembers");
  const canBan = removable && memberHasPerm(server, me().id, "banMembers");
  openModal({
    title: `Roles for ${user.name}`,
    eyebrow: "Member management",
    subtitle: "Roles stack. The highest role decides the name color.",
    body: `<div class="server-check-list">${[...server.roles].sort((a, b) => (b.position || 0) - (a.position || 0)).map((role) => `
      <label class="check-row"><input type="checkbox" value="${escapeAttr(role.id)}" data-member-role ${current.includes(role.id) ? "checked" : ""}><span style="color:${escapeAttr(role.color)};display:inline-flex;align-items:center;gap:6px">${roleIconHtml(role, 13)}${escapeHtml(role.name)}</span><small>${plural((role.permissions || []).length, "permission")}</small></label>`).join("")}</div>`,
    footer: `<span class="foot-tip">${icon("key")} ${escapeHtml(user.name)}</span>
      <div class="inline-actions">
        ${canKick ? `<button class="ghost-btn small danger" type="button" data-action="kick-member" data-server-id="${escapeAttr(server.id)}" data-user-id="${escapeAttr(user.id)}">${icon("userMinus")} Kick</button>` : ""}
        ${canBan ? `<button class="ghost-btn small danger" type="button" data-action="ban-member" data-server-id="${escapeAttr(server.id)}" data-user-id="${escapeAttr(user.id)}">${icon("ban")} Ban</button>` : ""}
        <button class="primary-btn" type="button" data-action="save-member-roles" data-server-id="${escapeAttr(server.id)}" data-user-id="${escapeAttr(user.id)}">${icon("check")} Save roles</button>
      </div>`
  });
}

function saveMemberRoles(serverId, userId) {
  const server = getServer(serverId);
  const root = activeModal;
  if (!server || !root) return;
  const ids = [...root.querySelectorAll("[data-member-role]:checked")].map((box) => box.value);
  server.members ||= {};
  server.members[userId] = { roleIds: ids };
  commitWorld({ render: false });
  toast("Member roles updated.", "success");
  openServerSettings(serverId, "members");
}

function removeServerMember(serverId, userId, { ban = false } = {}) {
  const server = getServer(serverId);
  const user = getUser(userId);
  if (!server || !user) return;
  if (userId === me().id) {
    toast("Use Leave server to remove yourself.", "error");
    return;
  }
  if (server.ownerId === userId) {
    toast("You can't remove the owner.", "error");
    return;
  }
  if (!memberHasPerm(server, me().id, ban ? "banMembers" : "kickMembers")) {
    toast(ban ? "You don't have permission to ban members." : "You don't have permission to kick members.", "error");
    return;
  }
  confirmDialog({
    title: `${ban ? "Ban" : "Kick"} ${user.name}?`,
    message: ban
      ? `${user.name} will be removed from ${server.name} and blocked from rejoining.`
      : `${user.name} will be removed from ${server.name}. They can rejoin with an invite.`,
    confirmLabel: ban ? "Ban member" : "Kick member",
    danger: true
  }).then((ok) => {
    if (!ok) return;
    server.memberIds = (server.memberIds || []).filter((id) => id !== userId);
    if (server.members) delete server.members[userId];
    if (ban) {
      server.bannedIds ||= [];
      if (!server.bannedIds.includes(userId)) server.bannedIds.push(userId);
    }
    commitWorld({ render: false });
    closeModal();
    openServerSettings(server.id, "members");
    toast(ban ? `${user.name} was banned.` : `${user.name} was kicked.`, "success");
  });
}

function deleteServer(serverId) {
  const server = getServer(serverId);
  if (!server) return;
  if (server.ownerId !== me().id) {
    toast("Only the owner can delete this server.", "error");
    return;
  }
  confirmDialog({ title: `Delete ${server.name}?`, message: "Every channel, message, role, and invite in this server will be removed. This cannot be undone.", confirmLabel: "Delete server", danger: true }).then((ok) => {
    if (!ok) return;
    server.categories.flatMap((category) => category.channels).forEach((channel) => delete world.messages[channel.id]);
    world.servers = world.servers.filter((item) => item.id !== serverId);
    if (ui.activeServer === serverId) {
      ui.activeServer = world.servers[0]?.id || null;
      ui.view = world.servers.length ? "server" : "home";
    }
    commitWorld({ render: false });
    closeModal();
    renderApp();
    toast("Server deleted.", "success");
  });
}

function leaveServer(serverId) {
  const server = getServer(serverId);
  if (!server) return;
  if (server.ownerId === me().id) {
    toast("Owners can't leave their own server. Delete it instead.", "error");
    return;
  }
  confirmDialog({ title: `Leave ${server.name}?`, message: "You can join again later from Discover.", confirmLabel: "Leave server", danger: true }).then((ok) => {
    if (!ok) return;
    server.memberIds = server.memberIds.filter((id) => id !== me().id);
    if (server.members) delete server.members[me().id];
    if (ui.activeServer === serverId) {
      ui.activeServer = world.servers.find((item) => isMember(item, me().id))?.id || null;
      ui.view = ui.activeServer ? "server" : "home";
    }
    commitWorld({ render: false });
    closeModal();
    renderApp();
    toast("You left the server.", "success");
  });
}

/* ---------- Discover ---------- */

function openDiscover() {
  const available = world.servers.filter((server) => !isMember(server, me().id) && !server.private);
  const joined = world.servers.filter((server) => isMember(server, me().id));
  const body = `
    <div class="discover-grid">
      ${available.length ? available.map((server) => `
        <div class="community-card">
          <div class="community-banner ${bannerClass(server.banner)}" style="${bannerStyle(server.banner)}"><span>${escapeHtml(server.icon?.value || "🪩")}</span></div>
          <div class="community-body">
            <h3>${escapeHtml(server.name)}</h3>
            <p>${escapeHtml(server.tagline || "A cozy place to yap.")}</p>
            <div class="community-foot"><span class="community-count">${icon("users")}${server.memberIds.length}</span><button class="primary-btn small" type="button" data-action="join-server" data-server-id="${escapeAttr(server.id)}">${icon("plus")} Join</button></div>
          </div>
        </div>`).join("") : `<div class="empty-yap"><span class="empty-emoji">🌍</span><h3>You're in every community</h3><p>Build a new one or invite a friend.</p></div>`}
    </div>
    <div class="discover-join">
      <div class="field"><span>Have an invite code?</span><div class="input-with-prefix">${icon("link")}<input id="inviteCodeInput" placeholder="paste an invite code"></div></div>
      <button class="ghost-btn" type="button" data-action="join-by-code">${icon("arrowRight")} Join</button>
    </div>
    <div class="modal-foot" style="margin-top:14px">
      <span class="foot-tip">${icon("users")} ${plural(joined.length, "community", "communities")} joined</span>
      <button class="primary-btn" type="button" data-action="create-server">${icon("plus")} Create a server</button>
    </div>`;
  openRawModal(body, { className: "discover-modal-new" });
}

function joinServer(serverId) {
  const server = getServer(serverId);
  if (!server) return;
  if ((server.bannedIds || []).includes(me().id)) {
    toast(`You're banned from ${server.name}.`, "error");
    return;
  }
  if (!server.memberIds.includes(me().id)) {
    server.memberIds.push(me().id);
    server.members ||= {};
    server.members[me().id] = { roleIds: ["role-member"] };
  }
  ui.view = "server";
  ui.activeServer = server.id;
  const channel = server.categories.flatMap((category) => category.channels)[0];
  if (channel) {
    ui.activeChannels[server.id] = channel.id;
    if (channel.type === "text") markRead(channel.id);
  }
  commitWorld({ render: false });
  closeModal();
  renderApp({ scroll: true });
  toast(`Joined ${server.name}.`, "success");
}

function joinByCode() {
  const code = activeModal?.querySelector("#inviteCodeInput")?.value.trim().toLowerCase();
  if (!code) return;
  const server = world.servers.find((item) => item.inviteCode?.toLowerCase() === code || item.id === code);
  if (!server) {
    toast("That invite code doesn't match a server.", "error");
    return;
  }
  joinServer(server.id);
}

function copyInvite(serverId) {
  const server = getServer(serverId);
  if (server && !memberHasPerm(server, me().id, "createInvite")) {
    toast("You don't have permission to create invites here.", "error");
    return;
  }
  const code = server?.inviteCode || "nodum-hq";
  navigator.clipboard?.writeText(code).then(() => toast(`Invite code copied: ${code}`)).catch(() => toast(code));
}

/* ---------- Notifications ---------- */

function openNotifications() {
  const requests = world.friendRequests || [];
  const unreadDms = Object.values(world.dms).filter((dm) => dm.participants?.includes(me().id) && unreadForDm(dm) > 0);
  const subs = canModerateGlobal() ? pendingSubmissions() : [];
  const items = [];
  requests.forEach((request) => {
    const user = getUser(request.from);
    items.push({
      icon: "userPlus", tone: "accent", title: `${user.name} sent a friend request`,
      copy: `@${user.handle} · ${formatRelative(request.createdAt)}`,
      action: `<button class="ghost-btn small" type="button" data-action="accept-friend" data-user-id="${escapeAttr(user.id)}">Accept</button>`
    });
  });
  unreadDms.forEach((dm) => {
    const other = getUser(dm.participants.find((id) => id !== me().id));
    items.push({
      icon: "message", tone: "green", title: `${other.name} sent you a message`,
      copy: truncate(dm.messages.at(-1)?.text || "sent an image", 80),
      action: `<button class="ghost-btn small" type="button" data-action="open-dm" data-dm-id="${escapeAttr(dm.id)}">Open</button>`
    });
  });
  subs.slice(0, 4).forEach((sub) => {
    const author = getUser(sub.authorId);
    items.push({
      icon: "shieldCheck", tone: "violet", title: `${author.name} submitted ${sub.decoration.name}`,
      copy: `Waiting in the moderation queue · ${formatRelative(sub.createdAt)}`,
      action: `<button class="ghost-btn small" type="button" data-action="open-modqueue">Review</button>`
    });
  });
  const staffApps = canModerateGlobal() ? pendingStaffApplications() : [];
  staffApps.slice(0, 4).forEach((app) => {
    const applicant = getUser(app.userId);
    items.push({
      icon: "shieldStar", tone: "violet", title: `${applicant.name} applied for staff`,
      copy: `Staff application waiting · ${formatRelative(app.submittedAt)}`,
      action: `<button class="ghost-btn small" type="button" data-action="open-staff-apps">Review</button>`
    });
  });
  const plusOrders = canModerateGlobal() ? pendingPlusOrders() : [];
  plusOrders.slice(0, 4).forEach((order) => {
    const buyer = getUser(order.userId);
    items.push({
      icon: "crown", tone: "accent", title: `${buyer.name} requested Plus`,
      copy: `1,000 R$ gamepass · ${escapeHtml(order.reference || "no reference")} · ${formatRelative(order.submittedAt)}`,
      action: `<button class="ghost-btn small" type="button" data-action="open-plus-orders">Review</button>`
    });
  });
  const body = items.length ? `<div class="notification-list">${items.map((item) => `
    <div class="notification-row">
      <span class="notification-icon ${item.tone}">${icon(item.icon)}</span>
      <div class="notification-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.copy)}</small></div>
      ${item.action}
    </div>`).join("")}</div>` : `<div class="empty-yap"><span class="empty-emoji">🔔</span><h3>All caught up</h3><p>No mentions, no requests, no chaos. For now.</p></div>`;
  openModal({
    title: "Notifications",
    eyebrow: "What's happening",
    subtitle: "Mentions, friend requests, DMs, and the mod queue.",
    body,
    className: "notifications-modal",
    footer: `<span class="foot-tip">${icon("bell")} ${items.length} ${items.length === 1 ? "notification" : "notifications"}</span><button class="ghost-btn" type="button" data-action="mark-all-read">${icon("check")} Mark all read</button>`
  });
}

/* ---------- Search ---------- */

function openSearch(query = "") {
  const body = `
    <div class="search-field">${icon("search")}<input id="globalSearchInput" type="search" placeholder="Search messages, people, channels, servers…" value="${escapeAttr(query)}" autocomplete="off"></div>
    <div class="search-results" id="searchResults">${searchResultsHtml(query)}</div>
    <div class="modal-foot"><span class="foot-tip">${icon("search")} Search across your local world</span><kbd>Esc</kbd></div>`;
  openRawModal(body, {
    className: "search-modal-new",
    onMount: (root) => {
      const input = root.querySelector("#globalSearchInput");
      const results = root.querySelector("#searchResults");
      input?.focus();
      input?.addEventListener("input", () => {
        results.innerHTML = searchResultsHtml(input.value);
        hydrateIcons(results);
      });
      input?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const first = results.querySelector("[data-search-action]");
          if (first) first.click();
        }
      });
    }
  });
}

function searchResultsHtml(query) {
  const value = String(query || "").trim().toLowerCase();
  if (!value) {
    return `<div class="search-empty"><span class="empty-orb">${icon("compass")}</span><h3>Search the yap</h3><p>Find a message, a person, a channel, or a whole server. Try “lounge”, “maya”, or “pizza”.</p></div>`;
  }
  const userResults = Object.values(world.users).filter((user) => user.name.toLowerCase().includes(value) || user.handle.toLowerCase().includes(value) || (user.bio || "").toLowerCase().includes(value)).slice(0, 5);
  const serverResults = world.servers.filter((server) => server.name.toLowerCase().includes(value) || (server.tagline || "").toLowerCase().includes(value)).slice(0, 4);
  const channelResults = world.servers.flatMap((server) => server.categories.flatMap((category) => category.channels.map((channel) => ({ server, category, channel })))).filter(({ channel }) => channel.name.toLowerCase().includes(value) || (channel.topic || "").toLowerCase().includes(value)).slice(0, 6);
  const messageResults = [];
  Object.entries(world.messages).forEach(([channelId, messages]) => {
    const found = findChannel(channelId);
    if (!found || !isMember(found.server, me().id)) return;
    messages.forEach((message) => {
      if ((message.text || "").toLowerCase().includes(value)) messageResults.push({ message, channelId, server: found.server, channel: found.channel });
    });
  });
  Object.values(world.dms).forEach((dm) => {
    if (!dm.participants?.includes(me().id)) return;
    dm.messages.forEach((message) => {
      if ((message.text || "").toLowerCase().includes(value)) messageResults.push({ message, dm });
    });
  });
  const messages = messageResults.slice(0, 8);
  const groups = [];
  if (messages.length) {
    groups.push(`<div class="result-group-label">Messages</div>${messages.map((item) => {
      const author = getUser(item.message.authorId);
      const where = item.dm ? `Direct message with ${getUser(item.dm.participants.find((id) => id !== me().id)).name}` : `#${item.channel.name} · ${item.server.name}`;
      return `<button class="search-result" type="button" data-search-action data-search-type="message" data-channel-id="${escapeAttr(item.channelId || item.dm.id)}" data-message-id="${escapeAttr(item.message.id)}">
        <span class="result-icon">${icon(item.dm ? "message" : "hash")}</span>
        <span class="result-copy"><span class="result-title">${escapeHtml(author.name)} <span>${escapeHtml(where)}</span></span><span class="result-snippet">${searchSnippet(item.message.text, value)}</span></span>
        <span class="result-meta">${formatRelative(item.message.createdAt)}</span>
      </button>`;
    }).join("")}`);
  }
  if (userResults.length) {
    groups.push(`<div class="result-group-label">People</div>${userResults.map((user) => `
      <button class="search-result" type="button" data-search-action data-search-type="profile" data-user-id="${escapeAttr(user.id)}">
        ${avatarWrap(user, "avatar-30")}
        <span class="result-copy"><span class="result-title">${escapeHtml(user.name)} <span>@${escapeHtml(user.handle)}</span></span><span class="result-snippet">${escapeHtml(truncate(user.bio || statusLabel(user), 70))}</span></span>
        <span class="result-meta">${compactBadges(user, null, 2)}</span>
      </button>`).join("")}`);
  }
  if (channelResults.length) {
    groups.push(`<div class="result-group-label">Channels</div>${channelResults.map(({ server, channel }) => `
      <button class="search-result" type="button" data-search-action data-search-type="channel" data-channel-id="${escapeAttr(channel.id)}">
        <span class="result-icon">${icon(channel.type === "voice" ? "volume" : "hash")}</span>
        <span class="result-copy"><span class="result-title">#${escapeHtml(channel.name)} <span>${escapeHtml(server.name)}</span></span><span class="result-snippet">${escapeHtml(channel.topic || "No topic yet")}</span></span>
        <span class="result-meta">${plural(server.memberIds.length, "member")}</span>
      </button>`).join("")}`);
  }
  if (serverResults.length) {
    groups.push(`<div class="result-group-label">Servers</div>${serverResults.map((server) => `
      <button class="search-result" type="button" data-search-action data-search-type="server" data-server-id="${escapeAttr(server.id)}">
        ${serverIconHtml(server, "server-icon")}
        <span class="result-copy"><span class="result-title">${escapeHtml(server.name)}</span><span class="result-snippet">${escapeHtml(server.tagline || "A community on Nodum")}</span></span>
        <span class="result-meta">${plural(server.memberIds.length, "member")}</span>
      </button>`).join("")}`);
  }
  if (!groups.length) {
    return `<div class="search-empty"><span class="empty-orb">${icon("search")}</span><h3>No yaps found</h3><p>Try a shorter word, a handle, or a channel name.</p></div>`;
  }
  return groups.join("");
}

function searchSnippet(text, query) {
  const source = String(text || "");
  const index = source.toLowerCase().indexOf(query);
  const start = Math.max(0, index - 45);
  const snippet = `${start > 0 ? "…" : ""}${source.slice(start, start + 150)}${source.length > start + 150 ? "…" : ""}`;
  return escapeHtml(snippet).replace(new RegExp(escapeRegExp(query), "gi"), (match) => `<mark>${match}</mark>`);
}

function handleSearchResult(button) {
  const type = button.dataset.searchType;
  if (type === "profile") {
    closeModal();
    openProfile(button.dataset.userId);
    return;
  }
  if (type === "channel") {
    closeModal();
    goChannel(button.dataset.channelId);
    return;
  }
  if (type === "server") {
    closeModal();
    goServer(button.dataset.serverId);
    return;
  }
  if (type === "message") {
    const channelId = button.dataset.channelId;
    const messageId = button.dataset.messageId;
    closeModal();
    if (world.dms[channelId]) goHome(channelId);
    else goChannel(channelId);
    window.setTimeout(() => flashMessage(messageId), 160);
  }
}

/* ---------- Pins, members, friend add ---------- */

function openPins() {
  const channel = getActiveChannel();
  if (!channel || channel.type !== "text") return;
  const pinned = (world.messages[channel.id] || []).filter((message) => message.pinned);
  const body = pinned.length ? `<div class="pins-list">${pinned.map((message) => {
    const author = getUser(message.authorId);
    return `<div class="pin-item">${avatarWrap(author, "avatar-30")}<div class="pin-copy"><strong>${escapeHtml(author.name)} · ${formatRelative(message.createdAt)}</strong><p>${escapeHtml(truncate(message.text || "", 150))}</p></div><button class="pin-jump" type="button" data-action="jump-message" data-channel-id="${escapeAttr(channel.id)}" data-message-id="${escapeAttr(message.id)}">Jump</button></div>`;
  }).join("")}</div>` : `<div class="pins-empty"><span>📌</span><h3>No pinned messages</h3><p>Pin something worth keeping around.</p></div>`;
  openModal({
    title: "Pinned messages",
    eyebrow: `#${channel.name}`,
    subtitle: `${pinned.length} pinned ${pinned.length === 1 ? "message" : "messages"} in this channel.`,
    body,
    className: "pins-modal"
  });
}

function openMembersModal() {
  const server = getActiveServer();
  openModal({
    title: `${server.name} members`,
    eyebrow: "Who's here",
    subtitle: `${server.memberIds.length} members · ${server.memberIds.map(getUser).filter(isUserOnline).length} online`,
    body: `<div class="members-modal-list">${server.memberIds.map(getUser).sort((a, b) => (getTopRole(server, b.id)?.position || 0) - (getTopRole(server, a.id)?.position || 0)).map((user) => `
      <button class="member-row" type="button" data-profile="${escapeAttr(user.id)}">${avatarWrap(user, "avatar-32")}<span class="member-meta"><span class="member-name" style="color:${escapeAttr(getTopRole(server, user.id)?.color || "var(--text)")}">${roleCustomIconHtml(getTopRole(server, user.id), 13)}${escapeHtml(user.name)} ${roleBadgeHtml(getTopRole(server, user.id), user.id)}</span><span class="member-activity">${escapeHtml(statusLabel(user))}</span></span></button>`).join("")}</div>`
  });
}

function openAddFriend() {
  const body = `
    <div class="form-stack">
      <label class="field"><span>Add by handle or name</span><div class="input-with-prefix">${icon("at")}<input id="friendQuery" placeholder="maya or @maya" autocomplete="off"></div></label>
      <div class="friend-suggestions" id="friendSuggestions">${friendSuggestionsHtml("")}</div>
      <div class="modal-foot" style="padding:8px 0 0"><span class="foot-tip">${icon("users")} ${world.friendIds.length} friends</span><button class="primary-btn" type="button" data-action="send-friend-request">${icon("userPlus")} Add friend</button></div>
    </div>`;
  openRawModal(body, {
    className: "add-friend-modal",
    onMount: (root) => {
      const input = root.querySelector("#friendQuery");
      const list = root.querySelector("#friendSuggestions");
      input?.addEventListener("input", () => {
        list.innerHTML = friendSuggestionsHtml(input.value);
      });
      input?.focus();
    }
  });
}

function friendSuggestionsHtml(query) {
  const value = String(query || "").toLowerCase().replace(/^@/, "");
  const users = Object.values(world.users)
    .filter((user) => user.id !== me().id && !(world.friendIds || []).includes(user.id))
    .filter((user) => !value || user.name.toLowerCase().includes(value) || user.handle.toLowerCase().includes(value))
    .slice(0, 6);
  if (!users.length) return `<div class="muted-small">No matching people. Try another handle.</div>`;
  return users.map((user) => `<button class="friend-suggestion" type="button" data-action="add-suggestion" data-user-id="${escapeAttr(user.id)}">${avatarWrap(user, "avatar-32")}<span><strong>${escapeHtml(user.name)}</strong><small>@${escapeHtml(user.handle)}</small></span>${icon("plus")}</button>`).join("");
}

function addFriend(userId) {
  const user = getUser(userId);
  if (!user || user.id === me().id) return;
  world.friendIds ||= [];
  world.blockedIds = (world.blockedIds || []).filter((id) => id !== userId);
  world.friendRequests = (world.friendRequests || []).filter((request) => request.from !== userId);
  if (!world.friendIds.includes(userId)) world.friendIds.push(userId);
  ensureDm(me().id, userId);
  commitWorld({ render: false });
  toast(`You're now friends with ${user.name}.`, "success");
  if (activeModal?.classList.contains("add-friend-modal")) closeModal();
  renderApp();
}

function acceptFriend(userId) {
  addFriend(userId);
  closeModal();
  renderApp();
}

function ignoreFriend(userId) {
  world.friendRequests = (world.friendRequests || []).filter((request) => request.from !== userId);
  commitWorld({ render: false });
  toast("Request dismissed.");
  if (activeModal) closeModal();
  renderApp();
}

function removeFriend(userId) {
  const user = getUser(userId);
  confirmDialog({ title: `Remove ${user.name}?`, message: "You'll stay in the same servers, but they won't be in your friends list.", confirmLabel: "Remove friend", danger: true }).then((ok) => {
    if (!ok) return;
    world.friendIds = (world.friendIds || []).filter((id) => id !== userId);
    commitWorld({ render: false });
    toast("Friend removed.");
    renderApp();
  });
}

function blockUser(userId) {
  const user = getUser(userId);
  if (!user || user.id === me().id) return;
  confirmDialog({
    title: `Block ${user.name}?`,
    message: "They'll be removed from your friends, their DMs will be hidden, and their requests will be dismissed. You can unblock them any time.",
    confirmLabel: "Block",
    danger: true
  }).then((ok) => {
    if (!ok) return;
    world.blockedIds ||= [];
    if (!world.blockedIds.includes(userId)) world.blockedIds.push(userId);
    world.friendIds = (world.friendIds || []).filter((id) => id !== userId);
    world.friendRequests = (world.friendRequests || []).filter((request) => request.from !== userId);
    if (ui.activeDM) {
      const dm = world.dms?.[ui.activeDM];
      const otherId = dm?.participants?.find((id) => id !== me().id);
      if (otherId === userId) ui.activeDM = null;
    }
    commitWorld({ render: false });
    toast(`${user.name} blocked.`);
    renderApp();
  });
}

function unblockUser(userId) {
  const user = getUser(userId);
  world.blockedIds = (world.blockedIds || []).filter((id) => id !== userId);
  commitWorld({ render: false });
  toast(`${user?.name || "They"} unblocked.`);
  renderApp();
}

function openAddFriendFromQuery() {
  const input = activeModal?.querySelector("#friendQuery");
  const value = String(input?.value || "").trim().toLowerCase().replace(/^@/, "");
  if (!value) {
    toast("Type a handle or name first.", "error");
    return;
  }
  const user = Object.values(world.users).find((item) => item.handle?.toLowerCase() === value || item.name.toLowerCase() === value);
  if (!user) {
    toast("No yapper with that handle. Try the suggestions.", "error");
    return;
  }
  addFriend(user.id);
}

/* ---------- Context menu ---------- */

function showContextMenu(x, y, items) {
  const menu = $("#contextMenu");
  if (!menu) return;
  menu.innerHTML = items.map((item, index) => item.sep
    ? `<div class="menu-sep"></div>`
    : `<button type="button" class="${item.danger ? "danger" : ""}" data-index="${index}">${item.icon ? icon(item.icon) : ""}${escapeHtml(item.label)}</button>`).join("");
  menu.hidden = false;
  menu.style.left = "0px";
  menu.style.top = "0px";
  const rect = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(window.innerWidth - rect.width - 10, Math.max(10, x))}px`;
  menu.style.top = `${Math.min(window.innerHeight - rect.height - 10, Math.max(10, y))}px`;
  menu.dataset.ready = "true";
  menu.onclick = (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) return;
    const item = items[Number(button.dataset.index)];
    menu.hidden = true;
    if (item?.run) item.run();
  };
}

function hideContextMenu() {
  const menu = $("#contextMenu");
  if (menu) menu.hidden = true;
}

function openFriendMore(userId, anchorEvent = null) {
  const user = getUser(userId);
  const isFriend = (world.friendIds || []).includes(userId);
  const blocked = isBlocked(userId);
  const rect = anchorEvent?.currentTarget?.getBoundingClientRect();
  const x = rect ? rect.left : window.innerWidth / 2;
  const y = rect ? rect.bottom + 6 : window.innerHeight / 2;
  const items = [
    { label: "Message", icon: "message", run: () => openDmWith(userId) },
    { label: "View profile", icon: "users", run: () => openProfile(userId) },
    { label: "Copy handle", icon: "copy", run: () => navigator.clipboard?.writeText(`@${user.handle}`).then(() => toast("Handle copied.")) },
    { sep: true }
  ];
  if (blocked) {
    items.push({ label: "Unblock", icon: "userCheck", run: () => unblockUser(userId) });
  } else {
    items.push(isFriend
      ? { label: "Remove friend", icon: "userX", danger: true, run: () => removeFriend(userId) }
      : { label: "Add friend", icon: "userPlus", run: () => addFriend(userId) });
    items.push({ label: "Block", icon: "shield", danger: true, run: () => blockUser(userId) });
  }
  showContextMenu(x, y, items);
}

/* ---------- Emoji popover ---------- */

function openEmojiPopover(anchor, onPick) {
  const popover = $("#emojiPopover");
  if (!popover) return;
  popover.innerHTML = `<div class="emoji-popover-head"><span>Emoji</span><span>Click to insert</span></div><div class="emoji-grid">${EMOJIS.map((emoji) => `<button type="button" data-emoji="${escapeAttr(emoji)}">${emoji}</button>`).join("")}</div>`;
  popover.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const width = 306;
  const height = Math.min(360, popover.getBoundingClientRect().height || 330);
  popover.style.left = `${Math.min(window.innerWidth - width - 12, Math.max(12, rect.left - width + rect.width))}px`;
  popover.style.top = `${Math.max(12, rect.top - height - 8)}px`;
  popover.onclick = (event) => {
    const button = event.target.closest("button[data-emoji]");
    if (!button) return;
    popover.hidden = true;
    onPick(button.dataset.emoji);
  };
}

/* ---------- Audio devices ---------- */

let voiceDevices = { inputs: [], outputs: [] };

function micConstraints() {
  const constraints = {
    echoCancellation: prefs?.echoCancellation !== false,
    noiseSuppression: prefs?.noiseSuppression !== false,
    autoGainControl: true
  };
  if (prefs?.inputDeviceId && prefs.inputDeviceId !== "default") {
    constraints.deviceId = { exact: prefs.inputDeviceId };
  }
  return constraints;
}

function voiceDeviceOptions(kind, selected = "default") {
  const list = kind === "input" ? voiceDevices.inputs : voiceDevices.outputs;
  const fallback = kind === "input" ? "Microphone" : "Speaker";
  const options = [`<option value="default">Default — system chooses</option>`];
  list.forEach((device, index) => {
    options.push(`<option value="${escapeAttr(device.deviceId)}">${escapeHtml(device.label || `${fallback} ${index + 1}`)}</option>`);
  });
  if (selected && selected !== "default" && !list.some((device) => device.deviceId === selected)) {
    options.push(`<option value="${escapeAttr(selected)}">Saved device (not connected)</option>`);
  }
  return options.join("");
}

async function refreshVoiceDevices(root = activeModal) {
  if (!navigator.mediaDevices?.enumerateDevices) return;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    voiceDevices.inputs = devices.filter((device) => device.kind === "audioinput");
    voiceDevices.outputs = devices.filter((device) => device.kind === "audiooutput");
  } catch {
    return;
  }
  const inputSelect = root?.querySelector("#voiceInputDevice");
  const outputSelect = root?.querySelector("#voiceOutputDevice");
  if (inputSelect) inputSelect.innerHTML = voiceDeviceOptions("input", prefs.inputDeviceId);
  if (outputSelect) outputSelect.innerHTML = voiceDeviceOptions("output", prefs.outputDeviceId);
}

async function applyOutputDevice(audio) {
  if (!audio || typeof audio.setSinkId !== "function") return;
  const id = prefs?.outputDeviceId;
  if (!id || id === "default") {
    try { await audio.setSinkId(""); } catch { /* default sink */ }
    return;
  }
  try {
    await audio.setSinkId(id);
  } catch {
    /* The saved speaker is gone; the default sink still plays. */
  }
}

function applyOutputDevices() {
  document.querySelectorAll("audio[data-voice-peer]").forEach((audio) => {
    audio.volume = Math.max(0, Number(prefs?.outputVolume ?? 100)) / 100;
    applyOutputDevice(audio);
  });
}

async function applyInputDevice() {
  if (!voiceState?.stream) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: micConstraints(), video: false });
    const track = stream.getAudioTracks()[0];
    if (!track) return;
    voiceState.stream.getAudioTracks().forEach((oldTrack) => oldTrack.stop());
    voiceState.stream = stream;
    const senders = [];
    voicePeers.forEach((peer) => {
      peer.pc.getSenders().forEach((sender) => {
        if (sender.track?.kind === "audio") senders.push(sender);
      });
    });
    await Promise.allSettled(senders.map((sender) => sender.replaceTrack(track)));
    const context = ensureVoiceAudioContext();
    if (context) setupVoiceMeter("self", stream);
    startVoiceMeterLoop();
    voiceState.muted = false;
    registerPresence();
    renderApp();
    toast("Microphone switched.", "success");
  } catch {
    toast("Couldn't switch microphones. Allow mic access and try again.", "error");
  }
}

/* ---------- Test mic ---------- */

async function testMic() {
  const meter = document.querySelector("#micLevel span");
  const copy = document.querySelector("#micTestCopy");
  const button = document.querySelector('[data-settings-action="test-mic"]');
  if (button) button.disabled = true;
  if (copy) copy.textContent = "Listening…";
  let stream = null;
  let context = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: micConstraints(), video: false });
    context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let peak = 0;
    const started = performance.now();
    const finish = () => {
      stream?.getTracks().forEach((track) => track.stop());
      context?.close();
      if (meter) meter.style.width = "0%";
      if (button) button.disabled = false;
      const working = peak > 18;
      if (copy) copy.textContent = working ? "Mic is working. Sounds clear." : "Mic opened. Try speaking a little louder.";
      toast(working ? "Your mic is working." : "Mic opened. Try saying something louder.", working ? "success" : "info");
    };
    const tick = () => {
      if (!context || context.state === "closed") return;
      analyser.getByteFrequencyData(data);
      const average = data.reduce((sum, value) => sum + value, 0) / data.length;
      peak = Math.max(peak, average);
      if (meter) meter.style.width = `${Math.min(100, Math.round(average * 1.7))}%`;
      if (performance.now() - started > 4000) {
        finish();
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  } catch (error) {
    stream?.getTracks().forEach((track) => track.stop());
    context?.close();
    if (meter) meter.style.width = "0%";
    if (copy) copy.textContent = "Mic access is blocked. Allow it in your browser settings.";
    if (button) button.disabled = false;
    toast("Mic access was blocked. Allow it in your browser settings.", "error");
  }
}

/* ---------- Export / reset ---------- */

function exportData() {
  const blob = new Blob([JSON.stringify(world, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nodum-world.json";
  link.click();
  URL.revokeObjectURL(url);
  toast("World exported.");
}

function resetWorld() {
  confirmDialog({ title: "Reset everything?", message: "This clears Nodum data on this device and seeds a fresh world. There is no undo.", confirmLabel: "Reset Nodum", danger: true }).then((ok) => {
    if (!ok) return;
    [WORLD_KEY, PREFS_KEY, UI_KEY, PRESENCE_KEY, SESSION_KEY, AUTH_KEY].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    location.reload();
  });
}

/* =========================================================
   Voice — real peer-to-peer audio over WebRTC + BroadcastChannel
   ========================================================= */

let voicePeers = new Map();
let voiceMeters = new Map();
let voiceAudioContext = null;
let voiceMeterFrame = 0;
let voiceMeterLast = 0;

function voiceIceServers() {
  return [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }];
}

function ensureVoiceAudioContext() {
  if (!voiceAudioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    voiceAudioContext = new Ctx();
  }
  if (voiceAudioContext.state === "suspended") voiceAudioContext.resume().catch(() => {});
  return voiceAudioContext;
}

async function joinVoice(channelId) {
  const found = findChannel(channelId);
  if (!found) return;
  const { server, channel } = found;
  if (!isMember(server, me().id) && server.ownerId !== me().id) {
    toast(`Join ${server.name} first.`, "error");
    return;
  }
  if (!memberHasPerm(server, me().id, "connect")) {
    toast("You do not have permission to connect to voice here.", "error");
    return;
  }
  if (voiceState?.joined) {
    if (voiceState.channelId === channelId) return;
    leaveVoice({ silent: true });
  }

  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: micConstraints(),
      video: false
    });
  } catch (error) {
    console.warn("Mic unavailable:", error);
    toast("Mic access was blocked. You can join as a listener and unmute later.", "error");
  }

  const canSpeak = memberHasPerm(server, me().id, "speak");
  voiceState = {
    joined: true,
    serverId: server.id,
    channelId: channel.id,
    channelName: channel.name,
    stream,
    muted: !stream || !canSpeak,
    deafened: false,
    speaking: false,
    remoteSpeaking: {}
  };

  if (stream) {
    if (!canSpeak) stream.getAudioTracks().forEach((track) => { track.enabled = false; });
    const context = ensureVoiceAudioContext();
    if (context) setupVoiceMeter("self", stream);
    startVoiceMeterLoop();
  }

  registerPresence();
  renderApp();
  if (prefs?.joinSound) playTestSound("join", { silent: true });
  if (!canSpeak) {
    toast(`Joined ${channel.name} muted. Your role can't speak here.`, "success");
  } else {
    toast(stream ? `Joined ${channel.name}. Say something.` : `Joined ${channel.name} as a listener.`, "success");
  }

  // Announce ourselves so existing peers in the room can connect immediately.
  broadcastVoiceSignal("all", { kind: "hello", channelId: channel.id });
  window.setTimeout(() => syncVoicePeers(true), 250);
}

function leaveVoice({ silent = false } = {}) {
  if (!voiceState?.joined) {
    if (!silent) toast("You're not in a voice channel.");
    return;
  }
  const channelName = voiceState.channelName || "voice";
  broadcastVoiceSignal("all", { kind: "bye", channelId: voiceState.channelId });
  voicePeers.forEach((peer, peerId) => closeVoicePeer(peerId));
  voicePeers.clear();
  if (voiceState.stream) voiceState.stream.getTracks().forEach((track) => track.stop());
  voiceMeters.clear();
  stopVoiceMeterLoop();
  voiceState = null;
  registerPresence();
  renderApp();
  if (prefs?.joinSound) playTestSound("leave", { silent: true });
  if (!silent) toast(`Left ${channelName}.`);
}

function toggleMute({ silent = false } = {}) {
  if (!voiceState?.joined) {
    toast("Join a voice channel first.", "error");
    return;
  }
  if (voiceState.muted) {
    const server = getServer(voiceState.serverId);
    if (server && !memberHasPerm(server, me().id, "speak")) {
      toast("Your role can't speak in this server.", "error");
      return;
    }
  }
  voiceState.muted = !voiceState.muted;
  if (voiceState.stream) {
    voiceState.stream.getAudioTracks().forEach((track) => { track.enabled = !voiceState.muted; });
  }
  if (voiceState.muted) voiceState.speaking = false;
  registerPresence();
  renderApp();
  if (!silent) toast(voiceState.muted ? "Mic muted." : "Mic live.");
}

function toggleDeafen({ silent = false } = {}) {
  if (!voiceState?.joined) {
    toast("Join a voice channel first.", "error");
    return;
  }
  voiceState.deafened = !voiceState.deafened;
  voicePeers.forEach((peer) => {
    if (peer.audio) peer.audio.muted = voiceState.deafened;
  });
  if (voiceState.stream) {
    const shouldEnable = !voiceState.deafened && !voiceState.muted;
    voiceState.stream.getAudioTracks().forEach((track) => { track.enabled = shouldEnable; });
  }
  registerPresence();
  renderApp();
  if (!silent) toast(voiceState.deafened ? "Deafened. You can't hear anyone." : "Undeafened.");
}

function sendVoiceSignal(to, data) {
  if (!bus || !session) return;
  try {
    bus.postMessage({
      type: "voice-signal",
      from: session.sessionId,
      to,
      channelId: voiceState?.channelId || null,
      data
    });
  } catch (error) {
    console.warn("Voice signal failed:", error);
  }
}

function broadcastVoiceSignal(to, data) {
  sendVoiceSignal(to, data);
}

function createVoicePeer(peerId) {
  let peer = voicePeers.get(peerId);
  if (peer) return peer;
  const pc = new RTCPeerConnection({ iceServers: voiceIceServers() });
  peer = { pc, stream: null, audio: null, pendingIce: [], sending: false };
  voicePeers.set(peerId, peer);

  if (voiceState?.stream) {
    voiceState.stream.getTracks().forEach((track) => {
      try { pc.addTrack(track, voiceState.stream); } catch (error) { console.warn(error); }
    });
  }

  pc.onicecandidate = (event) => {
    if (event.candidate) sendVoiceSignal(peerId, { kind: "ice", candidate: event.candidate });
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    if (!stream) return;
    peer.stream = stream;
    attachRemoteAudio(peerId, stream);
    const context = ensureVoiceAudioContext();
    if (context) setupVoiceMeter(peerId, stream);
    startVoiceMeterLoop();
    renderVoiceTilesOnly();
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === "failed" || pc.connectionState === "closed") {
      closeVoicePeer(peerId);
      renderVoiceTilesOnly();
    }
  };

  return peer;
}

async function initiateVoiceOffer(peerId) {
  const peer = createVoicePeer(peerId);
  if (peer.sending) return;
  peer.sending = true;
  try {
    const offer = await peer.pc.createOffer();
    await peer.pc.setLocalDescription(offer);
    sendVoiceSignal(peerId, { kind: "offer", sdp: peer.pc.localDescription });
  } catch (error) {
    console.warn("Could not create voice offer:", error);
  } finally {
    peer.sending = false;
  }
}

async function handleVoiceSignal(message) {
  if (!session || message.from === session.sessionId) return;
  const peerId = message.from;
  if (!voiceState?.joined) return;
  if (message.channelId && message.channelId !== voiceState.channelId) return;
  const data = message.data || {};
  try {
    if (data.kind === "hello") {
      // The peer just joined. If our session id is lower, we initiate.
      if (session.sessionId < peerId) initiateVoiceOffer(peerId);
      return;
    }
    if (data.kind === "bye") {
      closeVoicePeer(peerId);
      renderVoiceTilesOnly();
      return;
    }
    const peer = createVoicePeer(peerId);
    if (data.kind === "offer") {
      await peer.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      await flushVoiceIce(peer);
      const answer = await peer.pc.createAnswer();
      await peer.pc.setLocalDescription(answer);
      sendVoiceSignal(peerId, { kind: "answer", sdp: peer.pc.localDescription });
      return;
    }
    if (data.kind === "answer") {
      if (peer.pc.signalingState === "have-local-offer") {
        await peer.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        await flushVoiceIce(peer);
      }
      return;
    }
    if (data.kind === "ice" && data.candidate) {
      if (peer.pc.remoteDescription) {
        await peer.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } else {
        peer.pendingIce.push(data.candidate);
      }
    }
  } catch (error) {
    console.warn("Voice signal error:", error);
  }
}

async function flushVoiceIce(peer) {
  while (peer.pendingIce.length) {
    const candidate = peer.pendingIce.shift();
    try { await peer.pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (error) { console.warn(error); }
  }
}

function attachRemoteAudio(peerId, stream) {
  const peer = voicePeers.get(peerId);
  if (!peer) return;
  if (peer.audio) {
    peer.audio.srcObject = stream;
    peer.audio.volume = Math.max(0, Number(prefs?.outputVolume ?? 100)) / 100;
    applyOutputDevice(peer.audio);
  } else {
    const audio = document.createElement("audio");
    audio.autoplay = true;
    audio.playsInline = true;
    audio.dataset.voicePeer = peerId;
    audio.className = "voice-audio";
    audio.srcObject = stream;
    audio.muted = Boolean(voiceState?.deafened);
    audio.volume = Math.max(0, Number(prefs?.outputVolume ?? 100)) / 100;
    document.body.append(audio);
    peer.audio = audio;
    applyOutputDevice(audio);
    audio.play().catch(() => {
      // Autoplay can be blocked; the next click will retry.
      const retry = () => { audio.play().catch(() => {}); document.removeEventListener("click", retry); };
      document.addEventListener("click", retry, { once: true });
    });
  }
}

function closeVoicePeer(peerId) {
  const peer = voicePeers.get(peerId);
  if (!peer) return;
  voicePeers.delete(peerId);
  voiceMeters.delete(peerId);
  try { peer.pc.close(); } catch { /* ignore */ }
  if (peer.audio) {
    peer.audio.srcObject = null;
    peer.audio.remove();
  }
  if (voiceState?.remoteSpeaking) delete voiceState.remoteSpeaking[peerId];
}

function syncVoicePeers(force = false) {
  if (!voiceState?.joined || !session) return;
  const sameRoom = Object.values(presence).filter((entry) => (
    entry &&
    entry.sessionId !== session.sessionId &&
    entry.voice?.channelId === voiceState.channelId
  ));
  sameRoom.forEach((entry) => {
    if (voicePeers.has(entry.sessionId)) return;
    // Deterministic initiator: the lexicographically smaller session creates the offer.
    if (session.sessionId < entry.sessionId || force) initiateVoiceOffer(entry.sessionId);
  });
  // Drop peers that left the room.
  voicePeers.forEach((peer, peerId) => {
    const stillHere = sameRoom.some((entry) => entry.sessionId === peerId);
    if (!stillHere) closeVoicePeer(peerId);
  });
  renderVoiceTilesOnly();
}

function setupVoiceMeter(key, stream) {
  const context = ensureVoiceAudioContext();
  if (!context || !stream) return;
  try {
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.75;
    source.connect(analyser);
    voiceMeters.set(key, { analyser, source, data: new Uint8Array(analyser.fftSize) });
  } catch (error) {
    console.warn("Meter setup failed:", error);
  }
}

function startVoiceMeterLoop() {
  if (voiceMeterFrame) return;
  const tick = (time) => {
    voiceMeterFrame = requestAnimationFrame(tick);
    if (!voiceState?.joined) {
      stopVoiceMeterLoop();
      return;
    }
    if (time - voiceMeterLast < 110) return;
    voiceMeterLast = time;
    let selfSpeaking = false;
    voiceMeters.forEach(({ analyser, data }, key) => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i += 1) {
        const value = (data[i] - 128) / 128;
        sum += value * value;
      }
      const rms = Math.sqrt(sum / data.length);
      const speaking = rms > 0.045 && !(key === "self" && voiceState.muted);
      if (key === "self") {
        selfSpeaking = speaking;
      } else if (voiceState.remoteSpeaking) {
        voiceState.remoteSpeaking[key] = speaking;
      }
    });
    voiceState.speaking = selfSpeaking;
    updateSpeakingClasses();
  };
  voiceMeterFrame = requestAnimationFrame(tick);
}

function stopVoiceMeterLoop() {
  if (voiceMeterFrame) cancelAnimationFrame(voiceMeterFrame);
  voiceMeterFrame = 0;
  voiceMeterLast = 0;
}

function updateSpeakingClasses() {
  document.querySelectorAll(".voice-tile[data-session]").forEach((tile) => {
    const id = tile.dataset.session;
    const speaking = id === session?.sessionId ? voiceState?.speaking : voiceState?.remoteSpeaking?.[id];
    tile.classList.toggle("is-speaking", Boolean(speaking));
  });
}

function renderVoiceTilesOnly() {
  const container = $("#voiceTiles");
  if (!container) return;
  const channel = getActiveChannel();
  if (!channel || channel.type !== "voice") return;
  const entries = sessionsInVoice(channel.id);
  container.innerHTML = entries.length
    ? entries.map((entry) => voiceTileHtml(entry, channel)).join("")
    : `<div class="voice-empty"><span>🌙</span><h3>It's quiet in here</h3><p>Join the room and invite a friend. Open Nodum in a second tab to test real audio.</p></div>`;
  hydrateIcons(container);
  updateSpeakingClasses();
}

function cleanupVoice() {
  voicePeers.forEach((peer, peerId) => closeVoicePeer(peerId));
  voicePeers.clear();
  if (voiceState?.stream) voiceState.stream.getTracks().forEach((track) => track.stop());
  stopVoiceMeterLoop();
}

/* =========================================================
   Interactions, messaging, presence sync, and boot
   ========================================================= */

function currentDraftKey() {
  if (!ui) return null;
  if (ui.view === "home") return ui.activeDM ? `dm:${ui.activeDM}` : null;
  const channel = getActiveChannel();
  return channel ? `ch:${channel.id}` : null;
}

function currentMessageContext() {
  if (!ui) return null;
  if (ui.view === "home") {
    if (!ui.activeDM) return null;
    const dm = getDm(ui.activeDM);
    if (!dm) return null;
    return { type: "dm", dm, messages: dm.messages };
  }
  const channel = getActiveChannel();
  if (!channel || channel.type !== "text") return null;
  world.messages[channel.id] ||= [];
  return { type: "channel", server: getActiveServer(), channel, messages: world.messages[channel.id] };
}

function focusComposer() {
  const input = $("#messageInput");
  if (!input) return;
  input.focus();
  input.selectionStart = input.value.length;
  autoGrow(input);
}

function autoGrow(input) {
  if (!input) return;
  input.style.height = "auto";
  input.style.height = `${Math.min(180, input.scrollHeight)}px`;
}

/* ---------- Mention autocomplete ---------- */

function mentionCandidates(context) {
  const items = [];
  if (!context) return items;
  if (context.type === "dm") {
    (context.dm?.participants || []).map(getUser).filter(Boolean).forEach((user) => {
      items.push({ kind: "user", label: user.name, handle: user.handle, value: `@${user.handle}`, user });
    });
    return items;
  }
  const server = context.server;
  if (!server) return items;
  if (memberHasPerm(server, me().id, "mentionEveryone")) {
    items.push({ kind: "special", label: "everyone", value: "@everyone", hint: "Notify everyone who can see this channel" });
    items.push({ kind: "special", label: "here", value: "@here", hint: "Notify everyone currently online" });
  }
  [...server.roles]
    .sort((a, b) => (b.position || 0) - (a.position || 0))
    .forEach((role) => items.push({ kind: "role", label: role.name, value: `@${role.name}`, color: role.color, hint: "Role" }));
  server.memberIds
    .map(getUser)
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((user) => items.push({ kind: "user", label: user.name, handle: user.handle, value: `@${user.handle}`, user }));
  return items;
}

function mentionQuery(input) {
  const caret = input.selectionStart ?? input.value.length;
  const before = input.value.slice(0, caret);
  const match = before.match(/(?:^|\s)@([^\n@]{0,40})$/);
  if (!match) return null;
  return { query: match[1], start: caret - match[1].length - 1, end: caret };
}

function hideMentionPopover() {
  mentionState = null;
  document.querySelector("#mentionPopover")?.remove();
}

function renderMentionPopover() {
  if (!mentionState) return hideMentionPopover();
  const wrap = document.querySelector(".composer-wrap");
  if (!wrap) return hideMentionPopover();
  let pop = document.querySelector("#mentionPopover");
  if (!pop) {
    pop = document.createElement("div");
    pop.id = "mentionPopover";
    pop.className = "mention-popover";
    wrap.appendChild(pop);
  }
  pop.hidden = false;
  pop.innerHTML = mentionState.items.map((item, index) => {
    const visual = item.kind === "user"
      ? avatarWrap(item.user, "avatar-20")
      : item.kind === "role"
        ? `<span class="mention-swatch" style="--swatch:${escapeAttr(item.color || "var(--accent)")}"></span>`
        : `<span class="mention-special-icon">${icon(item.value === "@here" ? "bell" : "users")}</span>`;
    const sub = item.kind === "user" ? `@${escapeHtml(item.handle || "")}` : escapeHtml(item.hint || "");
    return `<button class="mention-option ${index === mentionState.index ? "is-active" : ""}" type="button" data-mention-index="${index}">
      ${visual}
      <span class="mention-option-copy"><strong>@${escapeHtml(item.label)}</strong><small>${sub}</small></span>
    </button>`;
  }).join("");
  hydrateIcons(pop);
  pop.querySelector(".mention-option.is-active")?.scrollIntoView({ block: "nearest" });
}

function updateMentionPopover(input) {
  if (!input || input.id !== "messageInput") return hideMentionPopover();
  const mention = mentionQuery(input);
  if (!mention) return hideMentionPopover();
  const context = currentMessageContext();
  if (!context) return hideMentionPopover();
  const query = mention.query.trim().toLowerCase();
  let items = mentionCandidates(context).filter((item) => {
    if (!query) return true;
    if (item.kind === "user") {
      return item.label.toLowerCase().includes(query) || String(item.handle || "").toLowerCase().includes(query);
    }
    return item.label.toLowerCase().includes(query);
  });
  items.sort((a, b) => Number(b.label.toLowerCase().startsWith(query)) - Number(a.label.toLowerCase().startsWith(query)));
  items = items.slice(0, 10);
  if (!items.length) return hideMentionPopover();
  mentionState = { ...mention, items, index: 0 };
  renderMentionPopover();
}

function applyMention(index) {
  if (!mentionState) return;
  const item = mentionState.items[index];
  const input = $("#messageInput");
  if (!item || !input) return;
  const { start, end } = mentionState;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const insert = `${item.value} `;
  input.value = before + insert + after;
  const caret = before.length + insert.length;
  input.focus();
  input.setSelectionRange(caret, caret);
  const key = currentDraftKey();
  if (key) drafts[key] = input.value;
  autoGrow(input);
  hideMentionPopover();
}

function sendMessage() {
  const context = currentMessageContext();
  const input = $("#messageInput");
  if (!context || !input) return;
  const text = input.value.trim();
  if (!text && !pendingAttachment) return;
  hideMentionPopover();

  if (context.type === "channel") {
    const { server, channel } = context;
    if (!memberHasPerm(server, me().id, "sendMessages")) {
      toast("You don't have permission to post here.", "error");
      return;
    }
    if (/(^|\s)@(everyone|here)\b/i.test(text) && !memberHasPerm(server, me().id, "mentionEveryone")) {
      toast("You don't have permission to mention everyone.", "error");
      return;
    }
    const roleMentioned = server.roles.some((role) => new RegExp(`(^|\\s)@${escapeRegExp(role.name)}\\b`, "i").test(text));
    if (roleMentioned && !memberHasPerm(server, me().id, "mentionEveryone")) {
      toast("You don't have permission to mention roles.", "error");
      return;
    }
    const blocked = channel.readOnly && !memberHasPerm(server, me().id, "manageChannels") && !memberHasPerm(server, me().id, "manageMessages");
    if (blocked) {
      toast("You don't have permission to post here.", "error");
      return;
    }
    const message = {
      id: uid("m"),
      authorId: me().id,
      text: text.slice(0, 2000),
      createdAt: new Date().toISOString(),
      attachment: pendingAttachment || undefined,
      replyTo: replyTarget ? { id: replyTarget.id, authorId: replyTarget.authorId, text: replyTarget.text } : undefined
    };
    context.messages.push(message);
    markRead(channel.id);
    replyTarget = null;
    pendingAttachment = null;
    delete drafts[`ch:${channel.id}`];
    input.value = "";
    autoGrow(input);
    awardChatShards();
    commitWorld({ render: false });
    renderApp({ scroll: true });
    return;
  }

  if (context.type === "dm") {
    const { dm } = context;
    const message = {
      id: uid("m"),
      authorId: me().id,
      text: text.slice(0, 2000),
      createdAt: new Date().toISOString(),
      attachment: pendingAttachment || undefined,
      replyTo: replyTarget ? { id: replyTarget.id, authorId: replyTarget.authorId, text: replyTarget.text } : undefined
    };
    dm.messages.push(message);
    markRead(dm.id);
    replyTarget = null;
    pendingAttachment = null;
    delete drafts[`dm:${dm.id}`];
    input.value = "";
    autoGrow(input);
    awardChatShards();
    commitWorld({ render: false });
    renderApp({ scroll: true });
  }
}

function findActiveMessage(messageId) {
  const context = currentMessageContext();
  if (!context) return null;
  return context.messages.find((message) => message.id === messageId) || null;
}

function refreshChat({ scroll = false } = {}) {
  const scroller = $("#messageScroller");
  const top = scroller?.scrollTop || 0;
  renderApp();
  const next = $("#messageScroller");
  if (next) next.scrollTop = scroll ? next.scrollHeight : top;
}

function setReplyTarget(messageId) {
  const message = findActiveMessage(messageId);
  if (!message) return;
  const author = getUser(message.authorId);
  replyTarget = {
    id: message.id,
    authorId: message.authorId,
    authorName: author.name,
    text: message.text || "image"
  };
  saveDraft();
  refreshChat();
  window.setTimeout(focusComposer, 40);
}

function toggleReaction(messageId, emoji) {
  const message = findActiveMessage(messageId);
  if (!message || !emoji) return;
  const context = currentMessageContext();
  if (context?.type === "channel" && !memberHasPerm(context.server, me().id, "addReactions")) {
    toast("You don't have permission to react here.", "error");
    return;
  }
  message.reactions ||= [];
  const existing = message.reactions.find((reaction) => reaction.emoji === emoji);
  if (existing) {
    existing.users ||= [];
    if (existing.users.includes(me().id)) {
      existing.users = existing.users.filter((id) => id !== me().id);
    } else {
      existing.users.push(me().id);
    }
    if (!existing.users.length) message.reactions = message.reactions.filter((reaction) => reaction !== existing);
  } else {
    message.reactions.push({ emoji, users: [me().id] });
  }
  commitWorld({ render: false });
  refreshChat();
}

function pinMessage(messageId) {
  const context = currentMessageContext();
  const message = findActiveMessage(messageId);
  if (!context || context.type !== "channel" || !message) return;
  if (!memberHasPerm(context.server, me().id, "pinMessages")) {
    toast("You don't have permission to pin messages here.", "error");
    return;
  }
  message.pinned = !message.pinned;
  commitWorld({ render: false });
  refreshChat();
  toast(message.pinned ? "Message pinned." : "Message unpinned.");
}

function copyMessage(messageId) {
  const message = findActiveMessage(messageId);
  if (!message) return;
  const text = message.text || message.attachment?.url || "";
  navigator.clipboard?.writeText(text).then(() => toast("Message copied.")).catch(() => toast("Could not copy message.", "error"));
}

function deleteMessage(messageId) {
  const context = currentMessageContext();
  const message = findActiveMessage(messageId);
  if (!context || !message) return;
  const isMod = context.type === "channel" ? memberHasPerm(context.server, me().id, "manageMessages") : false;
  const proceed = () => {
    if (context.type === "channel") {
      world.messages[context.channel.id] = context.messages.filter((item) => item.id !== messageId);
    } else {
      context.dm.messages = context.dm.messages.filter((item) => item.id !== messageId);
    }
    commitWorld({ render: false });
    refreshChat();
    toast("Message deleted.");
  };
  if (message.authorId === me().id) {
    proceed();
    return;
  }
  if (!isMod) return;
  confirmDialog({ title: "Delete this message?", message: "You're deleting someone else's message as a moderator.", confirmLabel: "Delete", danger: true }).then((ok) => { if (ok) proceed(); });
}

function insertEmojiIntoComposer(emoji) {
  const input = $("#messageInput");
  if (!input) return;
  const start = input.selectionStart || input.value.length;
  const end = input.selectionEnd || input.value.length;
  input.value = `${input.value.slice(0, start)}${emoji}${input.value.slice(end)}`;
  input.selectionStart = input.selectionEnd = start + emoji.length;
  const key = currentDraftKey();
  if (key) drafts[key] = input.value;
  autoGrow(input);
  input.focus();
}

function attachImageToComposer() {
  const context = currentMessageContext();
  if (context?.type === "channel" && !memberHasPerm(context.server, me().id, "attachFiles")) {
    toast("You don't have permission to attach files here.", "error");
    return;
  }
  chooseImage((dataUrl, name) => {
    pendingAttachment = { url: dataUrl, name: name || "image.jpg" };
    saveDraft();
    refreshChat();
    window.setTimeout(focusComposer, 50);
    toast("Image attached. Hit send when ready.");
  }, 1200);
}

function markAllRead({ close = true, silent = false } = {}) {
  const now = Date.now();
  const reads = getReads();
  world.servers.forEach((server) => {
    server.categories.forEach((category) => {
      category.channels.forEach((channel) => {
        if (channel.type === "text") reads[channel.id] = now;
      });
    });
  });
  Object.values(world.dms).forEach((dm) => { reads[dm.id] = now; });
  prefs.notificationsReadAt = now;
  savePrefs();
  commitWorld({ render: false });
  if (close) closeModal();
  renderApp();
  if (!silent) toast("Everything marked as read.");
}

/* ---------- Voice actions ---------- */

async function handleJoinVoice(channelId) {
  setMobileNav(false);
  await joinVoice(channelId);
}

/* ---------- World sync + bus ---------- */

function hydrateWorldShape(parsed) {
  if (!parsed || typeof parsed !== "object") return null;
  parsed.messages ||= {};
  parsed.dms ||= {};
  parsed.decorations ||= [];
  parsed.submissions ||= [];
  parsed.friendIds ||= [];
  parsed.friendRequests ||= [];
  parsed.reads ||= {};
  parsed.reports ||= [];
  return parsed;
}

function syncWorldFromStorage({ force = false, render = true } = {}) {
  let parsed = null;
  try {
    const raw = localStorage.getItem(WORLD_KEY);
    if (!raw) return false;
    parsed = hydrateWorldShape(JSON.parse(raw));
  } catch (error) {
    console.warn("World sync failed:", error);
    return false;
  }
  if (!parsed || parsed.version !== 3 || !Array.isArray(parsed.servers)) return false;
  if (!force && (parsed.rev || 0) <= (world.rev || 0)) return false;
  const scroller = $("#messageScroller");
  const top = scroller?.scrollTop ?? null;
  world = parsed;
  if (!world.servers.some((server) => server.id === ui.activeServer)) {
    ui.activeServer = world.servers[0]?.id || null;
    ui.view = ui.activeServer ? ui.view : "home";
  }
  if (ui.view === "server") {
    const server = getServer(ui.activeServer);
    const channels = server?.categories.flatMap((category) => category.channels) || [];
    if (!channels.some((channel) => channel.id === ui.activeChannels[ui.activeServer])) {
      ui.activeChannels[ui.activeServer] = channels[0]?.id || null;
    }
  }
  if (ui.activeDM && !world.dms[ui.activeDM]) ui.activeDM = null;
  if (!world.users[session.userId]) {
    session = { ...session, userId: world.ownerId };
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch { /* ignore */ }
  }
  if (render) {
    renderApp();
    const next = $("#messageScroller");
    if (next && top != null) next.scrollTop = top;
  }
  return true;
}

function setupBus() {
  try {
    bus = new BroadcastChannel(BUS_NAME);
    bus.onmessage = handleBusMessage;
  } catch (error) {
    console.warn("BroadcastChannel unavailable:", error);
    bus = null;
  }
  window.addEventListener("storage", (event) => {
    if (event.key === WORLD_KEY) syncWorldFromStorage();
    if (event.key === PRESENCE_KEY) {
      presence = readPresence();
      prunePresence(presence);
      if (ui.view === "server") renderMembersOnly();
      syncVoicePeers();
    }
  });
}

function handleBusMessage(event) {
  const message = event.data;
  if (!message || !session) return;
  if (message.type === "world" && message.sender !== session.sessionId) {
    syncWorldFromStorage();
    return;
  }
  if (message.type === "presence" && message.entry) {
    const entry = message.entry;
    if (!entry.sessionId || entry.sessionId === session.sessionId) return;
    presence[entry.sessionId] = entry;
    if (!world.users[entry.userId]) syncWorldFromStorage({ force: true });
    if (ui.view === "server") renderMembersOnly();
    syncVoicePeers();
    return;
  }
  if (message.type === "presence-leave" && message.sessionId) {
    delete presence[message.sessionId];
    closeVoicePeer(message.sessionId);
    if (ui.view === "server") renderMembersOnly();
    syncVoicePeers();
    return;
  }
  if (message.type === "voice-signal") {
    handleVoiceSignal(message);
  }
}

/* ---------- Mobile drawers ---------- */

function setMobileNav(open) {
  document.body.classList.toggle("mobile-nav-open", Boolean(open));
  const scrim = $("#mobileScrim");
  if (scrim) scrim.hidden = !open;
}

/* ---------- Action dispatch ---------- */

function runAction(action, element, event) {
  switch (action) {
    case "open-search": openSearch(); return;
    case "open-mobile-nav": setMobileNav(true); return;
    case "open-settings": closeModal(); openSettings("appearance"); return;
    case "open-appearance": closeModal(); openAppearance(); return;
    case "open-profile-editor": closeModal(); openProfileEditor(); return;
    case "open-self-panel": openSelfPanel(); return;
    case "self-view-profile": openProfile(me().id); return;
    case "self-leaderboards": closeModal(); openSettings("leaderboards"); return;
    case "self-keybinds": closeModal(); openSettings("keybinds"); return;
    case "self-switch-account": {
      confirmDialog({
        title: "Switch accounts",
        message: "Sign out of Nodum on this device? You can sign back in as anyone.",
        confirmLabel: "Sign out",
        danger: true
      }).then((confirmed) => {
        if (confirmed) signOut();
      });
      return;
    }
    case "open-badges": closeModal(); openBadgeCollection(); return;
    case "open-studio": closeModal(); openDecorationStudio(); return;
    case "open-modqueue": closeModal(); openModerationQueue(); return;
    case "open-notifications": openNotifications(); return;
    case "open-friends": closeModal(); goFriends("online"); setMobileNav(false); return;
    case "open-members": openMembersModal(); return;
    case "open-pins": openPins(); return;
    case "open-dm": closeModal(); goHome(element.dataset.dmId || element.dataset.dm); setMobileNav(false); return;
    case "server-settings": openServerSettings(element.dataset.serverId || ui.activeServer); return;
    case "discover": closeModal(); openDiscover(); return;
    case "create-server": closeModal(); openCreateServer(); return;
    case "create-server-submit": createServerFromForm(); return;
    case "friend-tab": ui.friendTab = element.dataset.tab || "online"; saveUi(); renderApp(); return;
    case "add-friend": closeModal(); openAddFriend(); return;
    case "send-friend-request": openAddFriendFromQuery(); return;
    case "add-suggestion": addFriend(element.dataset.userId); return;
    case "accept-friend": acceptFriend(element.dataset.userId); return;
    case "ignore-friend": ignoreFriend(element.dataset.userId); return;
    case "block-user": blockUser(element.dataset.userId); return;
    case "unblock-user": unblockUser(element.dataset.userId); return;
    case "message-user": closeModal(); openDmWith(element.dataset.userId); setMobileNav(false); return;
    case "profile-more":
    case "friend-more": openFriendMore(element.dataset.userId, event); return;
    case "collapse-category": {
      const id = element.dataset.categoryId;
      ui.collapsedCategories[id] = !ui.collapsedCategories[id];
      saveUi();
      renderSidebar();
      return;
    }
    case "send-message": sendMessage(); return;
    case "attach-image": attachImageToComposer(); return;
    case "remove-attachment": pendingAttachment = null; saveDraft(); refreshChat(); return;
    case "cancel-reply": replyTarget = null; saveDraft(); refreshChat(); window.setTimeout(focusComposer, 40); return;
    case "insert-emoji": openEmojiPopover(element, insertEmojiIntoComposer); return;
    case "reply-message": setReplyTarget(element.dataset.messageId); return;
    case "quick-reaction": openEmojiPopover(element, (emoji) => toggleReaction(element.dataset.messageId, emoji)); return;
    case "react-message": toggleReaction(element.dataset.messageId, element.dataset.emoji); return;
    case "pin-message": pinMessage(element.dataset.messageId); return;
    case "copy-message": copyMessage(element.dataset.messageId); return;
    case "delete-message": deleteMessage(element.dataset.messageId); return;
    case "toggle-members": {
      const panel = $(".members-panel");
      const hidden = panel?.classList.toggle("is-hidden");
      $("#mainPanel")?.classList.toggle("members-hidden", Boolean(hidden));
      return;
    }
    case "jump-message": jumpToMessage(element.dataset.channelId, element.dataset.messageId); return;
    case "join-voice": handleJoinVoice(element.dataset.channelId); return;
    case "leave-voice": leaveVoice(); return;
    case "toggle-mute": toggleMute(); return;
    case "toggle-deafen": toggleDeafen(); return;
    case "copy-invite": copyInvite(element.dataset.serverId || ui.activeServer); return;
    case "save-profile": saveProfileDraft(); return;
    case "manage-badges": openBadgeManager(element.dataset.userId); return;
    case "save-badges": saveBadgeGrants(element.dataset.userId); return;
    case "sign-out": signOut(); return;
    case "submit-decoration": submitDecoration(); return;
    case "upload-deco-image": chooseDecorationFile((dataUrl, name) => {
      studioDraft ||= { name: "", style: "halo", colorA: "#ffd166", colorB: "#ff8a3d", icon: "✦", speed: 7, image: "", price: 0 };
      studioDraft.image = dataUrl;
      if (!studioDraft.name && name) studioDraft.name = name.replace(/\.[a-z0-9]+$/i, "").slice(0, 28);
      openDecorationStudio();
      toast("Decoration auto-fitted to the avatar.", "success");
    }); return;
    case "clear-deco-image": if (studioDraft) studioDraft.image = ""; openDecorationStudio(); return;
    case "buy-decoration": buyDecoration(element.dataset.decorationId); return;
    case "price-decoration": priceDecoration(element.dataset.decorationId); return;
    case "boost-server": boostServer(element.dataset.serverId || ui.activeServer); return;
    case "submit-plus-order": submitPlusOrder(); return;
    case "open-staff-apps": closeModal(); openSettings("staff-apps"); return;
    case "open-plus-orders": closeModal(); openSettings("plus-orders"); return;
    case "delete-decoration": deleteSubmission(element.dataset.submissionId); return;
    case "approve-submission": approveSubmission(element.dataset.submissionId); return;
    case "reject-submission": rejectSubmission(element.dataset.submissionId); return;
    case "save-server": saveServerSettings(); return;
    case "create-role": openRoleEditor(element.dataset.serverId || settingsDraft?.serverId || ui.activeServer); return;
    case "edit-role": openRoleEditor(settingsDraft?.serverId || ui.activeServer, element.dataset.roleId); return;
    case "delete-role": deleteRole(settingsDraft?.serverId || ui.activeServer, element.dataset.roleId); return;
    case "save-role": saveRole(element.dataset.serverId || settingsDraft?.serverId, element.dataset.roleId || null); return;
    case "create-channel": openChannelEditor(element.dataset.serverId || settingsDraft?.serverId || ui.activeServer, element.dataset.categoryId || null); return;
    case "edit-channel": {
      const found = findChannel(element.dataset.channelId);
      if (found) openChannelEditor(found.server.id, found.category.id, found.channel.id);
      return;
    }
    case "delete-channel": deleteChannel(element.dataset.channelId); return;
    case "save-channel": saveChannel(element.dataset.serverId || settingsDraft?.serverId, element.dataset.channelId || null); return;
    case "manage-member-roles": openMemberRoles(settingsDraft?.serverId || ui.activeServer, element.dataset.userId); return;
    case "save-member-roles": saveMemberRoles(element.dataset.serverId || settingsDraft?.serverId, element.dataset.userId); return;
    case "kick-member": removeServerMember(element.dataset.serverId || settingsDraft?.serverId, element.dataset.userId, { ban: false }); return;
    case "ban-member": removeServerMember(element.dataset.serverId || settingsDraft?.serverId, element.dataset.userId, { ban: true }); return;
    case "delete-server": deleteServer(settingsDraft?.serverId || ui.activeServer); return;
    case "leave-server": leaveServer(settingsDraft?.serverId || ui.activeServer); return;
    case "join-server": joinServer(element.dataset.serverId); return;
    case "join-by-code": joinByCode(); return;
    case "upload-server-banner": {
      const server = getServer(settingsDraft?.serverId || ui.activeServer);
      chooseCroppedImage({
        aspect: 3,
        outputWidth: 1600,
        shape: "square",
        title: "Crop the community banner",
        subtitle: "Wide images look best. Drag and zoom to frame the part you want.",
        applyLabel: "Use banner"
      }, (dataUrl) => {
        server.banner = { type: "image", value: dataUrl };
        commitWorld({ render: false });
        openServerSettings(server.id, settingsDraft?.tab || "overview");
        toast("Community banner updated.");
      });
      return;
    }
    case "upload-server-icon": {
      const server = getServer(settingsDraft?.serverId || ui.activeServer);
      chooseCroppedImage({
        aspect: 1,
        outputWidth: 512,
        shape: "square",
        title: "Crop the community logo",
        subtitle: "Square images work best. Drag and zoom to center the logo.",
        applyLabel: "Use logo"
      }, (dataUrl) => {
        server.icon = { type: "image", value: dataUrl };
        commitWorld({ render: false });
        openServerSettings(server.id, settingsDraft?.tab || "overview");
        toast("Community logo updated.");
      });
      return;
    }
    case "mark-all-read": markAllRead(); return;
    case "test-mic": testMic(); return;
    case "export-data": exportData(); return;
    case "reset-world": resetWorld(); return;
    default:
      console.warn("Unknown action:", action);
  }
}

/* ---------- Events ---------- */

function bindEvents() {
  document.addEventListener("click", (event) => {
    const mentionOption = event.target.closest("[data-mention-index]");
    if (mentionOption) {
      event.preventDefault();
      applyMention(Number(mentionOption.dataset.mentionIndex));
      return;
    }
    if (!event.target.closest("#mentionPopover") && event.target.id !== "messageInput") hideMentionPopover();
    if (!event.target.closest("#emojiPopover") && !event.target.closest('[data-action="insert-emoji"]') && !event.target.closest('[data-action="quick-reaction"]')) {
      const popover = $("#emojiPopover");
      if (popover) popover.hidden = true;
    }
    if (!event.target.closest("#contextMenu")) hideContextMenu();

    const actionElement = event.target.closest("[data-action]");
    if (actionElement) {
      event.preventDefault();
      event.stopPropagation();
      runAction(actionElement.dataset.action, actionElement, event);
      return;
    }

    const searchResult = event.target.closest("[data-search-action]");
    if (searchResult) {
      event.preventDefault();
      handleSearchResult(searchResult);
      return;
    }

    const profileTarget = event.target.closest("[data-profile]");
    if (profileTarget) {
      event.preventDefault();
      openProfile(profileTarget.dataset.profile);
      return;
    }

    const dmTarget = event.target.closest("[data-dm]");
    if (dmTarget) {
      event.preventDefault();
      goHome(dmTarget.dataset.dm);
      setMobileNav(false);
      return;
    }

    const dmUser = event.target.closest("[data-dm-user]");
    if (dmUser) {
      event.preventDefault();
      openDmWith(dmUser.dataset.dmUser);
      setMobileNav(false);
      return;
    }

    const channelTarget = event.target.closest("[data-channel]");
    if (channelTarget) {
      event.preventDefault();
      goChannel(channelTarget.dataset.channel);
      setMobileNav(false);
      return;
    }

    const serverTarget = event.target.closest("[data-server]");
    if (serverTarget) {
      event.preventDefault();
      goServer(serverTarget.dataset.server);
      setMobileNav(false);
      return;
    }

    const friendRow = event.target.closest(".friend-row[data-profile]");
    if (friendRow) openProfile(friendRow.dataset.profile);
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "messageInput") {
      const key = currentDraftKey();
      if (key) drafts[key] = event.target.value;
      autoGrow(event.target);
      updateMentionPopover(event.target);
    }
    if (event.target.matches("[data-friend-search]")) {
      const query = event.target.value.trim().toLowerCase();
      const rows = Array.from(document.querySelectorAll("[data-friend-row]"));
      rows.forEach((row) => {
        const haystack = row.dataset.search || row.textContent.toLowerCase();
        row.hidden = Boolean(query) && !haystack.includes(query);
      });
      const emptyEl = document.querySelector("[data-friend-empty]");
      if (emptyEl) {
        const noMatches = Boolean(query) && rows.length > 0 && rows.every((row) => row.hidden);
        emptyEl.hidden = !noMatches;
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    const input = event.target;
    if (input?.id === "messageInput" && mentionState) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const delta = event.key === "ArrowDown" ? 1 : -1;
        mentionState.index = (mentionState.index + delta + mentionState.items.length) % mentionState.items.length;
        renderMentionPopover();
        return;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        applyMention(mentionState.index);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        hideMentionPopover();
        return;
      }
    }
    if (input?.id === "messageInput" && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
      return;
    }
    if (eventMatchesKeybind(event, prefs?.keybinds?.search || "Ctrl+K")) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (eventMatchesKeybind(event, prefs?.keybinds?.mute || "Ctrl+Shift+M")) {
      event.preventDefault();
      toggleMute();
      return;
    }
    if (eventMatchesKeybind(event, prefs?.keybinds?.settings || "Ctrl+,")) {
      event.preventDefault();
      openSettings("appearance");
      return;
    }
    if (event.key === "Escape") {
      hideContextMenu();
      const popover = $("#emojiPopover");
      if (popover) popover.hidden = true;
      if (document.body.classList.contains("mobile-nav-open")) setMobileNav(false);
    }
  });

  const direct = {
    homeBtn: () => goHome(),
    railHomeBtn: () => goHome(),
    globalSearchBtn: () => openSearch(),
    notificationsBtn: () => openNotifications(),
    messagesTopBtn: () => goFriends("online"),
    friendsTopBtn: () => goFriends("online"),
    badgesTopBtn: () => openBadgeCollection(),
    studioTopBtn: () => openDecorationStudio(),
    appearanceTopBtn: () => openAppearance(),
    topProfileBtn: () => openSelfPanel({ anchor: "topbar" }),
    addServerBtn: () => openCreateServer(),
    discoverBtn: () => openDiscover(),
    studioRailBtn: () => openDecorationStudio(),
    settingsRailBtn: () => openSettings(),
    mobileMenuBtn: () => setMobileNav(true),
    mobileScrim: () => setMobileNav(false)
  };
  Object.entries(direct).forEach(([id, handler]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", handler);
  });

  window.addEventListener("beforeunload", () => {
    cleanupVoice();
    if (!session) return;
    const map = readPresence();
    delete map[session.sessionId];
    try { localStorage.setItem(PRESENCE_KEY, JSON.stringify(map)); } catch { /* ignore */ }
    try { bus?.postMessage({ type: "presence-leave", sessionId: session.sessionId }); } catch { /* ignore */ }
  });

  window.addEventListener("resize", debounce(() => {
    const popover = $("#emojiPopover");
    if (popover) popover.hidden = true;
  }, 180));
}

/* ---------- Boot ---------- */

function startApp({ welcome = false } = {}) {
  hydrateIcons(document);
  setupBus();
  bindEvents();
  syncUserEconomy();
  renderApp({ scroll: true });
  startHeartbeat();
  registerPresence();
  updateTopbarBadges();
  const frame = $("#appFrame");
  const screen = $("#authScreen");
  if (frame) frame.hidden = false;
  if (screen) screen.hidden = true;
  if (welcome) {
    const isOwner = session?.userId === world.ownerId;
    window.setTimeout(() => toast(isOwner ? "Welcome back, owner. Everything is free here." : `Signed in as ${me().name}.`, "success"), 700);
  }
}

function boot() {
  if (isBooting) return;
  isBooting = true;
  try {
    installEmojiSpacing();
    prefs = loadPrefs();
    applyPrefs();
    world = loadWorld();
    ui = loadUi();
    if (!world.servers.some((server) => server.id === ui.activeServer)) ui.activeServer = world.servers[0]?.id || null;
    if (!ui.activeServer) ui.view = "home";
    bindAuthScreen();
    session = getStoredSession();
    if (!session) {
      showAuthScreen();
      isBooting = false;
      return;
    }
    startApp({ welcome: true });
    isBooting = false;
  } catch (error) {
    isBooting = false;
    console.error("Nodum failed to boot:", error);
    const main = $("#mainContent");
    if (main) {
      main.innerHTML = `<div class="empty-yap"><span class="empty-emoji">😵</span><h3>Something went sideways</h3><p>${escapeHtml(error.message || "Unknown error")}</p><button class="primary-btn" type="button" onclick="location.reload()">Reload</button></div>`;
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}