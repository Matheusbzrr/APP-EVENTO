import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "APP EVENTO API", 
      version: "1.0.0", 
      description: "Documentação da API para o APP EVENTO", 
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
