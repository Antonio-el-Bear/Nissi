# Nissi

Therapy practice website for Tamar Nissi built with Vite, React, Framer Motion, and a custom local content and booking layer.

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

Booking backend environment variables:

- `RESEND_API_KEY=...`
- `APPOINTMENT_NOTIFICATION_EMAIL=you@example.com`
- `APPOINTMENT_FROM_EMAIL=onboarding@resend.dev`

How booking works now:

- On localhost, the booking form still stores submissions locally for demo use.
- On the deployed site, the frontend posts to `/api/appointments` automatically.
- The Vercel backend sends the booking request to your email using Resend.
- A confirmation email is also sent back to the person who submitted the form.

If `RESEND_API_KEY` or `APPOINTMENT_NOTIFICATION_EMAIL` is missing in Vercel, the booking request will fail with a configuration error.

## Share This Site

If you want someone else to open the site in their browser, deploy it to a public static host and send them the generated URL.

Fastest option:

1. Push this repository to GitHub.
2. Import it into Vercel or Netlify.
3. Let the host run `npm install` and `npm run build`.
4. Copy the public URL and share it.

What the other person will be able to do:

- Browse the full site normally.
- Use the booking form UI.

What will not persist unless you configure a backend:

- Booking submissions. Without the Resend environment variables, live visitors will not be able to send real booking requests.

If you want shared visitors to submit real booking requests, configure the Resend variables before deploying.

## Notes

- SPA rewrites are already configured in `vercel.json`.
- Static-host deployment guidance is also available in `DEPLOY.md`.
