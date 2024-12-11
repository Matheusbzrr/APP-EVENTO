import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import Routes from './routes/routes';
import { AppDataSource } from './db/data-source';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        const allowedOrigins = ["http://127.0.0.1:5501", "http://localhost:8080"]; // browser e local
        
        const corsOptions: CorsOptions = {
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error("Origem nao permitida pelo CORS"));
                }
            }
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
}

AppDataSource.initialize()
    .then(() => {
        console.log(`O banco está rodando`);
    })
    .catch((error) => console.log(error));
