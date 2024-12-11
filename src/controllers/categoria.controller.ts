import { Request, Response } from "express";
import { Categoria } from "../models/categoria";
import categoriaRepository from "../repositories/categoria.repository";

export default class CategoriaController{

    
    async findAll(req: Request, res: Response){
        try{
            const categorias = await categoriaRepository.buscarAll();
            res.json(categorias);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar listar todas categorias"
            });
        }
    }



}