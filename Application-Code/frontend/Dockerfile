# ---------- build stage ----------
FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# SPA routing fix
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

