import { Request, Response } from "express";
import checkinService from "../../domain/services/checkin.service";
import { CreateCheckinDTO } from "../../domain/dtos/checkin/CreateCheckinDTO";

class CheckinController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const checkins = await checkinService.getAllCheckins();
            res.json(checkins);
        } catch (err) {
            console.error("Erro ao listar checkins:", err);
            res.status(500).send({ message: "Erro ao tentar listar todos os checkins" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const checkinData: CreateCheckinDTO = req.body;

            const checkin = await checkinService.createCheckin(checkinData);
            res.status(201).json(checkin);
        } catch (err: any) {
            console.error("Erro ao criar checkin:", err.message || err);
            res.status(500).send({
                message: "Erro ao criar checkin",
                error: err.message || "Erro desconhecido",
            });
        }
    }
}

export default new CheckinController();
