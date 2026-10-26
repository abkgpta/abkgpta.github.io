# Daily: design notes

This is the direction for abkgpta.github.io/daily. Each main choice has a one-line reason. If you change a choice, change its reason here too.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1. It's a personal dashboard you read every morning. It should feel like Abhik's, but it's a working screen, not a showpiece.

## Identity

- **Type: Michroma for display, IBM Plex Mono for text.** These are the portfolio.27 brand faces. Michroma's wide, extended shapes carry the industrial-design voice. Plex Mono is the brand body face (chosen 15 Oct 2026), kept on purpose even though tasteskill prefers no mono outside code.
- **Colour: black, cream #f7f2ef and pink #fb0068.** These are the brand palette. Light mode runs from 7 AM to 7 PM and dark mode outside those hours, with a toggle for Auto, Light or Dark.
- **Pink means "act" or "live".** It's used on the Go button, the GUPTA half of the wordmark, the Now playing dot and bar, focus rings and hovers. On cream, small pink text uses `--accent-ink` (#c8005a, 5.2:1), because #fb0068 only reaches 3.6:1 there.
- **The 3D ABK badge is the one signature element.** The header has room for it on every width.

## Structure

- **Four zones (You, Today, News, Industry) in the order of a morning.** Personal first, then the idea of the day, then the world.
- **Zones are named, not numbered.** Their order already shows in the jump bar and the scroll.
- **Panels only in the You zone.** Those are separate personal feeds. Everything else is lists with rules.
- **Cards keep their own height** (`align-items: start`), so a short panel never sits on a blank band.
- **Borders whisper.** Panel edges and row rules are about 10–14% ink, solid. The zone band rule is the only stronger line.
- **Figures are tabular,** and money is right-aligned in tables.

## Type rules

- Section titles are in sentence case in Michroma, with no tracking and no uppercase labels.
- There are no em dashes in the UI. Empty cells show a grey "-".

## States

- News shows "Loading today's stories…" until data.js arrives. If data.js fails, it shows "Couldn't load today's page." with Try again. If NEWS is empty, it shows "No stories today yet."
- Blocks with no data stay hidden (Listening, Running, Calendar and so on), and the Reading list explains how to save.
- Weather fails silently, because it's a nice-to-have.

## Motion

- Hover and focus feedback, plus the pulsing Now playing dot (it stops under reduced motion).
- No ambient effects. The old breathing edge glow was removed in the 26 Oct 2026 audit.

## Data

- All sections are public. Encryption was removed in a5a8416, and the passphrase code was deleted in the 26 Oct 2026 audit.
- Permanent config (DISCORD_ID, the weather place fallback) lives in index.html. data.js is rewritten every morning.
