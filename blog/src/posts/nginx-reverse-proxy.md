---
title: nginx reverse proxy
created: 2016-03-28
tags:
  - nginx
  - deployment
---

reverse proxy: multiple local servers being served out to a client that only
really sees ngnix.

`cd /etc/ngnix`

`vi nginx.conf`

at the bottom-ish there'll be an `http {}` block, with a comment about virtual
host configs

`cd /etc/nginx/site-available`

`cp default whatever`

replace (non-comment) content with something like the following:


    server {
      listen 80 default_server;
      listen [::]:80 default_server;

      location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-Proto $scheme;
      }
    }


and then do an `ln -s /etc/nginx/sites-available/whatever
/etc/nginx/sites-enabled/`

after `service nginx restart` shiz should be working.

redirects www.url.com to url.com:

    server {
        server_name www.example.com;
        return 301 $scheme://example.com$request_uri;
    }


a full working example:


    server {
        listen 80;
        server_name example.com;
        location / {
            proxy_pass http://127.0.0.1:8081;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    server {
        server_name www.example.com;
        return 301 $scheme://example.com$request_uri;
    }

    server {
        listen 80;
        server_name qwerty.example.com;
        location / {
            proxy_pass http://127.0.0.1:8082;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    server {
        listen 80;
        server_name asdf.example.com;
        location / {
            proxy_pass http://127.0.0.1:8083;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    server {
        listen 80;
        server_name ghjkl.example.com;
        location / {
            proxy_pass http://127.0.0.1:8084;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

