# Dockerfile is the only production build method for this project.
# Not Nixpacks. Not Railpack.

# ---- deps ----
FROM node:22-alpine AS deps
WORKDIR /app
# sharp powers next/image optimisation in production. Its prebuilt musl binary
# needs libc6-compat on Alpine.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# ---- builder ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Guarantee public/ exists for the runner stage to copy. See the note there.
RUN mkdir -p /app/public

# Baked into the client bundle at build time, so it must be a build arg.
# The public origin, baked into the client bundle, every canonical URL, the
# sitemap and robots.txt. Defaulted so a deployment needs no extra build
# configuration; override with --build-arg (or Dokploy's Build Arguments) when
# the site moves to another domain, and change the default here at the same
# time so the two cannot drift apart.
ARG NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_SITE_URL is baked into the client bundle and into every canonical
# URL, the sitemap and robots.txt. A missing build argument is an empty string,
# not an unset variable, so it would silently bake localhost into the deployed
# site. Fail here, with instructions, rather than deploying wrong canonicals.
RUN test -n "$NEXT_PUBLIC_SITE_URL" || { \
      echo ""; \
      echo "ERROR: the NEXT_PUBLIC_SITE_URL build argument is missing."; \
      echo ""; \
      echo "It is baked in at BUILD time, so a runtime environment variable"; \
      echo "is not enough - it must be set as a build argument."; \
      echo ""; \
      echo "  Dokploy: application -> Build -> Build Arguments, add"; \
      echo "           NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online"; \
      echo ""; \
      echo "  Docker:  docker build \\"; \
      echo "             --build-arg NEXT_PUBLIC_SITE_URL=https://pmtravel.digitalstudiolf.online \\"; \
      echo "             -t pm-travel:local ."; \
      echo ""; \
      exit 1; \
    }

# NOTE: next/font downloads Schibsted Grotesk and Newsreader from Google Fonts
# during this step, so the build machine needs outbound internet access.
# If the build fails with "Failed to fetch from Google Fonts", see
# docs/deployment.md for how to self-host the font files instead.
RUN npm run build

# ---- runner ----
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# public/ is tracked via a .gitkeep, but the build must not depend on that:
# git does not track empty directories, so the folder can vanish from a clone
# the moment its last file is removed, and this COPY would fail a deployment
# for a reason nothing in the application explains.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
