# default is nginx for linux/amd64
ARG NGINX_IMAGE="nginx:1.12-alpine"

FROM node:24 AS builder
WORKDIR /src
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM ${NGINX_IMAGE}
ENV NODE_ENV=production
COPY --from=builder /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entry-point.sh /src/
EXPOSE 80
LABEL app="learngraph-frontend"
CMD ["sh", "/src/entry-point.sh"]
