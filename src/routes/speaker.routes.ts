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
     * /appevento/speakers:
     *   get:
     *     description: Retorna todos os speakers cadastrados.
     *     responses:
     *       200:
     *         description: Lista de speakers
     *       500:
     *         description: Erro ao tentar listar speakers
     */
    this.router.get("/speakers", this.controller.findAll);

    /**
     * @openapi
     * /appevento/speakers:
     *   post:
     *     description: Cria um novo speaker
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do speaker
     *     responses:
     *       201:
     *         description: Speaker criado com sucesso
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro ao tentar criar speaker
     */
    this.router.post("/speakers", this.controller.create);
  }
}

export default new SpeakerRoutes().router;
