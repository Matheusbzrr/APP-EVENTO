import { Request, Response } from "express";

import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { RecordNotFoundError } from "../../domain/exceptions/record-not-found";
import SaveActivityService from "../../domain/services/SaveActivity.service";
import { CreateSaveActivityDTO } from "../../domain/dtos/saveActivity/createSaveActivity";

class SaveActivityController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const saveActivities = await SaveActivityService.getAllSaveActivities();
            res.json(saveActivities);
        } catch (err: any) {
            console.error("Erro ao listar atividades salvas:", err);

            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro desconhecido" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const saveActivityData: CreateSaveActivityDTO = req.body;

            const saveActivity = await SaveActivityService.createSaveActivity(saveActivityData);
            res.status(201).json(saveActivity);
        } catch (err: any) {
            console.error("Erro ao criar atividade salva:", err);

            if (err instanceof RecordNotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({
                    message: "Erro interno ao criar atividade salva.",
                    error: err.message || "Erro desconhecido",
                });
            }
        }
    }
    async findByParticipantId(req: Request, res: Response): Promise<void> {
        try {
            const { idParticipant } = req.params;

            const saveActivities = await SaveActivityService.getSaveActivitiesByParticipantId(Number(idParticipant));
            res.json(saveActivities);
        } catch (err: any) {
            console.error("Erro ao buscar atividades salvas por ID do participante:", err);
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro desconhecido" });
            }
        }
    }
}

export default new SaveActivityController();