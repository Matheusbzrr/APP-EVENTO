import { Router } from "express";
import ParticipantController from "../controllers/participant.controller";

class ParticipantRoutes {
    router = Router();
    controller = ParticipantController; 

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /appevento/participants:
         *   get:
         *     tags:
         *       - Participants
         *     description: Retorna todos os participantes cadastrados.
         *     responses:
         *       200:
         *         description: Lista de participantes
         *       500:
         *         description: Erro ao tentar listar participantes
         */
        this.router.get("/participants", this.controller.findAll);

        /**
         * @openapi
         * /appevento/participants:
         *   post:
         *     tags:
         *       - Participants
         *     description: Cria um novo participante
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nome do participante
         *                 example: João Silva
         *               email:
         *                 type: string
         *                 description: E-mail do participante
         *                 example: joao.silva@example.com
         *               companyName:
         *                 type: string
         *                 description: Nome da empresa (opcional)
         *                 nullable: true
         *                 example: Tech Solutions
         *               postPermission:
         *                 type: number
         *                 description: Permissão para postar (opcional)
         *                 nullable: true
         *                 example: 1
         *     responses:
         *       201:
         *         description: Participante criado com sucesso
         *       400:
         *         description: Dados inválidos
         *       500:
         *         description: Erro ao tentar criar participante
         */
        this.router.post("/participants", this.controller.create);
    }
}

export default new ParticipantRoutes().router;