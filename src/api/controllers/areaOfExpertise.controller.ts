import { Request, Response } from "express";
import areaOfExpertiseService from "../../domain/services/areaOfExpertise.service";
import { CreateAreaOfExpertiseDTO } from "../../domain/dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { ValidationError } from "../../domain/exceptions/validation-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";

class AreaOfExpertiseController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const areas = await areaOfExpertiseService.getAllAreas();
            res.json(areas);
        } catch (err: any) {
            console.error("Erro ao listar áreas de especialização:", err);

            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else {
                res.status(500).send({ message: "Erro desconhecido" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const areaData: CreateAreaOfExpertiseDTO = req.body;
            console.log("Dados recebidos para criação de área de especialização:", areaData);

            const area = await areaOfExpertiseService.createArea(areaData);
            res.status(201).json(area);
        } catch (err: any) {
            console.error("Erro ao criar área de especialização:", err);

            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message:err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else {
                res.status(500).send({
                message: "Erro ao criar área de especialização",
                error: err.message || "Erro desconhecido",
                });
            }
        } 
    }
}

export default new AreaOfExpertiseController();
