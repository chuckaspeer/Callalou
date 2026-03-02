This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables (server-only)

Used by the Insights proxy and leads API. Do not expose to the client.

| Variable | Required | Description |
|----------|----------|-------------|
| `INSIGHTS_SCRIPT_URL` | For Insights/leads | Full Google Apps Script Web App URL (e.g. `https://script.google.com/.../exec`). Used by `/api/insights/media`, `/api/insights/featured`, and `/api/leads`. |
| `INSIGHTS_SCRIPT_SECRET` | For leads POST | Secret for server-to-server auth. Sent in body when posting to Apps Script `path=leads`. Optional if script does not require it. |

If `INSIGHTS_SCRIPT_URL` is not set, the Insights page still works using hardcoded fallback data from `src/content/insights.ts`.

## Google Apps Script deployment (Insights + Leads)

The app can read Media/Insights and submit Leads from a Google Sheet via a Web App.

1. **Create a Google Sheet** with two tabs: **Media** (columns per `docs/insights-data-contract.md`) and **Leads** (id, name, email, school, district, role, message, created_at, source, utm_source, utm_medium, utm_campaign).

2. **Create a new Apps Script** (Extensions → Apps Script) bound to that sheet, or standalone. Paste the contents of `scripts/Code.gs` into `Code.gs`.

3. **Set script properties** (Project Settings → Script Properties):
   - `SPREADSHEET_ID`: ID of the Google Sheet (if not bound to the sheet).
   - `ADMIN_SECRET`: Secret for admin/write operations (e.g. `path=admin_media`).

4. **Deploy as Web App**: Deploy → New deployment → Type: Web app. Execute as: Me. Who has access: Anyone. Copy the Web App URL.

5. **Configure Next.js**: Set `INSIGHTS_SCRIPT_URL` to the Web App URL (e.g. `https://script.google.com/macros/s/.../exec`). Optionally set `INSIGHTS_SCRIPT_SECRET` for leads.

Supported paths (query param `path`): `media` (GET), `featured` (GET), `leads` (POST). Admin: `admin_media` (POST, requires secret). See `scripts/Code.gs` and `docs/insights-data-contract.md` for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
