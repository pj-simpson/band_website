FROM staticfloat/nginx-certbot

RUN rm /etc/nginx/conf.d/default.conf

COPY /include.forwarded /etc/nginx/app/include.forwarded
COPY /dev.conf /etc/nginx/conf.d