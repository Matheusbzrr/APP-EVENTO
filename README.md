# API Missão NRF 2025

## 📜 Descrição

A **API Missão NRF 2025** foi desenvolvida para oferecer um sistema web personalizado de gerenciamento e acompanhamento da missão organizada pela **Fecomércio-PE**, em parceria com o **Sebrae** e o **Senac-PE**. Essa solução atende às necessidades específicas dos participantes, disponibilizando ferramentas práticas e acessíveis para otimizar a experiência durante o evento **NRF Retail's Big Show 2025** em Nova York.

Este repositório corresponde ao **Backend** da aplicação.

## 🛠️ Construído com

- **Node.js** - Ambiente de execução para JavaScript.
- **TypeScript** - Superset de JavaScript com tipagem estática.
- **Express.js** - Framework para criação de APIs.
- **MySQL** - Sistema gerenciador de banco de dados relacional.
- **Swagger** - Ferramenta para documentação de APIs REST.
- **JWT (JSON Web Token)** - Padrão para autenticação e segurança.

## 📄 Scripts disponíveis

- `dev`: Inicia o servidor no ambiente de desenvolvimento.
- `start`: Inicia o servidor no ambiente de produção.
- `build`: Compila o TypeScript para JavaScript.
- `test`: Executa testes (a serem configurados).

## 📦 Dependências principais

- **cors**: Middleware para habilitar CORS.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **express**: Framework web minimalista para Node.js.
- **jsonwebtoken**: Gerenciamento de autenticação via JWT.
- **multer**: Upload de arquivos.
- **typeorm**: ORM para gerenciamento de banco de dados.

## ⚙️ Configuração do Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js versão 16 ou superior
- NPM ou Yarn
- MySQL

### Passos para rodar o projeto

1. Instale as dependências:

   npm install

2. Configure o banco de dados:

   Edite o arquivo `.env` na raiz do projeto com suas credenciais do MySQL. Aqui está um exemplo:

   DB_HOST=localhost  
   DB_PORT=3306  
   DB_USER=seu_usuario  
   DB_PASSWORD=sua_senha  
   DB_NAME=seu_banco  
   DB_POOL_MAX=5  
   DB_POOL_MIN=0  
   DB_POOL_ACQUIRE=30000  
   DB_POOL_IDLE=10000  
   DB_DIALECT=mysql  
   JWT_SECRET=seu_secret  

3. Inicie o servidor no modo de desenvolvimento:

   npm run dev

   O servidor estará disponível em: http://localhost:3000.

## 🚀 Endpoints

A **API Missão NRF 2025** fornece endpoints para gerenciar participantes, eventos, cronogramas e outros aspectos relevantes da missão. Consulte a documentação Swagger para mais detalhes.

## ✒️ Autores

- **Miguel Amaral** - [GitHub](https://github.com/miguelamaral254) - [LinkedIn](https://linkedin.com/in/miguelamaral254/)
- **Matheus Bezerra da Silva** - [GitHub](https://github.com/Matheusbzrr) - [LinkedIn](https://linkedin.com/in/matheus-bzrr/)

## 📝 Licença

Este projeto está licenciado sob a licença ISC.
