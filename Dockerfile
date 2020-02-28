FROM node:10.13-alpine
WORKDIR /app
ADD ./code /app
RUN npm install && npm install -g nodemon && mv node_modules ../
EXPOSE 3000
CMD npm start