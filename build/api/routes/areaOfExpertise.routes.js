"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areaOfExpertise_controller_1 = __importDefault(require("../controllers/areaOfExpertise.controller"));
class AreaOfExpertiseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = areaOfExpertise_controller_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @openapi
         * /areas:
         *   get:
         *     tags:
         *       - Areas of Expertise
         *     summary: Obter todas as áreas de especialização
         *     description: Retorna a lista de todas as áreas de especialização cadastradas.
         *     responses:
         *       200:
         *         description: Lista de áreas de especialização cadastradas com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: number
         *                     description: ID único da área de especialização.
         *                   name:
         *                     type: string
         *                     description: Nome da área de especialização.
         *       500:
         *         description: Erro ao tentar listar as áreas de especialização.
         */
        this.router.get("/areas", this.controller.findAll);
        /**
         * @openapi
         * /areas:
         *   post:
         *     tags:
         *       - Areas of Expertise
         *     summary: Criar uma nova área de especialização
         *     description: Endpoint para criar uma nova área de especialização.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nome da área de especialização.
         *                 example: Engenharia de Software
         *     responses:
         *       201:
         *         description: Área de especialização criada com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar a área de especialização.
         */
        this.router.post("/areas", this.controller.create);
    }
}
exports.default = new AreaOfExpertiseRoutes().router;
