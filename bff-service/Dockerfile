FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS application
COPY package*.json ./
RUN npm install --only=production
COPY --from=base /app/dist ./dist

USER node
EXPOSE 3000

ENTRYPOINT [ 'node', 'dist/main.js' ]
