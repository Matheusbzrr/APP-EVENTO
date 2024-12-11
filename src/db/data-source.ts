import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/db.config"; 
import { Categoria } from "../models/categoria";

export const AppDataSource = new DataSource({
    type: config.dialect as "mysql" | "postgres" | "sqlite" | "mssql" | "oracle",
    host: config.HOST!,
    port: config.PORT,
    username: config.USER!,
    password: config.PASSWORD!,
    database: config.DB!,
    entities: [Categoria],
    synchronize: true, 
    logging: false,
});
