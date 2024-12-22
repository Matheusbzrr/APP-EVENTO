"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes/routes"));
const data_source_1 = require("./infrastructure/db/data-source");
const swagger_config_1 = require("./config/swagger.config");
const cors_config_1 = require("./config/cors.config");
class Server {
    constructor(app) {
        this.config(app);
        new routes_1.default(app);
    }
    config(app) {
        app.use((0, cors_1.default)(cors_config_1.corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use("/api-docs", swagger_config_1.swaggerUi.serve, swagger_config_1.swaggerUi.setup(swagger_config_1.swaggerSpec));
    }
}
exports.default = Server;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("O banco de dados está rodando");
})
    .catch((error) => console.log(error));
