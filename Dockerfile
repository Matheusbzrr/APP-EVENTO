FROM node:21-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Adicione o script wait-for-it
RUN apt-get update && apt-get install -y wget \
    && wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh

    EXPOSE 8080

    CMD ["./wait-for-it.sh", "mysql:3306", "--", "node", "build/server.js"]