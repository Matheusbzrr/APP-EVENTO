// src/repositories/participant.repository.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import { Participant } from "../models/participant";

class ParticipantRepository {
    participantRepository = AppDataSource.getRepository(Participant);

    async findAll(): Promise<CreateParticipantDTO[]> {
        try {
            const participants = await this.participantRepository.find();
            return participants.map(participant => ({
                idParticipant: participant.idParticipant,
                name: participant.name,
                email: participant.email,
                companyName: participant.companyName,
                postPermission: participant.postPermission,
            }));
        } catch (error) {
            console.error("Erro ao buscar todos os participantes:", error);
            throw new Error("Falha ao retornar os Participantes!");
        }
    }

    async create(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        try {
            const participant = this.participantRepository.create(participantData);
            const savedParticipant = await this.participantRepository.save(participant);
            return {
                idParticipant: savedParticipant.idParticipant,
                name: savedParticipant.name,
                email: savedParticipant.email,
                companyName: savedParticipant.companyName,
                postPermission: savedParticipant.postPermission,
            };
        } catch (error) {
            console.error("Erro ao criar participante:", error);
            throw new Error("Falha ao criar o Participante!");
        }
    }
}

export default new ParticipantRepository();