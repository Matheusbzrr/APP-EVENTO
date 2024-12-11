import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {

    // Retornar todas as categorias já cadastradas
    this.router.get("/categorias", this.controller.findAll);

  }
}

export default new CategoriaRoutes().router;
