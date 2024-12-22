"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./index"));
const swagger_config_1 = require("./config/swagger.config");
const app = (0, express_1.default)();
const server = new index_1.default(app);
const PORT = 8080;
// Configuração do Swagger
app.use("/api-docs", swagger_config_1.swaggerUi.serve, swagger_config_1.swaggerUi.setup(swagger_config_1.swaggerSpec));
// Inicializa o servidor
app
    .listen(PORT, "0.0.0.0", function () {
    console.log(`Server ta rodando na porta ${PORT}.`);
    console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
