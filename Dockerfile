FROM mhart/alpine-node:14 AS builder
#FROM node:11-alpine AS builder
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install
RUN npm run build

#FROM mhart/alpine-node
FROM node:14.0.0
RUN npm install yarn -g
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 5002
CMD ["serve", "-p", "3006", "-s", "."]
#CMD ["serve", "-s", "."]

#https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f
# Stage 1 - the build process
# FROM node:10.17 as build-deps
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install yarn -g
# RUN yarn
# COPY . ./
# RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:1.11-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
