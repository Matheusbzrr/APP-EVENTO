import { Request, Response } from "express";
import authService from "../../domain/services/auth.service";
import { AuthenticationError } from "../../domain/exceptions/authentiction-error";
import { ValidationError } from "../../domain/exceptions/validation-error";
import { DatabaseError } from "../../domain/exceptions/data-base-error";


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

      if (error instanceof AuthenticationError) {
          res.status(400).json({ error: error.message });
      } else if (error instanceof DatabaseError) {
          res.status(503).json({ error: "Erro nos dados" });
      } else {
          res.status(500).json({ error: "Erro no servidor" });
      }
    }
  }
}

export default AuthController;
