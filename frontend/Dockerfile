# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# You would also add a custom nginx.conf here to proxy API requests
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]