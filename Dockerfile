FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy local code to the container image
COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]