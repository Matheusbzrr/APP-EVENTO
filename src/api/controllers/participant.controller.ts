import { Request, Response } from "express";
import participantService from "../../domain/services/participant.service";
import { CreateParticipantDTO } from "../../domain/dtos/participant/CreateParticipantDTO";

class ParticipantController {
    async findByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
    
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
            console.error("Erro ao buscar participante por e-mail:", err);
            res.status(500).send({ message: "Erro ao buscar participante por e-mail" });
        }
    }
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
