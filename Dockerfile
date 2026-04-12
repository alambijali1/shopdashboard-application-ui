# -----------------------------
#  Build App
# -----------------------------
FROM node:18-alpine AS artifact

# working directory
WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# build app
RUN npm run build


# -----------------------------
#  Nginx (Alpine)
# -----------------------------
FROM nginx:alpine

# remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# copy build output from stage 1
COPY --from=artifact /app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]