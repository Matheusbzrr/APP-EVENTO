import { Router } from "express";
import AuthController from "../api/controllers/auth.controller";

class AuthRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @openapi
     * /appevento/auth/login:
     *   post:
     *     tags:
     *       - Authentication
     *     summary: Realiza login com e-mail
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: O e-mail do usuário
     *                 example: "user@example.com"
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: Token JWT gerado
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *       401:
     *         description: E-mail não encontrado
     *       400:
     *         description: E-mail não fornecido
     *       500:
     *         description: Erro no servidor
     */
    this.router.post("/auth/login", AuthController.login);
  }
}

export default new AuthRoutes().router;
