import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const timestamp = new Date().toISOString();

    if (!origin) {
      console.log(`[CORS][${timestamp}] Requisição sem header de origem aceita.`);
      callback(null, true);
      return;
    }

    const allowed = true; // Ajuste aqui para lógica personalizada de origem permitida, se necessário.
    if (allowed) {
      console.log(`[CORS][${timestamp}] Origem permitida: ${origin}`);
      callback(null, true);
    } else {
      const errorMessage = `[CORS][${timestamp}] Origem bloqueada: ${origin}. Acesso negado.`;
      console.error(errorMessage);
      callback(new Error(errorMessage));
    }
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Length", "X-Response-Time"],
  credentials: true,
};

export const logCorsDetails = (origin: string | undefined, status: "allowed" | "denied") => {
  const timestamp = new Date().toISOString();
  if (!origin) {
    console.log(`[CORS][${timestamp}] Sem origem identificada. Acesso permitido.`);
  } else if (status === "allowed") {
    console.log(`[CORS][${timestamp}] Origem permitida: ${origin}`);
  } else {
    console.error(`[CORS][${timestamp}] Origem bloqueada: ${origin}`);
  }
};