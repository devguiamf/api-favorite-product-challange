FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV development

RUN deluser --remove-home node
RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node

COPY --chown=node:node . .

RUN npm ci

USER node

CMD ["node", "dist/src/infra/main.js"]