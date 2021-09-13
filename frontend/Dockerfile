FROM node:14
WORKDIR /usr/src/app/maniacforum2
COPY package*.json ./
RUN npm install -g @angular/cli @angular-devkit/build-angular --unsafe-perm=true && npm install
EXPOSE 4200
CMD ["npm", "start"]