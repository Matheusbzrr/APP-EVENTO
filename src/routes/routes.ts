import { Application } from "express";
import categoriaRoutes from "./categoria.routes";
import participantRoutes from "./participant.routes";
// import ClienteRoutes from "./cliente.routes"; passar a rota quando estiver pronta

// Concentrador de rotas
export default class Routes {
  constructor(app: Application) {
    app.use("/appevento", categoriaRoutes);
    app.use("/appevento", participantRoutes);
    // Exemplo: app.use("/nomedobanco", ClienteRoutes);
  }
}
