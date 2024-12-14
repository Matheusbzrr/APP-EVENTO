import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APP EVENTO API",
      version: "1.0.0",
      description: "Documentação da API para o APP EVENTO",
    },
    servers: [
      {
        url: "/appevento",
        description: "Servidor principal",
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "../api/routes/*.ts"), // Caminho absoluto para as rotas
    path.resolve(__dirname, "../api/controllers/*.ts"), // Caminho absoluto para os controladores
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };