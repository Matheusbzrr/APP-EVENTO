import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../../config/db.config"; 
import { Activity } from "../../domain/models/activity";
import { AreaOfExpertise } from "../../domain/models/areaOfExpertise";
import { Checkin } from "../../domain/models/checkin";
import { Participant } from "../../domain/models/participant";
import { Post } from "../../domain/models/post";
import { Speaker } from "../../domain/models/speaker";
import { Like } from "../../domain/models/like";
import { SaveActivity } from "../../domain/models/saveActivity";
import path from 'path';

export const AppDataSource = new DataSource({
    type: config.dialect as "mysql" | "postgres" | "sqlite" | "mssql" | "oracle",
    host: config.HOST!,
    port: config.PORT,
    username: config.USER!,
    password: config.PASSWORD!,
    database: config.DB!,
    entities: [
        Activity,
        AreaOfExpertise,
        Checkin,
        Participant,
        Post,
        Speaker,
        Like, 
        SaveActivity
    ],
    synchronize: true,
    migrationsRun: true,
    migrations: [
        path.join(__dirname, "../migrations", "*.ts")  // Ajuste aqui para buscar a pasta migrations diretamente após 'src'
    ],
    logging: false,
});
