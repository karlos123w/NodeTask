
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3009

CMD ["npm", "start"]