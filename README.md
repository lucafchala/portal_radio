# radio.lucafchala.com

> A community portal for amateur radio — a shared landing page plus one themed profile per operator (callsigns PU2XIK, PU5OEF, PV2KGB…), with live APRS tracking, embedded QRZ logbooks, and a PIX donations page.

**Live:** [radio.lucafchala.com](https://radio.lucafchala.com) · **Stack:** static HTML/CSS/JS served on Cloudflare via `wrangler.jsonc` · **Build step:** none

Part of the [lucafchala.com ecosystem](https://github.com/lucafchala/lucafchala.com#the-ecosystem). The `pu2xik` profile uses the shared design system; the rest are intentionally themed per operator (see [Design](#design)).

---

## What it is

**One sentence:** `radio.lucafchala.com` is a no‑framework static site where each amateur‑radio operator gets a self‑contained, individually‑styled profile page under `/‹callsign›/`, tied together by a shared landing page and a donations page.

**In a paragraph:** The portal centers on people. The landing page (`index.html`) introduces the project and links to operator cards; each operator lives at `/‹callsign›/index.html` with its own `style.css` and its own visual identity. Some profiles are richer than others: PU5OEF pulls **live APRS telemetry** through a separate Cloudflare Worker and plots it on a Leaflet/OpenStreetMap map; every profile embeds that operator's QRZ logbook in an iframe. A `/doacoes/` page lets visitors support the portal via Brazilian **PIX**. There is no backend in this repo, no database, and no build — just files served at the edge.

---

## Architecture

- **Host:** Cloudflare, configured by `wrangler.jsonc` to serve the repository root as **static assets** (`"assets": { "directory": "." }`), with `nodejs_compat` and observability enabled. A push to `main` triggers an automatic deploy.
- **Pages:** the landing page, four operator profiles, a donations page, and a custom `404` — all plain static HTML/CSS/(small)JS.
- **Live APRS (PU5OEF only):** `pu5oef/script.js` fetches from a **separate** Cloudflare Worker (`https://api-key-aprs-pu5oef.lfchala4.workers.dev/`) that proxies [aprs.fi](https://aprs.fi); the page renders last position/speed/altitude and a Leaflet map. That Worker is **not** part of this repo.
- **Third‑party embeds:** QRZ logbooks via `logbook.qrz.com/lbstat/‹CALLSIGN›/` iframes; Leaflet + OSM tiles on the PU5OEF map.
- **No environment variables or secrets** live in this repo. The PIX key on the donations page is a public random‑key UUID.

---

## Site map

| Path | Operator / page | Highlights |
|---|---|---|
| `/` | Landing | Project intro, operator grid, "about" panels, links to GitHub & donations |
| `/pu2xik/` | **Luca F. Chala — PU2XIK** | Bio, gear/interests, QRZ logbook iframe; uses the **shared** amber design system |
| `/pu5oef/` | **Edivaldo Filho — PU5OEF** | **Live APRS** (Worker + Leaflet map), history, gear, logbook; cyan theme |
| `/pv2kgb/` | **Gustavo — PV2KGB** | Station photo, gear, bands & modes, links; blue theme |
| `/pu2xyz/` | **Template** | Heavily‑commented example to copy for a new operator (`[ALTERE AQUI]` markers) |
| `/doacoes/` | **Donations** | PIX modal: account holder, QR image (`/pix-qr.jpg`), copyable random key |
| `/404.html` | Not found | Styled error card linking back to the portal and registered callsigns |

---

## Prerequisites

- A text editor and `git`.
- (Optional) a static server for local preview — `npx serve`, `python3 -m http.server`, or Live Server. Serve from the repo root so absolute paths (`/pix-qr.jpg`, `/style.css`) resolve.
- (Optional, for `wrangler deploy`) **Node.js** + **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**.

No accounts, env vars, or secrets are required to run the site.

## Install & deploy

```bash
git clone https://github.com/lucafchala/portal_radio.git
cd portal_radio
python3 -m http.server 8000        # preview at http://localhost:8000

# deploy: push to main (Cloudflare deploys automatically)
git push origin main
# or deploy directly with the committed config:
npx wrangler deploy
```

### Add an operator

1. Create a folder `‹callsign›/` with an `index.html` (copy `pu2xyz/` — the template — or `pu5oef/`, the most complete).
2. Add a `‹callsign›/style.css` defining that operator's palette (each profile sets its own CSS variables).
3. Replace the `[ALTERE AQUI]` placeholders (meta tags, name, callsign, bio, gear, links).
4. Add a card for them on the landing page, commit, and push.

---

## File structure

```
.
├── wrangler.jsonc        # Cloudflare config — name "portalradio", static assets from ".", nodejs_compat
├── index.html            # Landing page (operator grid, about, links)
├── index.css             # Landing styles — rust (#D97757) on #1F1E1B; Fraunces / Inter / JetBrains Mono
├── style.css             # Global reset shared by all pages (box-sizing only)
├── 404.html              # Error page
├── pix-qr.jpg            # PIX payment QR image (used by /doacoes/)
├── doacoes/              # Donations: index.html + style.css + script.js (PIX modal, copy-to-clipboard)
├── pu2xik/               # PU2XIK profile (+ style.css) — shared amber design system
├── pu5oef/               # PU5OEF profile (+ style.css, script.js, og-image.png) — live APRS + Leaflet map
├── pv2kgb/               # PV2KGB profile (+ style.css, station.jpg) — blue theme
└── pu2xyz/               # Operator template (+ style.css) to copy for new callsigns
```

---

## Design

This portal is **per‑operator themed** — each profile carries its own palette and (sometimes) its own fonts, on purpose:

| Page | Background | Accent | Fonts |
|---|---|---|---|
| Landing + `/doacoes/` | `#1F1E1B` | `#D97757` (rust) | Fraunces + Inter + JetBrains Mono |
| `/pu2xik/` | `#0d0c0a` | `#c08030` (amber) | Cormorant Garamond + JetBrains Mono |
| `/pu5oef/` | `#060810` | `#00E5FF` (cyan) | Cormorant Garamond + JetBrains Mono |
| `/pv2kgb/` | `#06080F` | `#4F9EFF` (blue) | Fraunces + Inter + JetBrains Mono |

Only **`/pu2xik/`** follows the [shared ecosystem design system](https://github.com/lucafchala/lucafchala.com#design-system) (amber on near‑black, Cormorant + JetBrains Mono) — see the hub for its canonical tokens. The new‑operator template (`pu2xyz`) exposes `--accent` so each operator can pick their own color.

---

## Contact

| | |
|---|---|
| Website | [lucafchala.com](https://lucafchala.com) |
| QRZ | [qrz.com/db/PU2XIK](https://www.qrz.com/db/PU2XIK) |
| Email | `pagina.radio@lucafchala.com` |

---

## Status

**In production.** Operator profiles are added by hand (no CMS); the only live/dynamic feature is PU5OEF's APRS feed, which depends on its external Worker.

## License

Content belongs to the respective operators and authors.
