import "reflect-metadata"
import { DataSource } from "typeorm"
import { config, dialect } from "../config/db.config"
import { Categoria } from "../models/categoria"
// import { Cliente } from "../models/cliente" importar a model depois de pronta


export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Categoria, /*Cliente*/], // importar a entidade/model aqui
    synchronize: false, // ligar quando os modelos estiverem prontos para criar as tabelas no banco de dados
    logging: false,
})