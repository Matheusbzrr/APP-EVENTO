import { Application } from "express";
import categoriaRoutes from "./categoria.routes";
import participantRoutes from "./participant.routes";
import areaOfExpertiseRoutes from "./areaOfExpertise.routes";
import checkinRoutes from "./checkin.routes";
import activityRoutes from "./activity.routes";
import speakerRoutes from "./speaker.routes";
// import ClienteRoutes from "./cliente.routes"; passar a rota quando estiver pronta

// Concentrador de rotas
export default class Routes {
  constructor(app: Application) {
    app.use("/appevento", categoriaRoutes);
    app.use("/appevento", participantRoutes);
    app.use("/appevento", areaOfExpertiseRoutes);
    app.use("/appevento", checkinRoutes);
    app.use("/appevento", activityRoutes);
    app.use("/appevento", speakerRoutes);

    // Exemplo: app.use("/nomedobanco", ClienteRoutes);
  }
}
