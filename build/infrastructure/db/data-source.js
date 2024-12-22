"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const db_config_1 = require("../../config/db.config");
const activity_1 = require("../../domain/models/activity");
const areaOfExpertise_1 = require("../../domain/models/areaOfExpertise");
const checkin_1 = require("../../domain/models/checkin");
const participant_1 = require("../../domain/models/participant");
const post_1 = require("../../domain/models/post");
const speaker_1 = require("../../domain/models/speaker");
const like_1 = require("../../domain/models/like");
const saveActivity_1 = require("../../domain/models/saveActivity");
const path_1 = __importDefault(require("path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: db_config_1.config.dialect,
    host: db_config_1.config.HOST,
    port: db_config_1.config.PORT,
    username: db_config_1.config.USER,
    password: db_config_1.config.PASSWORD,
    database: db_config_1.config.DB,
    entities: [
        activity_1.Activity,
        areaOfExpertise_1.AreaOfExpertise,
        checkin_1.Checkin,
        participant_1.Participant,
        post_1.Post,
        speaker_1.Speaker,
        like_1.Like,
        saveActivity_1.SaveActivity
    ],
    synchronize: true,
    migrationsRun: true,
    migrations: [
        path_1.default.join(__dirname, "../migrations", "*.ts") // Ajuste aqui para buscar a pasta migrations diretamente após 'src'
    ],
    logging: false,
});
