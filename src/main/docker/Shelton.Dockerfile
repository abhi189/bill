FROM nginx:1.15-alpine

EXPOSE 80/tcp

COPY ./build/www /usr/share/nginx/html
COPY src/main/docker/site.dev.conf /etc/nginx/conf.d/default.conf
