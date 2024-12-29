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
         * /participants/email/{email}:
         *   get:
         *     tags:
         *       - Participants
         *     summary: Busca participante por e-mail
         *     description: Retorna os dados de um participante a partir do e-mail fornecido.
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         description: E-mail do participante a ser buscado
         *         schema:
         *           type: string
         *           example: joao.silva@example.com
         *     responses:
         *       200:
         *         description: Dados do participante encontrados.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 idParticipant:
         *                   type: string
         *                 name:
         *                   type: string
         *                 email:
         *                   type: string
         *                 companyName:
         *                   type: string
         *                 postPermission:
         *                   type: number
         *                 position:
         *                   type: string
         *                 contact:
         *                   type: string
         *                 AreaOfExpertise:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       idArea:
         *                         type: number
         *                       name:
         *                         type: string
         *       404:
         *         description: Participante não encontrado.
         *       500:
         *         description: Erro interno do servidor.
         */
        this.router.get("/participants/email/:email", this.controller.findByEmail);

        /**
         * @openapi
         * /participants:
         *   get:
         *     tags:
         *       - Participants
         *     summary: Lista todos os participantes
         *     description: Retorna todos os participantes cadastrados.
         *     responses:
         *       200:
         *         description: Lista de participantes.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   idParticipant:
         *                     type: string
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *                   companyName:
         *                     type: string
         *                   postPermission:
         *                     type: number
         *                   position:
         *                     type: string
         *                   contact:
         *                     type: string
         *                   AreaOfExpertise:
         *                     type: array
         *                     items:
         *                       type: object
         *                       properties:
         *                         idArea:
         *                           type: number
         *                         name:
         *                           type: string
         *       500:
         *         description: Erro ao tentar listar participantes.
         */
        this.router.get("/participants", this.controller.findAll);

        /**
         * @openapi
         * /participants:
         *   post:
         *     tags:
         *       - Participants
         *     summary: Cria um novo participante
         *     description: Cria um novo participante com os dados fornecidos.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nome do participante
         *                 example: João Silva
         *               email:
         *                 type: string
         *                 description: E-mail do participante
         *                 example: joao.silva@example.com
         *               companyName:
         *                 type: string
         *                 description: Nome da empresa (opcional)
         *                 nullable: true
         *                 example: Tech Solutions
         *               postPermission:
         *                 type: number
         *                 description: Permissão para postar (opcional)
         *                 nullable: true
         *                 example: 1
         *               position:
         *                 type: string
         *                 description: Cargo do participante
         *                 example: Desenvolvedor de Software
         *               contact:
         *                 type: string
         *                 description: Contato do participante
         *                 example: 1234567890
         *               idArea:
         *                 type: array
         *                 description: IDs das áreas de expertise do participante
         *                 items:
         *                   type: number
         *                 example: [1, 2, 3]
         *     responses:
         *       201:
         *         description: Participante criado com sucesso.
         *       400:
         *         description: Dados inválidos.
         *       500:
         *         description: Erro ao tentar criar participante.
         */
        this.router.post("/participants", this.controller.create);
        /**
     * @openapi
     * /participants/{id}:
     *   put:
     *     tags:
     *       - Participants
     *     summary: Atualiza os dados de um participante
     *     description: Atualiza os dados de um participante com base no ID fornecido.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do participante a ser atualizado
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nome do participante
     *                 example: João Silva
     *               email:
     *                 type: string
     *                 description: E-mail do participante
     *                 example: joao.silva@example.com
     *               companyName:
     *                 type: string
     *                 description: Nome da empresa
     *                 nullable: true
     *                 example: Tech Solutions
     *               postPermission:
     *                 type: number
     *                 description: Permissão para postar
     *                 nullable: true
     *                 example: 1
     *               position:
     *                 type: string
     *                 description: Cargo do participante
     *                 example: Desenvolvedor de Software
     *               contact:
     *                 type: string
     *                 description: Contato do participante
     *                 example: 1234567890
     *               idArea:
     *                 type: array
     *                 description: IDs das áreas de expertise
     *                 items:
     *                   type: number
     *                 example: [1, 2, 3]
     *     responses:
     *       200:
     *         description: Participante atualizado com sucesso.
     *       400:
     *         description: Dados inválidos.
     *       404:
     *         description: Participante não encontrado.
     *       500:
     *         description: Erro ao tentar atualizar participante.
     */
    this.router.put("/participants/:id", this.controller.update);
    }
}

export default new ParticipantRoutes().router;