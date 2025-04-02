#!/bin/sh
# entry-point.sh – run at container startup in production
cat <<EOF > /usr/share/nginx/html/config.js
window.runtimeConfig = {
  VITE_POSTHOG_API_KEY: "${VITE_POSTHOG_API_KEY}",
  VITE_POSTHOG_HOST: "${VITE_POSTHOG_HOST}",
  VITE_SLACK_WEBHOOK_TOKEN: "${VITE_SLACK_WEBHOOK_TOKEN}"
};
EOF
exec nginx -g 'daemon off;'
