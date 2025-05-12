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


# podman build -t form-vite:v1 .
# podman build -t form-vite:v1 --no-cache .
# podman run --name form-vite -p 9090:80 -d form-vite:v1


# //to specify a custom-net as network
# podman run --name form-vite --network my-network -p 80:80 -d form-vite:v2
# podman run --name form-vite -p 80:80 -d form-vite:v1