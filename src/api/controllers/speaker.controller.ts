import { Request, Response } from "express";
import speakerService from "../../domain/services/speaker.service";
import { CreateSpeakerDTO } from "../../domain/dtos/speaker/createSpeaker.dto";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { ConflictError } from "../../domain/exceptions/conflict-error";

class SpeakerController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const speakers = await speakerService.getAllSpeakers();
            res.json(speakers);
        } catch (err) {
            if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao tentar listar todos os palestrantes" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const speakerData: CreateSpeakerDTO = req.body;
            const speaker = await speakerService.createSpeaker(speakerData);
            res.status(201).json(speaker);
        } catch (err: any) {
            if (err instanceof ConflictError) {
                res.status(409).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(500).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({
                    message: "Erro ao criar speaker",
                    error: err.message || "Erro desconhecido"
                });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const idSpeaker = parseInt(req.params.idSpeaker, 10);
            await speakerService.deleteSpeaker(idSpeaker);
            res.status(204).send();
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro ao deletar speaker" });
            }
        }
    }
}

export default SpeakerController;