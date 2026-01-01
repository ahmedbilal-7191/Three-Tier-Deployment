FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3500

CMD ["node", "index.js"]

