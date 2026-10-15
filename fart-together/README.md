# Fart Together

A co-op party game for 1–4 players. Everyone sits in the same little boat and
steers it upstream by farting. Your fart pushes the boat away from where your
bum points, and from where you sit, so players on the sides turn the boat.
Dodge rocks, escape whirlpools, eat beans to refill everyone's gas, and reach
the finish as fast as you can.

## Play on your LAN

Needs [Node.js](https://nodejs.org) 18 or newer. There is nothing to install.

```sh
cd fart-together
node server.js          # or: node server.js 3000  to pick a port
```

The server prints addresses like `http://192.168.1.23:8080`. Everyone on the
same Wi-Fi opens that address in a browser (phones work too, with on-screen
buttons), types a name and joins. The first four players get seats, and anyone
after that watches. Anyone can press **Start race**.

If friends can't connect, allow Node through your computer's firewall for
private networks.

## Play on one keyboard

Open `index.html` directly (or the GitHub Pages copy). When no server is found,
the game runs in the browser and up to four people can share a keyboard:

| Player | Aim bum | Fart |
|---|---|---|
| P1 | `A` `D` | `W` / `Space` |
| P2 | `←` `→` | `↑` |
| P3 | `J` `L` | `I` |
| P4 | numpad `4` `6` | numpad `8` |

Other keys: `R` goes back to the last checkpoint, `Enter` starts, `M` mutes,
and `Tab` toggles the menu.

## Files

- `game.js` holds the shared physics and river generator. It runs on the server and in the browser.
- `server.js` is the zero-dependency HTTP and WebSocket server. It runs the game at 60 Hz.
- `client.js` handles rendering, input and the synthesised fart sounds.
