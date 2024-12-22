"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_controller_1 = __importDefault(require("../controllers/activity.controller"));
class ActivityRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = activity_controller_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @openapi
         * /activities:
         *   get:
         *     tags:
         *       - Activities
         *     summary: Obter todas as atividades
         *     description: Retorna a lista de todas as atividades cadastradas no sistema.
         *     responses:
         *       200:
         *         description: Lista de atividades cadastradas com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   idActivity:
         *                     type: number
         *                     description: ID da atividade.
         *                     example: 1
         *                   title:
         *                     type: string
         *                     description: Título da atividade.
         *                     example: Workshop de Tecnologia
         *                   description:
         *                     type: string
         *                     description: Detalhes sobre a atividade.
         *                     example: Um workshop sobre as tendências de tecnologia em 2024.
         *                   time:
         *                     type: string
         *                     description: Hora de início da atividade.
         *                     example: "14:00"
         *                   date:
         *                     type: string
         *                     description: Data da atividade.
         *                     example: "2024-12-15"
         *                   location:
         *                     type: string
         *                     description: Localização da atividade.
         *                     example: Auditório Principal
         *                   speaker:
         *                     type: array
         *                     description: Lista de palestrantes associados à atividade.
         *                     items:
         *                       type: object
         *                       properties:
         *                         idSpeaker:
         *                           type: number
         *                           description: ID do palestrante.
         *                           example: 2
         *                         name:
         *                           type: string
         *                           description: Nome do palestrante.
         *                           example: Maria Silva
         *                         role:
         *                           type: string
         *                           description: Função do palestrante.
         *                           example: CTO
         *                         company:
         *                           type: string
         *                           description: Empresa do palestrante.
         *                           example: Tech Solutions
         *                   areaOfExpertise:
         *                     type: array
         *                     description: Lista de áreas de especialização associadas à atividade.
         *                     items:
         *                       type: object
         *                       properties:
         *                         idArea:
         *                           type: number
         *                           description: ID da área de especialização.
         *                           example: 1
         *                         name:
         *                           type: string
         *                           description: Nome da área de especialização.
         *                           example: Inteligência Artificial
         *       500:
         *         description: Erro ao tentar listar as atividades.
         */
        this.router.get("/activities", activity_controller_1.default.findAll);
        /**
         * @openapi
         * /activities:
         *   post:
         *     tags:
         *       - Activities
         *     summary: Criar uma nova atividade
         *     description: Endpoint para criar uma nova atividade com base nos dados fornecidos.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *                 description: Título da atividade.
         *                 example: Workshop de Inovação
         *               description:
         *                 type: string
         *                 description: Detalhes sobre a atividade.
         *                 example: Discussão sobre novas ferramentas de inovação.
         *               time:
         *                 type: string
         *                 pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
         *                 description: Hora da atividade no formato HH:mm.
         *                 example: "10:30"
         *               date:
         *                 type: string
         *                 format: date
         *                 description: Data da atividade no formato YYYY-MM-DD.
         *                 example: "2024-12-16"
         *               location:
         *                 type: string
         *                 description: Localização da atividade.
         *                 example: Sala 3
         *               speakerId:
         *                 type: array
         *                 items:
         *                   type: number
         *                 description: Lista de IDs dos palestrantes associados à atividade.
         *                 example: [1, 2]
         *               idArea:
         *                 type: array
         *                 items:
         *                   type: number
         *                 description: Lista de IDs das áreas de especialização associadas à atividade.
         *                 example: [3, 4]
         *     responses:
         *       201:
         *         description: Atividade criada com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 idActivity:
         *                   type: number
         *                   description: ID da nova atividade.
         *                   example: 10
         *                 title:
         *                   type: string
         *                   description: Título da nova atividade.
         *                   example: Workshop de Inovação
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar a atividade.
         */
        this.router.post("/activities", activity_controller_1.default.create);
        /**
         * @openapi
         * /activities/{id}:
         *   delete:
         *     tags:
         *       - Activities
         *     summary: Excluir uma atividade
         *     description: Exclui uma atividade existente pelo ID fornecido.
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         description: ID da atividade a ser excluída.
         *         schema:
         *           type: integer
         *           example: 5
         *     responses:
         *       204:
         *         description: Atividade excluída com sucesso.
         *       404:
         *         description: Atividade não encontrada.
         *       500:
         *         description: Erro ao excluir a atividade.
         */
        this.router.delete("/activities/:id", activity_controller_1.default.delete);
    }
}
exports.default = new ActivityRoutes().router;
