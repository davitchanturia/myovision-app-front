FROM node:lts-alpine as build-stage

WORKDIR /app

# COPY package*.json ./

# Copy local code to the container image
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
