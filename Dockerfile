FROM node:20.10.0 AS builder
WORKDIR /src
ENV NODE_ENV=production
COPY . package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
ENV NODE_ENV=production
COPY --from=builder /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
LABEL app="learngraph-frontend"
CMD ["nginx", "-g", "daemon off;"]
