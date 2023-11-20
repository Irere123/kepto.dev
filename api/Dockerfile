FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json  ./

RUN pnpm install 
COPY . .

RUN pnpm run build

ENV PORT=4000

EXPOSE 4000

CMD [ "node", "build/index.js" ]

USER node