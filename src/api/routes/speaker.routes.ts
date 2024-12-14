import { Router } from "express";
import speakerController from "../controllers/speaker.controller";

class SpeakerRoutes {
    router = Router();
    controller = new speakerController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /speakers:
         *   get:
         *     tags:
         *       - Speakers
         *     summary: Obter todos os speakers
         *     description: Retorna a lista de todos os speakers cadastrados no sistema.
         *     responses:
         *       200:
         *         description: Lista de speakers cadastrados com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: number
         *                     description: ID único do speaker.
         *                   name:
         *                     type: string
         *                     description: Nome do speaker.
         *       500:
         *         description: Erro ao tentar listar os speakers.
         */
        this.router.get("/speakers", this.controller.findAll);

        /**
         * @openapi
         * /speakers:
         *   post:
         *     tags:
         *       - Speakers
         *     summary: Criar um novo speaker
         *     description: Endpoint para criar um novo speaker no sistema.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nome do speaker.
         *                 example: Maria Silva
         *     responses:
         *       201:
         *         description: Speaker criado com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar o speaker.
         */
        this.router.post("/speakers", this.controller.create);
    }
}

export default new SpeakerRoutes().router;