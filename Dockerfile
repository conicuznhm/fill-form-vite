# Build vite
FROM node:24-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Serve with nginx
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy vite build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# //Install cloudflared
# RUN apk add --no-cache curl
# RUN curl -L https://github.com/cloudflare/cloudflared/releases/download/2025.4.2/cloudflared-linux-amd64 -o /usr/bin/cloudflared 
# RUN chmod +x /usr/bin/cloudflared

# //Copy start script to handle api proxy connection
COPY start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]


# podman build -t form-vite:v1 .
# podman build -t form-vite:v1 --no-cache .
# podman run --name form-vite -p 9090:80 -d form-vite:v1


# //to specify a custom-net as network
# podman run --name form-vite --network my-network -p 80:80 -d form-vite:v2
# podman run --name form-vite -p 80:80 -d form-vite:v1