# Dockerfile
FROM node:20.11.0

# Create app directory
WORKDIR /usr/src/app

# Copy package.json package-lock.json
COPY ./website/package*.json .

RUN ["npm", "install"]