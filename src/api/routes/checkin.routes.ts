import { Router } from "express";
import CheckinController from "../controllers/checkin.controller";

class CheckinRoutes {
    router = Router();
    controller = CheckinController;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /checkins:
         *   get:
         *     tags:
         *       - Checkins
         *     summary: Obter todos os checkins
         *     description: Retorna a lista de todos os checkins cadastrados no sistema.
         *     responses:
         *       200:
         *         description: Lista de checkins cadastrados com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: number
         *                     description: ID único do checkin.
         *                   idParticipant:
         *                     type: number
         *                     description: ID do participante que realizou o checkin.
         *                   idActivity:
         *                     type: number
         *                     description: ID da atividade em que o checkin foi realizado.
         *       500:
         *         description: Erro ao tentar listar os checkins.
         */
        this.router.get("/checkins", this.controller.findAll);

        /**
         * @openapi
         * /checkins:
         *   post:
         *     tags:
         *       - Checkins
         *     summary: Criar um novo checkin
         *     description: Endpoint para criar um novo checkin no sistema.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               idParticipant:
         *                 type: number
         *                 description: ID do participante que realizou o checkin.
         *                 example: 1
         *               idActivity:
         *                 type: number
         *                 description: ID da atividade em que o checkin foi realizado.
         *                 example: 2
         *     responses:
         *       201:
         *         description: Checkin criado com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar o checkin.
         */
        this.router.post("/checkins", this.controller.create);
    }
}

export default new CheckinRoutes().router;