# clawdlinux-website

Source for **https://clawdlinux.org** — the company website + product landing pages.

Vite + React 19 + Tailwind v4 + Framer Motion + react-router-dom v7. Deployed to Vercel (project `landing`, alias `clawdlinux.org`).

## Routes

| Path | Page |
|---|---|
| `/` | Short Clawdlinux company landing |
| `/products` | Product overview (Operator + ACL) |
| `/products/operator` | Agentic Operator deep-dive (full narrative) |
| `/products/acl` | ACL — Agent Context Language deep-dive |

## Local dev

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/
npm run lint
npm run preview
```

## Deploy

```bash
vercel deploy --prod --yes
```

`vercel.json` includes the SPA rewrite (`/((?!assets/|.*\..*).*)` → `/index.html`) so client-side routing survives a hard refresh.

## History

This repo was extracted from `Clawdlinux/agentic-operator-core/landing/` on 2026-05-10 with `git filter-repo --subdirectory-filter landing` to preserve the 29 commits that touched the landing page. The operator repo is now product-only; everything web-facing lives here.

## License

UNLICENSED — first-party Clawdlinux marketing site.
