import { CorsOptions } from 'cors';

const allowedOrigins = [
    "http://127.0.0.1:5501",
     "http://localhost:8080",
      "http://localhost:3000"
    ];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  },
};