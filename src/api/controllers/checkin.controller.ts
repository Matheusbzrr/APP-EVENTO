import { Request, Response } from "express";
import checkinService from "../../domain/services/checkin.service";
import { CreateCheckinDTO } from "../../domain/dtos/checkin/CreateCheckinDTO";
import {  ValidationError,
    DatabaseError,
    NotFoundError,
    ConflictError,
    PermissionError } from "../../infrastructure/utils/CustomErrors";

class CheckinController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const checkins = await checkinService.getAllCheckins();
            res.json(checkins);
        } catch (err: any) {
            console.error("Erro ao listar checkins:", err);

            if (err instanceof DatabaseError) {
                res.status(500).send({ message: "Erro no banco ao listar checkins." });
            } else {
                res.status(500).send({ message: "Erro interno ao tentar listar todos os checkins." });
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

            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof ConflictError) {
                res.status(409).send({ message: err.message });
            } else if (err instanceof PermissionError) {
                res.status(403).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(500).send({ message: "Erro ao salvar no banco de dados." });
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
