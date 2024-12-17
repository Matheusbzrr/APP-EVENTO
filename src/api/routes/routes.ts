import { Application } from "express";
import participantRoutes from "./participant.routes";
import areaOfExpertiseRoutes from "./areaOfExpertise.routes";
import checkinRoutes from "./checkin.routes";
import activityRoutes from "./activity.routes";
import speakerRoutes from "./speaker.routes";
import authRoutes from "./auth.routes";
import likeRoutes from "./like.routes";
import postRoutes from "./post.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/appevento", participantRoutes);
    app.use("/appevento", areaOfExpertiseRoutes);
    app.use("/appevento", checkinRoutes);
    app.use("/appevento", activityRoutes);
    app.use("/appevento", speakerRoutes);
    app.use("/appevento", authRoutes);
    app.use("/appevento", likeRoutes);
    app.use("/appevento", postRoutes);
  }
}
