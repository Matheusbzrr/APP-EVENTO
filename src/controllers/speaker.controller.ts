import { Request, Response } from "express";
import speakerService from "../services/speaker.service";
import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";

class SpeakerController {
    constructor() {
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const speakers = await speakerService.getAllSpeakers();
            res.json(speakers);
        } catch (err) {
            console.error("Erro ao listar speakers:", err); 
            res.status(500).send({ message: "Erro ao tentar listar todos os speakers" });
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
            res.status(500).send({
                message: "Erro ao criar speaker",
                error: err.message || "Erro desconhecido"
            });
        }
    }
}

export default SpeakerController;