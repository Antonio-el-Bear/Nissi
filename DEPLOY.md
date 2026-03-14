# Deployment

This project is ready for static deployment.

## Quickest Way To Share It

If your goal is simply "let someone view this site", the fastest path is:

1. Push the repo to GitHub.
2. Import the repo into Vercel or Netlify.
3. Accept the default Vite build settings shown below.
4. Wait for the first deploy to finish.
5. Copy the public URL and send it to the person.

That gives them a live website they can open from any browser.

## Local validation

```bash
npm install
npm run build
npm run preview
```

## Optional booking endpoint

The booking form works locally out of the box by storing submissions in browser storage.

Important:

- On Vercel, the deployed site now uses the built-in `/api/appointments` backend automatically.
- That backend requires Resend environment variables to actually deliver booking requests.

For live booking delivery, add these environment variables in Vercel:

```bash
RESEND_API_KEY=your_resend_api_key
APPOINTMENT_NOTIFICATION_EMAIL=you@example.com
APPOINTMENT_FROM_EMAIL=onboarding@resend.dev
```

Notes:

- `APPOINTMENT_NOTIFICATION_EMAIL` is the inbox that should receive new booking requests.
- `APPOINTMENT_FROM_EMAIL` can use `onboarding@resend.dev` for testing, but for production you should use a verified sender/domain in Resend.
- The backend also sends a confirmation email back to the person who filled out the form.

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
7. Add these booking backend variables:
   `RESEND_API_KEY=your_resend_api_key`
   `APPOINTMENT_NOTIFICATION_EMAIL=you@example.com`
   `APPOINTMENT_FROM_EMAIL=onboarding@resend.dev`
8. After deploy, open the generated `https://...vercel.app` URL and share it.

## Netlify

1. Import the project into Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. `netlify.toml` already includes SPA redirects.
5. If you want live booking submissions on Netlify, point `VITE_APPOINTMENT_ENDPOINT` to your own hosted endpoint, because the built-in backend added here is Vercel-oriented.
6. After deploy, open the generated Netlify URL and share it.

## Manual static hosting

1. Run `npm run build`.
2. Upload the contents of `dist` to your host.
3. Configure your host to rewrite all unknown routes to `index.html`.
4. If you want live booking submissions outside Vercel, expose an HTTP endpoint and set `VITE_APPOINTMENT_ENDPOINT` before building.
5. Share the public domain or hosting URL.
