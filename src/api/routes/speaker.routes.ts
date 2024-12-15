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
         *                   idSpeaker:
         *                     type: number
         *                     description: ID único do speaker.
         *                   name:
         *                     type: string
         *                     description: Nome do speaker.
         *                   description:
         *                     type: string
         *                     description: Descrição do speaker.
         *                   role:
         *                     type: string
         *                     description: Função ou cargo do speaker.
         *                   company:
         *                     type: string
         *                     description: Empresa associada ao speaker.
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
         *               description:
         *                 type: string
         *                 description: Descrição do speaker.
         *                 example: Palestrante experiente em tecnologia.
         *               role:
         *                 type: string
         *                 description: Função ou cargo do speaker.
         *                 example: CTO
         *               company:
         *                 type: string
         *                 description: Empresa associada ao speaker.
         *                 example: Tech Solutions
         *     responses:
         *       201:
         *         description: Speaker criado com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar o speaker.
         */
        this.router.post("/speakers", this.controller.create);

        /**
         * @openapi
         * /speakers/{idSpeaker}:
         *   delete:
         *     tags:
         *       - Speakers
         *     summary: Deletar um speaker pelo ID
         *     description: Remove um speaker do sistema com base no ID fornecido.
         *     parameters:
         *       - in: path
         *         name: idSpeaker
         *         required: true
         *         schema:
         *           type: number
         *         description: ID único do speaker a ser deletado.
         *     responses:
         *       200:
         *         description: Speaker deletado com sucesso.
         *       404:
         *         description: Speaker não encontrado.
         *       500:
         *         description: Erro ao tentar deletar o speaker.
         */
        this.router.delete("/speakers/:idSpeaker", this.controller.delete);
    }
}

export default new SpeakerRoutes().router;