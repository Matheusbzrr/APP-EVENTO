import { Request, Response } from "express";
import participantService from "../services/participant.service";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";

class ParticipantController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const participants = await participantService.getAllParticipants(); 
            res.json(participants);
        } catch (err) {
            console.error("Erro ao listar participantes:", err);
            res.status(500).send({ message: "Erro ao tentar listar todos os participantes" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const participantData: CreateParticipantDTO = req.body;
            console.log("Dados recebidos para criação:", participantData); 

            const participant = await participantService.createParticipant(participantData); 
            res.status(201).json(participant);
        } catch (err: any) {
            console.error("Erro ao criar participante:", err.message || err);
            res.status(500).send({ 
                message: "Erro ao criar participante",
                error: err.message || "Erro desconhecido"
            });
        }
    }
}

export default new ParticipantController();
