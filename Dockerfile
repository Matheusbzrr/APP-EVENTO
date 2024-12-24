# Use uma imagem base oficial do Node.js
FROM node:21-slim

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho do container
COPY . .

# Expõe a porta 8080 para o host
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]