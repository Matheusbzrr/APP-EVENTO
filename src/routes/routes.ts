import { Application } from "express"; 
import categoriaRoutes from "./categoria.routes";
// import ClienteRoutes from "./cliente.routes"; passar a rota quando estiver pronta
// Concetrador de rotas

export default class Routs{
    constructor(app: Application){
        app.use("/appevento", categoriaRoutes)
       // exemplo app.use("/nomedobanco", ClienteRoutes); 
       
        
       
    }
}