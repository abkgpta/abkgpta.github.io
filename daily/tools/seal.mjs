// Encrypts the private sections of the daily page.
// Usage: node daily/tools/seal.mjs <passphrase> <private.json>
// Prints one line of JavaScript: const PRIVATE = {...};  (paste it into data.js)
// private.json holds { "CALENDAR": [...], "STRAVA": {...}, "MUSIC": {...} } and must never be committed.
import { readFileSync } from "node:fs";
import { webcrypto as wc } from "node:crypto";
const [pass, file] = process.argv.slice(2);
if (!pass || !file) { console.error("usage: seal.mjs <passphrase> <private.json>"); process.exit(1); }
const json = JSON.stringify(JSON.parse(readFileSync(file, "utf8")));
const enc = new TextEncoder(), iter = 250000;
const salt = wc.getRandomValues(new Uint8Array(16)), iv = wc.getRandomValues(new Uint8Array(12));
const base = await wc.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await wc.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const data = new Uint8Array(await wc.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(json)));
const b = u => Buffer.from(u).toString("base64");
console.log("const PRIVATE = " + JSON.stringify({ v: 1, iter, salt: b(salt), iv: b(iv), data: b(data) }) + ";");
