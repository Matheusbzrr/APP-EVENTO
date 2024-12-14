import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import Routes from './api/routes/routes';
import { AppDataSource } from './infrastructure/db/data-source';
import { swaggerUi, swaggerSpec } from './config/swagger.config'; 

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        const allowedOrigins = ["http://127.0.0.1:5501", "http://localhost:8080"]; 
        
        const corsOptions: CorsOptions = {
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error("Origem não permitida pelo CORS"));
                }
            }
        };

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
