# Deployment

Path: VS Code → Git → GitHub → Dokploy → Dockerfile → Hostinger VPS → HTTPS.

The Dockerfile is the only production build method. Not Nixpacks. Not Railpack.

## The site origin

The public origin is **https://pmtravel.digitalstudiolf.online**.

It is baked in at build time, so it must reach the build as a **build
argument** — a runtime environment variable cannot reach the client bundle. It
is defaulted in the Dockerfile (`ARG NEXT_PUBLIC_SITE_URL=...`) so a deployment
needs no extra configuration.

Set it in the runtime environment too: `sitemap.xml` and `robots.txt` read it
server-side.

**When the domain changes**, change it in both places at once — the Dockerfile
default and Dokploy's Build Arguments — or the two will drift and you will ship
canonicals pointing at the old host.

## 1. Build locally first

```
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online -t pm-travel:local .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online pm-travel:local
```

Check `http://localhost:3000/api/health` returns `{"status":"ok"}`.

`NEXT_PUBLIC_SITE_URL` is baked into the client bundle at build time, so it
must be passed as a `--build-arg`, not only as a runtime `-e`. It is also
passed at runtime because `sitemap.xml` and `robots.txt` read it on the server.

### If the build fails on fonts

`next/font/google` downloads Schibsted Grotesk and Newsreader during
`npm run build`, so the build machine needs outbound internet. If you see
`Failed to fetch from Google Fonts`, self-host instead:

1. Download the woff2 files for Schibsted Grotesk (400, 500, 600) and
   Newsreader (400 normal + 400 italic) into `public/fonts/`.
2. In `src/app/layout.tsx` replace the `next/font/google` imports with
   `next/font/local`, keeping the same `variable` names
   (`--font-schibsted`, `--font-newsreader`) — nothing else has to change,
   because `globals.css` only ever references those two variables.

## 2. Push to GitHub

Create the repository **empty and private** first.

```
git init
git add .
git commit -m "Milestone 1: foundation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pm-travel.git
git push -u origin main
```

Then search the repository for `.env.local`. It must not be there. CI also
fails the build if an env file is ever committed.

## 3. Database

Add a PostgreSQL 16 service in Dokploy and copy the connection string. It runs
as its own service — never inside the website container.

Then apply the RFQ schema once, from your machine or a one-off container:

```
DATABASE_URL='postgres://...' npm run db:migrate
```

The migration in `drizzle/` creates `rfq_requests`, `rfq_status_events`,
`rfq_attachments` and `rfq_access_log`. Re-run it after any `npm run db:generate`.

## 3b. Attachment storage

Create a **private** S3-compatible bucket. Verify it is private by requesting an
object URL directly and confirming it is refused — attachments are only ever
served through signed URLs that expire, and a publicly listable bucket would
expose client itineraries and budgets.

Set `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID` and
`S3_SECRET_ACCESS_KEY`. If storage is not configured the form still accepts and
stores the request, and logs that the attachment could not be kept.

## 4. Application in Dokploy

| Setting | Value |
| --- | --- |
| Source | GitHub, this repository, branch `main` |
| Build type | Dockerfile |
| Port | 3000 |
| Health check path | `/api/health` |

Build argument and environment variables:

```
NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online
DATABASE_URL=<from step 3>
B2B_EMAIL=b2b@pm-travelagency.com
CONTACT_EMAIL=contact@pm-travelagency.com
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
S3_ENDPOINT=
S3_REGION=auto
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
IP_HASH_SALT=<a long random string>
```

`IP_HASH_SALT` must be set in production. Rate limiting and audit records hash
the client IP rather than storing it, and an unset salt falls back to a known
development value that would make those hashes trivially reversible.

Deploy, then confirm the container stays running and does not restart in a loop.

## 5. Domain and HTTPS

A record → VPS IP. Add the domain in Dokploy. Enable Let's Encrypt. Confirm the
padlock appears and that http redirects to https.

`Strict-Transport-Security` is already sent by `next.config.ts` with
`preload`, so only enable it once HTTPS is confirmed working on the domain.

## 6. Test the RFQ from outside

From an email address that is not on your own domain, submit the form with a
real PDF attached. Confirm, in order:

1. the success panel returns a reference in the form `PM-YYMM-XXXX`;
2. the notification arrives at `B2B_EMAIL` with the brief and the reply-to set
   to the sender;
3. the acknowledgement arrives at the sender's address and is **not** in spam;
4. a row exists in `rfq_requests` and a matching `received` row in
   `rfq_status_events`;
5. the attachment is in the bucket and its direct URL is refused.

Then submit six times in an hour from one connection and confirm the sixth is
refused.

## Rollback

Redeploy the last working deployment in Dokploy, or `git revert` and push,
which leaves an audit trail.

## Backups

Turn on automated PostgreSQL backups in Dokploy, set a retention period, and
test a restore every three months. An untested backup is not a backup.
