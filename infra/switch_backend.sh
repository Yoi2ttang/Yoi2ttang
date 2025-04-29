NGINX_CONF="/etc/nginx/sites-available/default"
ACTIVE_PORT=$(grep "server 127.0.0.1" $NGINX_CONF | grep -o '[0-9]*')

if [ "$ACTIVE_PORT" == "18081" ]; then
  NEW_PORT="18082"
else
  NEW_PORT="18081"
fi

# replace line
sudo sed -i "s/server 127.0.0.1:[0-9]*/server 127.0.0.1:$NEW_PORT/" $NGINX_CONF

# reload nginx
sudo nginx -s reload

