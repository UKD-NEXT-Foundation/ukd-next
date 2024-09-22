ARG nodejs=node:22-alpine

# === Install dependencies ===
FROM ${nodejs} AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
# === Install dependencies ===

# === Build project and install production dependencies =
FROM ${nodejs} AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn prisma generate
RUN yarn build
RUN yarn install --production=true
# === Build project and install production dependencies =

# === Copy dist code and production dependencies ====
FROM ${nodejs} AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/nest-cli.json ./nest-cli.json
# === Copy dist code and production dependencies ====

EXPOSE 8000

CMD ["node", "dist/main.js"]
