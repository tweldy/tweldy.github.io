# tjweldy.github.io

Personal site for **TJ Weldy** — Data Architect / Data Engineer.

Two ways to read the same content:

- **Landing page** (`index.html`) — a conventional professional page, for
  recruiters and anyone who wants the summary fast.
- **Terminal mode** (`terminal.html`) — the same material behind a command
  prompt, for people who'd rather poke around than scroll.

## Architecture

Deliberately dependency-free: plain HTML, CSS, and vanilla JS, no build step and
nothing to install. Open `index.html` in a browser and it works.

`data.js` is the **single source of truth**. Both renderers read from the same
`DATA` object, so content is written once:

```
data.js ──┬──> site.js     ──> index.html     (landing page)
          └──> terminal.js ──> terminal.html  (terminal mode)
```

Edit `data.js` and both views update. Don't hardcode content into either
renderer — that's the one rule that keeps the two from drifting apart.

## Layout

| File | Purpose |
| --- | --- |
| `data.js` | All content. The only file most edits touch. |
| `index.html` / `site.js` / `styles.css` | Landing page |
| `terminal.html` / `terminal.js` / `terminal.css` | Terminal mode |

## Local preview

No build step. Either open the files directly, or serve them:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Pushing to `main` publishes via GitHub Pages at
[tjweldy.github.io](https://tjweldy.github.io).
