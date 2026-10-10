// Minimal PNG encoder: 8- or 16-bit, grayscale or RGB.
// Writes pHYs so the image carries its physical size, plus tEXt metadata.
// Uses CompressionStream('deflate') (zlib), available in browsers and Node 18+.

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

async function zlib(bytes) {
  const cs = new CompressionStream('deflate');
  const stream = new Blob([bytes]).stream().pipeThrough(cs);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

const latin1 = (s) => Uint8Array.from(s, (ch) => ch.charCodeAt(0) & 0xff);

// samples: Uint16Array (bitDepth 16) or Uint8Array (bitDepth 8), row-major, channels interleaved.
export async function encodePNG({ width, height, channels = 1, bitDepth = 16, samples, pxPerMm, text = {} }) {
  const bpp = channels * (bitDepth / 8);
  const stride = width * bpp;
  const raw = new Uint8Array((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (stride + 1);
    raw[row] = 0; // filter: none
    for (let x = 0; x < width * channels; x++) {
      const v = samples[y * width * channels + x];
      if (bitDepth === 16) {
        raw[row + 1 + x * 2] = v >>> 8;
        raw[row + 2 + x * 2] = v & 0xff;
      } else raw[row + 1 + x] = v;
    }
  }
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, width);
  dv.setUint32(4, height);
  ihdr[8] = bitDepth;
  ihdr[9] = channels === 3 ? 2 : channels === 4 ? 6 : 0;
  const parts = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr)];
  if (pxPerMm) {
    const phys = new Uint8Array(9);
    const pv = new DataView(phys.buffer);
    const ppm = Math.round(pxPerMm * 1000);
    pv.setUint32(0, ppm);
    pv.setUint32(4, ppm);
    phys[8] = 1; // unit: metre
    parts.push(chunk('pHYs', phys));
  }
  for (const [k, v] of Object.entries(text)) parts.push(chunk('tEXt', latin1(`${k}\0${v}`)));
  parts.push(chunk('IDAT', await zlib(raw)));
  parts.push(chunk('IEND', new Uint8Array(0)));
  const total = parts.reduce((s, p) => s + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
