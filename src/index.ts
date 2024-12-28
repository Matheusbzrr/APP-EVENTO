import express, { Application } from "express";
import cors from "cors";
import path from "path";
import Routes from "./api/routes/routes";
import { AppDataSource } from "./infrastructure/db/data-source";
import { swaggerUi, swaggerSpec } from "./config/swagger.config";
import { corsOptions } from "./config/cors.config";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });