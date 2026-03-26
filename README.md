# BLQ Intra portal

Internal Next.js site for Brandlogiq: policies, client comms, on-call roster, email directory, and IT notes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel hosting (recommended next)

For Vercel, set these Project Environment Variables:

- `AUTH_SECRET` (random long string)
- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `AUTH_ADMIN_PASSWORD` (extra layer for `/admin/cms`)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_WRITE_TOKEN` (recommended for dashboard save actions)
- optional `SANITY_API_READ_TOKEN` for private datasets

The app is configured with `revalidate = 60`, so Sanity content updates are picked up automatically (roughly within a minute) without manual code edits.
Admins can manage content from `/admin/cms` without opening Sanity Studio.

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

This project now supports **Sanity** as the headless CMS/CDN.

- Pages read from a singleton Sanity document: `_type = "siteContent"`, `_id = "siteContent"`.
- If Sanity env vars are missing, the app falls back to `src/content/site.json`.
- Set GitHub repository variables/secrets so CI can pull Sanity content during `build:gh-pages`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - Optional secret: `SANITY_API_READ_TOKEN` (private datasets)

Schema files are in `sanity/schemaTypes`.

Quick bootstrap:

1. Run `npm run sanity:seed:file` to generate `scripts/site-content.seed.json`.
2. Import into Sanity:
   `sanity dataset import scripts/site-content.seed.json <dataset> --replace`
3. In Sanity Studio, ensure the imported document id stays `siteContent`.

## Scripts

| Command              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Development server                           |
| `npm run build`      | Production build (no static export)          |
| `npm run build:gh-pages` | Static export for Pages (base path `/blq-intra`) |
| `npm run deploy:gh-pages` | Build + push `out/` to `gh-pages` branch (manual) |
| `npm run sanity:dev` | Run local Sanity Studio |
| `npm run sanity:deploy` | Deploy Sanity Studio |
| `npm run sanity:seed:file` | Generate a seed JSON document for Sanity import |
