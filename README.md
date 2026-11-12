# kakemono docs

The documentation site for [kakemono](https://github.com/RielJ/kakemono), a wallpaper manager for
macOS, Linux and Windows. It's live at <https://kakemono.rielj.xyz>.

The site is built with [Astro Starlight](https://starlight.astro.build). Vercel deploys `main` on
every push.

## Work on it

You need [Bun](https://bun.sh) and Node.js 24. Bun installs the packages and runs the scripts; Astro itself runs on Node.

```sh
bun install
bun run dev       # http://localhost:4321
bun run build     # builds to dist/ and checks every internal link
bun run preview   # serves dist/
bun run lint      # oxlint
bun run fmt       # oxfmt; formats code and CSS, not Markdown
bun run check     # lint, format check and build, as CI would
```

`bun run build` fails on a broken internal link or `#anchor`, through
[starlight-links-validator](https://github.com/HiDeoo/starlight-links-validator).

## Layout

| Path | What it is |
|---|---|
| `src/content/docs/` | The pages. The file path is the URL: `guides/sources.md` is `/guides/sources/`. |
| `astro.config.mjs` | The sidebar, the share-card meta tags, and the site settings. |
| `src/styles/custom.css` | The accent colours, taken from the kakemono app. |
| `public/media/` | The demo video on the home page. |
| `public/og.png` | The share image. `og/` has its source; see [og/README.md](og/README.md). |

## Keep the docs in step with the app

The kakemono README covers install, quick start and development. This site is the reference for
everything else. When a kakemono release changes a command, a config key or a default, update the
page here in the same week.
