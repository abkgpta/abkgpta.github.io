// Decrypts PRIVATE from a data.js file and prints the JSON.
// Usage: node daily/tools/unseal.mjs <passphrase> <data.js>
import { readFileSync } from "node:fs";
import { webcrypto as wc } from "node:crypto";
const [pass, file] = process.argv.slice(2);
if (!pass || !file) { console.error("usage: unseal.mjs <passphrase> <data.js>"); process.exit(1); }
const m = readFileSync(file, "utf8").match(/const PRIVATE = (\{.*\});/);
if (!m) { console.log("{}"); process.exit(0); }
const s = JSON.parse(m[1]), b = x => Uint8Array.from(Buffer.from(x, "base64"));
const base = await wc.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await wc.subtle.deriveKey({ name: "PBKDF2", salt: b(s.salt), iterations: s.iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
console.log(new TextDecoder().decode(await wc.subtle.decrypt({ name: "AES-GCM", iv: b(s.iv) }, key, b(s.data))));
