FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --loglevel verbose
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]