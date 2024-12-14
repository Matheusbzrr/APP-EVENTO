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
     * /activities:
     *   get:
     *     tags:
     *       - Activities
     *     summary: Obter todas as atividades
     *     description: Retorna a lista de todas as atividades cadastradas no sistema.
     *     responses:
     *       200:
     *         description: Lista de atividades cadastradas com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: number
     *                   title:
     *                     type: string
     *                   description:
     *                     type: string
     *                   time:
     *                     type: string
     *                   date:
     *                     type: string
     *                   location:
     *                     type: string
     *                   speakerId:
     *                     type: array
     *                     items:
     *                       type: number
     *       500:
     *         description: Erro ao tentar listar as atividades.
     */
    this.router.get("/activities", ActivityController.findAll);

    /**
     * @openapi
     * /activities:
     *   post:
     *     tags:
     *       - Activities
     *     summary: Criar uma nova atividade
     *     description: Endpoint para criar uma nova atividade com base nos dados fornecidos.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: Título da atividade.
     *               description:
     *                 type: string
     *                 description: Descrição da atividade.
     *               time:
     *                 type: string
     *                 pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
     *                 description: Hora da atividade no formato HH:mm.
     *               date:
     *                 type: string
     *                 format: date
     *                 description: Data da atividade no formato YYYY-MM-DD.
     *               location:
     *                 type: string
     *                 description: Localização da atividade.
     *               speakerId:
     *                 type: array
     *                 items:
     *                   type: number
     *                   description: ID do palestrante.
     *                 description: Lista de IDs dos palestrantes associados à atividade.
     *     responses:
     *       201:
     *         description: Atividade criada com sucesso.
     *       400:
     *         description: Dados inválidos fornecidos no corpo da requisição.
     *       500:
     *         description: Erro ao tentar criar a atividade.
     */
    this.router.post("/activities", ActivityController.create);
    /**
     * @openapi
     * /activities/{id}:
     *   delete:
     *     tags:
     *       - Activities
     *     summary: Excluir uma atividade
     *     description: Exclui uma atividade existente pelo ID fornecido.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da atividade a ser excluída.
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Atividade excluída com sucesso.
     *       404:
     *         description: Atividade não encontrada.
     *       500:
     *         description: Erro ao excluir a atividade.
     */
    this.router.delete("/activities/:id", ActivityController.delete);
  }
}

export default new ActivityRoutes().router;
