import express, { Application } from 'express';
import cors from 'cors';
import Routes from './api/routes/routes';
import { AppDataSource } from './infrastructure/db/data-source';
import { swaggerUi, swaggerSpec } from './config/swagger.config';
import { corsOptions } from './config/cors.config';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}

AppDataSource.initialize()
    .then(() => {
        console.log("O banco de dados está rodando");
    })
    .catch((error) => console.log(error));