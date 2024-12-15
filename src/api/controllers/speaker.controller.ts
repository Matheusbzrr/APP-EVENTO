import { Request, Response } from "express";
import speakerService from "../../domain/services/speaker.service";
import { CreateSpeakerDTO } from "../../domain/dtos/speaker/createSpeaker.dto";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { ConflictError } from "../../domain/exceptions/conflict-error";


class SpeakerController {
    constructor() {
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const speakers = await speakerService.getAllSpeakers();
            res.json(speakers);
        } catch (err) {
            console.error("Erro ao listar speakers:", err);
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
            console.log("Dados recebidos para criação:", speakerData); 

            const speaker = await speakerService.createSpeaker(speakerData);
            res.status(201).json(speaker);
        } catch (err: any) {
            console.error("Erro ao criar speaker:", err.message || err);
            if (err instanceof ConflictError) {
                res.status(409).send({ message: err.message })
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
}

export default SpeakerController;