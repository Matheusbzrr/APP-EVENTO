import { Request, Response } from "express";
import areaOfExpertiseService from "../services/areaOfExpertise.service";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";

class AreaOfExpertiseController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const areas = await areaOfExpertiseService.getAllAreas();
            res.json(areas);
        } catch (err) {
            console.error("Erro ao listar áreas de especialização:", err);
            res.status(500).send({ message: "Erro ao tentar listar todas as áreas de especialização" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const areaData: CreateAreaOfExpertiseDTO = req.body;
            console.log("Dados recebidos para criação de área de especialização:", areaData);

            const area = await areaOfExpertiseService.createArea(areaData);
            res.status(201).json(area);
        } catch (err: any) {
            console.error("Erro ao criar área de especialização:", err.message || err);
            res.status(500).send({
                message: "Erro ao criar área de especialização",
                error: err.message || "Erro desconhecido",
            });
        }
    }
}

export default new AreaOfExpertiseController();
