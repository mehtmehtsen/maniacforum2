FROM node:14
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
RUN npm i -g tsoa concurrently
COPY *.ts *.json ./
EXPOSE 3000
CMD ["npm", "run", "dev"]
