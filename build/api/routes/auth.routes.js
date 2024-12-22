"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @openapi
         * /auth/login:
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
        this.router.post("/auth/login", auth_controller_1.default.login);
    }
}
exports.default = new AuthRoutes().router;
