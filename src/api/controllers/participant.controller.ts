import { Request, Response } from "express";
import participantService from "../../domain/services/participant.service";
import { CreateParticipantDTO } from "../../domain/dtos/participant/CreateParticipantDTO";
import { ValidationError } from "../../domain/exceptions/validation-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { ConflictError } from "../../domain/exceptions/conflict-error";


class ParticipantController {
    async findByEmail(req: Request, res: Response): Promise<void> {
        const email = decodeURIComponent(req.params.email);
        console.log('Email recebido:', email);

        if (!email) {
            res.status(400).send({ message: "E-mail é obrigatório" });
            return;
        }

        try {
            const participant = await participantService.getParticipantByEmail(email);

            if (!participant) {
                res.status(404).send({ message: "Participante não encontrado" });
                return;
            }

            res.json(participant);
        } catch (err) {
            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                console.error("Erro ao buscar participante por e-mail:", err);
                res.status(500).send({ message: "Erro ao buscar participante por e-mail" });
            }
        }
    }
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const participants = await participantService.getAllParticipants();
            res.json(participants);
        } catch (err) {
            if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({
                    message: "Erro ao tentar listar todos os participantes",
                    details: err.message,
                });
            } else {
                console.error("Erro ao listar participantes:", err);
                res.status(500).send({ message: "Erro ao tentar listar todos os participantes" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {const participantData: CreateParticipantDTO = req.body;
            console.log("Dados recebidos para criação:", participantData);

            const participant = await participantService.createParticipant(participantData);
            res.status(201).json(participant);
        } catch (err) {
            if (err instanceof ConflictError) {
                res.status(409).send({ error: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else if (err instanceof ValidationError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                console.error("Erro ao criar participante:", err);
                res.status(500).send({ message: "Erro ao criar participante" });
            }
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.status(400).send({ message: "O ID do participante é inválido." });
                return;
            }

            const updateData = req.body;
            console.log("Dados recebidos para atualização:", updateData);

            const updatedParticipant = await participantService.updateParticipant(id, updateData);

            res.status(200).json(updatedParticipant);
        } catch (err) {
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof ConflictError) {
                res.status(409).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                console.error("Erro ao atualizar participante:", err);
                res.status(500).send({ message: "Erro ao atualizar participante" });
            }
        }
    }
}

export default new ParticipantController();


