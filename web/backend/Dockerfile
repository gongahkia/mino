FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Run Stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --prod

COPY --from=build /app/dist ./dist

EXPOSE 4000
CMD [ "node", "dist/api/index.js" ]
