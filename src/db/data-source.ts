import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/db.config"; 
import { Categoria } from "../models/categoria";
import { Activity } from "../models/activity";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { Checkin } from "../models/checkin";
import { Participant } from "../models/participant";
import { Post } from "../models/post";
import { Speaker } from "../models/speaker";


export const AppDataSource = new DataSource({
    type: config.dialect as "mysql" | "postgres" | "sqlite" | "mssql" | "oracle",
    host: config.HOST!,
    port: config.PORT,
    username: config.USER!,
    password: config.PASSWORD!,
    database: config.DB!,
    entities: [
        Activity,
        Categoria,
        AreaOfExpertise,
        Checkin,
        Participant,
        Post,
        Speaker
    ],

    synchronize: true, 
    logging: false,
});
