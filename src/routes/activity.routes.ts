import { Router } from "express";
import ActivityController from "../controllers/activity.controller";

class ActivityRoutes {
    router = Router();
    controller = ActivityController;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /appevento/activities:
         *   get:
         *     tags:
         *       - Activities
         *     description: Retorna todas as atividades cadastradas.
         *     responses:
         *       200:
         *         description: Lista de atividades
         *       500:
         *         description: Erro ao tentar listar as atividades
         */
        this.router.get("/activities", ActivityController.findAll);

        /**
         * @openapi
         * /appevento/activities:
         *   post:
         *     tags:
         *       - Activities
         *     description: Cria uma nova atividade.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *                 description: Título da atividade
         *               description:
         *                 type: string
         *                 description: Descrição da atividade
         *               time:
         *                 type: string
         *                 pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
         *                 description: Hora da atividade
         *               date:
         *                 type: string
         *                 format: date
         *                 description: Data da atividade
         *               location:
         *                 type: string
         *                 description: Localização da atividade
         *               speakerId:
         *                 type: array
         *                 items:
         *                   type: number
         *                   description: ID do palestrante
         *                 description: Lista de IDs de palestrantes
         *     responses:
         *       201:
         *         description: Atividade criada com sucesso
         *       400:
         *         description: Dados inválidos
         *       500:
         *         description: Erro ao tentar criar a atividade
         */
        this.router.post("/activities", ActivityController.create);
    }
}

export default new ActivityRoutes().router;