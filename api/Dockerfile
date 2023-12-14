FROM node:20-alpine AS base

FROM base as builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN apk update

# Set working directory

WORKDIR /app
# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
RUN npm i -g npm@latest; \
 # Install pnpm
 npm install -g pnpm; \
 pnpm --version; \
 pnpm setup; \
 mkdir -p /usr/local/share/pnpm &&\
 export PNPM_HOME="/usr/local/share/pnpm" &&\
 export PATH="$PNPM_HOME:$PATH"; \
 pnpm bin -g;


RUN pnpm add -g turbo
RUN turbo prune api --docker 

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app


# First install dependencies 

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build project and its dependencies
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

RUN pnpm build --filter api 
FROM base as runner 
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node api/build/index.js