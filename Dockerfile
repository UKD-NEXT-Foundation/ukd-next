ARG nodejs=node:20-alpine


FROM ${nodejs} AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 


FROM ${nodejs} AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build
RUN yarn install --production=true


FROM ${nodejs} AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/nest-cli.json ./nest-cli.json
COPY --from=builder /app/LICENSE ./LICENSE

EXPOSE 8000

CMD ["node", "dist/src/main.js"]
