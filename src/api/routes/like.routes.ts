import { Router } from "express";
import LikeController from "../controllers/like.controller";

class LikeRoutes {
    router = Router();
    controller = LikeController;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /likes:
         *   get:
         *     tags:
         *       - Likes
         *     summary: Obter todos os likes
         *     description: Retorna a lista de todos os likes cadastrados no sistema.
         *     responses:
         *       200:
         *         description: Lista de likes cadastrados com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   idLike:
         *                     type: number
         *                     description: ID único do like.
         *                   idParticipant:
         *                     type: number
         *                     description: ID do participante que realizou o like.
         *                   idPost:
         *                     type: number
         *                     description: ID do post que recebeu o like.
         *       500:
         *         description: Erro ao tentar listar os likes.
         */
        this.router.get("/likes", this.controller.findAll);

        /**
         * @openapi
         * /likes:
         *   post:
         *     tags:
         *       - Likes
         *     summary: Criar um novo like
         *     description: Endpoint para criar um novo like no sistema.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               idParticipant:
         *                 type: number
         *                 description: ID do participante que realizou o like.
         *                 example: 1
         *               idPost:
         *                 type: number
         *                 description: ID do post que recebeu o like.
         *                 example: 2
         *     responses:
         *       201:
         *         description: Like criado com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar o like.
         */
        this.router.post("/likes", this.controller.create);
    }
}

export default new LikeRoutes().router;