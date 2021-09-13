# API
FROM node:14
RUN mkdir -p /src
COPY package.json src/package.json
WORKDIR /src
RUN npm install
COPY . /src
CMD npm start
# WORKDIR /usr/src/app/backend
# COPY package*.json ./
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "run", "start"]
