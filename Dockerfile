FROM node:14

RUN mkdir -p /src

COPY backend/package.json src/package.json

WORKDIR /src

RUN npm install --only=production --silent

COPY ./backend /src

CMD npm start