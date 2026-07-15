# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
RUN corepack enable

# ---- deps: install dependencies with a cached, frozen lockfile ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- builder: build the Next.js app ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so
# they must be passed as build args, not just runtime env vars.
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
ARG NEXT_PUBLIC_PLACEHOLDER_LARGE_IMAGE_URL
ARG NEXT_PUBLIC_AUTH_TOKEN_SS_KEY
ARG NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY
ARG NEXT_PUBLIC_SESSION_TOKEN_LS_KEY
ARG NEXT_PUBLIC_AUTH_KEY_TIMEOUT
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# ---- runner: minimal production image ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
