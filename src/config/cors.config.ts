import { CorsOptions } from "cors";


export const corsOptions: CorsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ], 
  exposedHeaders: ["Content-Length", "X-Response-Time"], 
  credentials: false, 
  optionsSuccessStatus: 200, 
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