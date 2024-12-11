import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {

    this.router.get("/categorias", this.controller.findAll);
    this.router.post("/categorias", this.controller.create);

  }
}

export default new CategoriaRoutes().router;
