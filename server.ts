import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { corsOptions, logCorsDetails } from "./src/config/cors.config";
import Server from "./src/index";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 8080;

// Middleware de CORS
app.use(cors(corsOptions));

// Middleware para log detalhado de requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || "Sem origem";
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  console.log(`[Request] Método: ${req.method}, URL: ${req.url}, Origem: ${origin}, User-Agent: ${userAgent}`);
  next();
});

// Middleware para tratar erros gerais
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(`[Error] ${err.message}`);
    res.status(500).json({ message: err.message });
  } else {
    console.error("[Error] Erro desconhecido", err);
    res.status(500).json({ message: "Erro desconhecido" });
  }
});

app
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error("Erro: endereço já está em uso.");
    } else {
      console.error("Erro ao iniciar o servidor:", err);
    }
  });