# Nissi

Therapy practice website for Thamar Nissi built with Vite, React, Framer Motion, and a custom local content and booking layer.

## Stack

- Vite
- React
- React Router
- Framer Motion
- Tailwind CSS utilities with custom global styling

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## CI

GitHub Actions is configured in `.github/workflows/ci.yml` to run a production build on every push to `main` and on pull requests.

## Vercel deployment

This repository is ready to deploy on Vercel.

Use these settings in the Vercel dashboard:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Recommended environment variables:

- `VITE_SITE_ID=nissi-therapy-site`
- `VITE_APP_VERSION=1.0.0`
- `VITE_SITE_BASE_URL=https://your-vercel-domain.vercel.app`

Optional environment variable:

- `VITE_APPOINTMENT_ENDPOINT=https://your-domain.example/api/appointments`

If `VITE_APPOINTMENT_ENDPOINT` is not set, the booking form stores submissions locally in the browser for demo use.

## Notes

- SPA rewrites are already configured in `vercel.json`.
- Static-host deployment guidance is also available in `DEPLOY.md`.