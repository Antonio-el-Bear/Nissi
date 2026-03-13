# Deployment

This project is ready for static deployment.

## Local validation

```bash
npm install
npm run build
npm run preview
```

## Optional booking endpoint

The booking form works locally out of the box by storing submissions in browser storage.

If you want submissions to post to your own backend, create a `.env` file and set:

```bash
VITE_APPOINTMENT_ENDPOINT=https://your-domain.example/api/appointments
```

The frontend sends a JSON `POST` request to that endpoint with the submitted appointment payload.

## Vercel

1. Import the project into Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. `vercel.json` already includes SPA rewrites.
6. Add these environment variables:
	`VITE_SITE_ID=nissi-therapy-site`
	`VITE_APP_VERSION=1.0.0`
	`VITE_SITE_BASE_URL=https://your-vercel-domain.vercel.app`
7. Add `VITE_APPOINTMENT_ENDPOINT` if you want live booking submissions.

## Netlify

1. Import the project into Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. `netlify.toml` already includes SPA redirects.
5. Add `VITE_APPOINTMENT_ENDPOINT` if you want live booking submissions.

## Manual static hosting

1. Run `npm run build`.
2. Upload the contents of `dist` to your host.
3. Configure your host to rewrite all unknown routes to `index.html`.
4. If you want live booking submissions, expose an HTTP endpoint and set `VITE_APPOINTMENT_ENDPOINT` before building.
