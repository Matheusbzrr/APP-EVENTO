import { Router } from "express";
import AreaOfExpertiseController from "../controllers/areaOfExpertise.controller";

class AreaOfExpertiseRoutes {
  router = Router();
  controller = AreaOfExpertiseController;

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @openapi
     * /appevento/areas:
     *   get:
     *     description: Retorna todas as áreas de especialização cadastradas.
     *     responses:
     *       200:
     *         description: Lista de áreas de especialização
     *       500:
     *         description: Erro ao tentar listar as áreas de especialização
     */
    this.router.get("/areas", this.controller.findAll);

    /**
     * @openapi
     * /appevento/areas:
     *   post:
     *     description: Cria uma nova área de especialização
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: Área de especialização criada com sucesso
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro ao tentar criar a área de especialização
     */
    this.router.post("/areas", this.controller.create);
  }
}

export default new AreaOfExpertiseRoutes().router;