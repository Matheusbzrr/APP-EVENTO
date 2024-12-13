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
     *               email:
     *                 type: string
     *               companyName:
     *                 type: string
     *                 nullable: true
     *               postPermission:
     *                 type: number
     *                 nullable: true
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
