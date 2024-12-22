import express, { Application } from "express";
import Server from "./index";
import { swaggerSpec, swaggerUi } from "./config/swagger.config";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 8080;

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializa o servidor
app
    .listen(PORT, "0.0.0.0", function () {
        console.log(`Server ta rodando na porta ${PORT}.`);
        console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
    })
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });