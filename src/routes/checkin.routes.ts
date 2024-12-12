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
         * /appevento/checkins:
         *   get:
         *     description: Retorna todos os checkins cadastrados.
         *     responses:
         *       200:
         *         description: Lista de checkins
         *       500:
         *         description: Erro ao tentar listar checkins
         */
        this.router.get("/checkins", this.controller.findAll);

        /**
         * @openapi
         * /appevento/checkins:
         *   post:
         *     description: Cria um novo checkin
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               participantId:
         *                 type: number
         *               activityId:
         *                 type: number
         *     responses:
         *       201:
         *         description: Checkin criado com sucesso
         *       400:
         *         description: Dados inválidos
         *       500:
         *         description: Erro ao tentar criar checkin
         */
        this.router.post("/checkins", this.controller.create);
    }
}

export default new CheckinRoutes().router;
