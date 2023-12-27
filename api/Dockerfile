FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
RUN npm install -g turbo

FROM base AS pruner
WORKDIR /app

COPY . .

RUN turbo prune api --docker

FROM base as builder
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --no-frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=api...
 

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# COPY --from=builder /app/full/next.config.js .
COPY --from=builder /app/full/package.json .

COPY --from=builder --chown=expressjs:nodejs /app/full/build .
# COPY --from=builder --chown=nextjs:nodejs /app/full/.next/static ./standalone/.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/full/public ./standalone/public

CMD node ./build/index.js
