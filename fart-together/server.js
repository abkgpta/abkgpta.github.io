#!/usr/bin/env node
// Fart Together LAN server. No dependencies: `node server.js [port]`, then open the
// printed address on every device on the same network.
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const Game = require('./game.js');

const PORT = Number(process.argv[2] || process.env.PORT || 8080);
const FILES = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/client.js': ['client.js', 'text/javascript; charset=utf-8'],
  '/game.js': ['game.js', 'text/javascript; charset=utf-8'],
};

const server = http.createServer((req, res) => {
  const entry = FILES[req.url.split('?')[0]];
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  fs.readFile(path.join(__dirname, entry[0]), (err, data) => {
    if (err) { res.writeHead(500); res.end(); return; }
    res.writeHead(200, { 'Content-Type': entry[1], 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

// --- Minimal WebSocket (RFC 6455): text frames, ping/pong, close. ---

function encodeFrame(str, opcode = 1) {
  const payload = Buffer.from(str);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x80 | opcode, payload.length]);
  } else if (payload.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode; header[1] = 126; header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode; header[1] = 127; header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  return Buffer.concat([header, payload]);
}

const clients = new Map();
let nextId = 1;
const game = Game.createGame((Math.random() * 2 ** 32) >>> 0);

server.on('upgrade', (req, socket) => {
  const key = req.headers['sec-websocket-key'];
  if (!key || String(req.headers.upgrade).toLowerCase() !== 'websocket') { socket.destroy(); return; }
  const accept = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n' +
    'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  socket.setNoDelay(true);

  const id = 'p' + nextId++;
  const client = { id, socket, joined: false };
  clients.set(id, client);
  socket.write(encodeFrame(JSON.stringify({ t: 'welcome', id })));

  let buf = Buffer.alloc(0);
  socket.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    while (buf.length >= 2) {
      const opcode = buf[0] & 0x0f;
      const masked = buf[1] & 0x80;
      let len = buf[1] & 0x7f, off = 2;
      if (len === 126) { if (buf.length < 4) return; len = buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (buf.length < 10) return; len = Number(buf.readBigUInt64BE(2)); off = 10; }
      if (len > 65536) { socket.destroy(); return; }
      const maskAt = off;
      if (masked) off += 4;
      if (buf.length < off + len) return;
      const payload = Buffer.from(buf.subarray(off, off + len));
      if (masked) for (let i = 0; i < payload.length; i++) payload[i] ^= buf[maskAt + (i & 3)];
      buf = buf.subarray(off + len);
      if (opcode === 8) { socket.end(encodeFrame('', 8)); return; }
      if (opcode === 9) socket.write(encodeFrame(payload.toString(), 10));
      if (opcode === 1) onMessage(client, payload.toString());
    }
  });
  const drop = () => {
    if (!clients.has(id)) return;
    clients.delete(id);
    if (client.joined) {
      Game.removePlayer(game, id);
      console.log(`- ${client.name} left (${game.players.length} playing)`);
      if (!game.players.length) Game.toLobby(game);
    }
  };
  socket.on('close', drop);
  socket.on('error', drop);
});

function onMessage(client, text) {
  let msg;
  try { msg = JSON.parse(text); } catch { return; }
  switch (msg.t) {
    case 'join':
      if (client.joined) return;
      client.joined = true;
      client.name = String(msg.name || 'Player').slice(0, 16);
      Game.addPlayer(game, client.id, client.name);
      console.log(`+ ${client.name} joined (${game.players.length} playing)`);
      break;
    case 'input': Game.setInput(game, client.id, msg); break;
    case 'start': Game.startRace(game); break;
    case 'respawn': Game.respawn(game); break;
    case 'lobby': Game.toLobby(game); break;
    case 'newriver':
      if (game.phase === 'lobby') Game.setSeed(game, (Math.random() * 2 ** 32) >>> 0);
      break;
  }
}

// --- Game loop: 60 Hz physics, 30 Hz state broadcast. ---

const DT = 1 / 60;
let acc = 0, last = process.hrtime.bigint(), tick = 0;
setInterval(() => {
  const now = process.hrtime.bigint();
  acc += Math.min(0.25, Number(now - last) / 1e9);
  last = now;
  while (acc >= DT) {
    Game.step(game, DT);
    acc -= DT;
    if (++tick % 2 === 0) {
      const frame = encodeFrame(JSON.stringify({ t: 'state', s: Game.snapshot(game) }));
      for (const c of clients.values()) if (!c.socket.destroyed) c.socket.write(frame);
    }
  }
}, 8);

server.listen(PORT, '0.0.0.0', () => {
  console.log('Fart Together server running. Friends on your network can open:');
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list || []) if (a.family === 'IPv4' && !a.internal) console.log(`  http://${a.address}:${PORT}`);
  }
  console.log(`  http://localhost:${PORT}  (this computer)`);
});
