import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @openapi
     * /appevento/categorias:
     *   get:
     *     description: Retorna todas as categorias cadastradas.
     *     responses:
     *       200:
     *         description: Lista de categorias
     *       500:
     *         description: Erro ao tentar listar categorias
     */
    this.router.get("/categorias", this.controller.findAll);

    /**
     * @openapi
     * /appevento/categorias:
     *   post:
     *     description: Cria uma nova categoria
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               descricao:
     *                 type: string
     *     responses:
     *       201:
     *         description: Categoria criada com sucesso
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro ao tentar criar categoria
     */
    this.router.post("/categorias", this.controller.create);
  }
}

export default new CategoriaRoutes().router;
