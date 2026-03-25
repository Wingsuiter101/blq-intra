# BLQ Intra portal

Internal Next.js site for Brandlogiq: policies, client comms, on-call roster, email directory, and IT notes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages (production)

Only the **built** site (the `out/` folder) is published. Source code stays on `main` / `master`; the **`gh-pages`** branch holds static HTML/CSS/JS only.

Live URL: **https://wingsuiter101.github.io/blq-intra/**

### One-time GitHub setting

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → **Source**: **Deploy from a branch**
3. **Branch**: **`gh-pages`** → **Folder**: **`/ (root)`** → Save

After the first workflow run (or manual deploy), the `gh-pages` branch appears and the site loads instead of this README.

### How deploy works

- **CI**: On every push to `main` / `master`, GitHub Actions runs `npm run build:gh-pages` and pushes **`out/`** to the **`gh-pages`** branch (source code is not copied there).
- **Manual**: `npm run deploy:gh-pages` (builds, then runs the `gh-pages` CLI to push `out/` to `origin gh-pages`).

### Content updates (CMS)

Site copy lives in `src/content/site.json`. After editing, use **/admin/cms** locally to adjust fields, download `site.json`, replace the file in the repo, commit, and push so the Pages workflow rebuilds.

## Scripts

| Command              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Development server                           |
| `npm run build`      | Production build (no static export)          |
| `npm run build:gh-pages` | Static export for Pages (base path `/blq-intra`) |
| `npm run deploy:gh-pages` | Build + push `out/` to `gh-pages` branch (manual) |
