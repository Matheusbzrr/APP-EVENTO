import { Router } from "express";
import SaveActivityController from "../controllers/saveActivity.controller";

class SaveActivityRoutes {
    router = Router();
    controller = SaveActivityController;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @openapi
         * /save:
         *   get:
         *     tags:
         *       - SaveActivities
         *     summary: Obter todas as atividades salvas
         *     description: Retorna a lista de todas as atividades salvas cadastradas no sistema.
         *     responses:
         *       200:
         *         description: Lista de atividades salvas cadastradas com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   idSaveActivity:
         *                     type: number
         *                     description: ID único da atividade salva.
         *                   idParticipant:
         *                     type: number
         *                     description: ID do participante associado à atividade salva.
         *                   activity:
         *                     type: object
         *                     properties:
         *                       idActivity:
         *                         type: number
         *                         description: ID único da atividade.
         *                       title:
         *                         type: string
         *                         description: Título da atividade.
         *                       description:
         *                         type: string
         *                         description: Descrição da atividade.
         *                       time:
         *                         type: string
         *                         description: Hora da atividade (formato HH:mm).
         *                       date:
         *                         type: string
         *                         format: date
         *                         description: Data da atividade.
         *                       location:
         *                         type: string
         *                         description: Localização da atividade.
         *                       areaOfExpertise:
         *                         type: array
         *                         items:
         *                           type: object
         *                           properties:
         *                             idArea:
         *                               type: number
         *                               description: ID da área de expertise.
         *                             name:
         *                               type: string
         *                               description: Nome da área de expertise.
         *       500:
         *         description: Erro ao tentar listar as atividades salvas.
         */
        this.router.get("/save", this.controller.findAll);

        /**
         * @openapi
         * /save:
         *   post:
         *     tags:
         *       - SaveActivities
         *     summary: Criar uma nova atividade salva
         *     description: Endpoint para criar uma nova atividade salva no sistema.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               idParticipant:
         *                 type: number
         *                 description: ID do participante associado à atividade salva.
         *                 example: 1
         *               idActivity:
         *                 type: number
         *                 description: ID da atividade associada.
         *                 example: 2
         *     responses:
         *       201:
         *         description: Atividade salva criada com sucesso.
         *       400:
         *         description: Dados inválidos fornecidos no corpo da requisição.
         *       500:
         *         description: Erro ao tentar criar a atividade salva.
         */
        this.router.post("/save", this.controller.create);

        /**
         * @openapi
         * /save/participant/{idParticipant}:
         *   get:
         *     tags:
         *       - SaveActivities
         *     summary: Obter atividades salvas por ID do participante
         *     description: Retorna a lista de atividades salvas associadas a um participante específico.
         *     parameters:
         *       - name: idParticipant
         *         in: path
         *         required: true
         *         description: ID do participante.
         *         schema:
         *           type: number
         *     responses:
         *       200:
         *         description: Lista de atividades salvas retornada com sucesso.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   idSaveActivity:
         *                     type: number
         *                     description: ID único da atividade salva.
         *                   idParticipant:
         *                     type: number
         *                     description: ID do participante associado à atividade salva.
         *                   activity:
         *                     type: object
         *                     properties:
         *                       idActivity:
         *                         type: number
         *                         description: ID único da atividade.
         *                       title:
         *                         type: string
         *                         description: Título da atividade.
         *                       description:
         *                         type: string
         *                         description: Descrição da atividade.
         *                       time:
         *                         type: string
         *                         description: Hora da atividade (formato HH:mm).
         *                       date:
         *                         type: string
         *                         format: date
         *                         description: Data da atividade.
         *                       location:
         *                         type: string
         *                         description: Localização da atividade.
         *                       areaOfExpertise:
         *                         type: array
         *                         items:
         *                           type: object
         *                           properties:
         *                             idArea:
         *                               type: number
         *                               description: ID da área de expertise.
         *                             name:
         *                               type: string
         *                               description: Nome da área de expertise.
         *       404:
         *         description: Nenhuma atividade salva encontrada para o ID do participante fornecido.
         *       500:
         *         description: Erro ao tentar buscar as atividades salvas.
         */
        /**
 * @openapi
 * /save/{idSaveActivity}:
 *   delete:
 *     tags:
 *       - SaveActivities
 *     summary: Excluir uma atividade salva
 *     description: Remove uma atividade salva com base no ID fornecido.
 *     parameters:
 *       - name: idSaveActivity
 *         in: path
 *         required: true
 *         description: ID da atividade salva que será excluída.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Atividade salva excluída com sucesso.
 *       404:
 *         description: Atividade salva não encontrada para o ID fornecido.
 *       500:
 *         description: Erro ao tentar excluir a atividade salva.
 */
this.router.delete("/save/:idSaveActivity", this.controller.delete);
        this.router.get("/save/participant/:idParticipant", this.controller.findByParticipantId);
    }
}

export default new SaveActivityRoutes().router;