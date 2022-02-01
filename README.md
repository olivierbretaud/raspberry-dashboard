## Deploy App

### Run project
```bash
pm2 start npm --name "raspberry-dashboard" -- start
```

### Nginx config:

```bash
sudo nano /etc/nginx/sites-enabled/default
```

```bash
server {
    listen 82; # you can use 443 and letsencrypt to get SSL for free
    server_name domain-name.com; # domain name

    # for public asset into _next directory
    location _next/ {
        alias /srv/udemii-fe/.next/;
        access_log on;
    }

    location / {
        # reverse proxy for next server
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl restart nginx
```

