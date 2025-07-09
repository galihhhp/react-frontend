#!/bin/sh

cat >/usr/share/nginx/html/config.json <<EOF
{
  "apiUrl": "${API_URL:-http://localhost:3000}"
}
EOF

nginx -g 'daemon off;'
