import { Request, Response } from "express";
import checkinService from "../../domain/services/checkin.service";
import { CreateCheckinDTO } from "../../domain/dtos/checkin/CreateCheckinDTO";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { RecordNotFoundError } from "../../domain/exceptions/record-not-found";

class CheckinController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const checkins = await checkinService.getAllCheckins();
            res.json(checkins);
        } catch (err: any) {
            console.error("Erro ao listar checkins:", err);

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
            const checkinData: CreateCheckinDTO = req.body;

            const checkin = await checkinService.createCheckin(checkinData);
            res.status(201).json(checkin);
        } catch (err: any) {
            console.error("Erro ao criar checkin:", err);

            if (err instanceof RecordNotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else {
                res.status(500).send({
                    message: "Erro interno ao criar checkin.",
                    error: err.message || "Erro desconhecido",
                });
            }
        }
    }
}

export default new CheckinController();
