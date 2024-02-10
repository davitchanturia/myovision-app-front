FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy local code to the container image
COPY . .

RUN npm run build

# Build a small nginx image with the built assets
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx, it serves the static files
CMD ["nginx", "-g", "daemon off;"]