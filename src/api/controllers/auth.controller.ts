import { Request, Response } from "express";
import authService from "../../domain/services/auth.service";
import {
  ValidationError,
  AuthenticationError,
  DatabaseError,
} from "../../infrastructure/utils/CustomErrors"

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
        throw new AuthenticationError("E-mail não encontrado");
      }

      res.json({ token, email });
    } catch (error: any) {
      console.error("Erro ao realizar login:", error);

      if (error instanceof ValidationError) {
          res.status(400).json({ error: error.message });
      } else if (error instanceof AuthenticationError) {
          res.status(401).json({ error: error.message });
      } else if (error instanceof DatabaseError) {
          res.status(500).json({ error: "Erro nos dados" });
      } else {
          res.status(501).json({ error: "Erro no servidor" });
      }
    }
  }
}

export default AuthController;
