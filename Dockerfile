FROM node:14

WORKDIR /app

COPY trivia-backend/package*.json ./

RUN npm install

COPY trivia-backend/ ./


WORKDIR /app/trivia

COPY trivia/package*.json ./


RUN npm install


COPY trivia/ ./


RUN npm run build


WORKDIR /app


EXPOSE 3000

# Start the Express server
CMD [ "node", "server.js" ]