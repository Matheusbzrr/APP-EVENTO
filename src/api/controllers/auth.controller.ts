import { Request, Response } from "express";
import authService from "../../domain/services/auth.service";

class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "E-mail é obrigatório" });
      return;
    }

    try {
      const token = await authService.login(email);

      if (!token) {
        res.status(401).json({ error: "E-mail não encontrado" });
        return;
      }

      res.json({ token });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  }
}

export default AuthController;
