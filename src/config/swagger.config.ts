import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API NRF Retails",
      version: "1.0.0",
      description: "Documentação da API para o evento Retails",
    },
    servers: [
      {
        url: "http://localhost:8080/appevento",
        description: "Servidor principal",
      },
      {
        url: "https://missaonrf25.pe.senac.br/appevento",
        description: "Servidor Prod",
      },
    ],
  },
  
    apis: ["src/api/routes/*.ts"], 


};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };