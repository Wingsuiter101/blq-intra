# BLQ Intra portal

Internal Next.js site for Brandlogiq: policies, client comms, on-call roster, email directory, and IT notes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages (production)

The app is built as a **static export** and deployed with **GitHub Actions**. Your site should load at:

**https://wingsuiter101.github.io/blq-intra/**

### If you only see this README (or a generic Next.js readme) at that URL

The Pages source is almost certainly wrong. Fix it once:

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Open the **Actions** tab and confirm the latest **Deploy to GitHub Pages** workflow finished green.
4. If the workflow was never run, push a small commit to `main` / `master` or use **Run workflow**.

Until Actions deploys the `out/` folder from the workflow, GitHub will keep serving the repo root (mostly `README.md`), which looks like “the readme” instead of the app.

### Content updates (CMS)

Site copy lives in `src/content/site.json`. After editing, use **/admin/cms** locally to adjust fields, download `site.json`, replace the file in the repo, commit, and push so the Pages workflow rebuilds.

## Scripts

| Command              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Development server                           |
| `npm run build`      | Production build (no static export)          |
| `npm run build:gh-pages` | Same export as CI (base path `/blq-intra`) |
