import { Request, Response } from "express";
import categoriaRepository from "../repositories/categoria.repository";
import { CategoriaDTO } from "../dtos/categoria/categoria.dto";
import { CreateCategoriaDTO } from "../dtos/categoria/CreateCategoriaDTO";

export default class CategoriaController {

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const categorias: CategoriaDTO[] = await categoriaRepository.findAll();
            res.json(categorias);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar listar todas as categorias"
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const categoriaData: CreateCategoriaDTO = req.body; 
            const categoria: CategoriaDTO = await categoriaRepository.create(categoriaData);
            res.status(201).json(categoria); 
        } catch (err) {
            res.status(500).send({
                message: "Erro ao criar categoria"
            });
        }
    }
}
