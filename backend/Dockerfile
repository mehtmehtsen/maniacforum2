FROM node:14
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
COPY *.ts tsconfig.json ./
EXPOSE 3000
CMD ["npm", "run", "start"]
