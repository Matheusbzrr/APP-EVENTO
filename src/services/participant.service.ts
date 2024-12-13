// src/services/participant.service.ts
import participantRepository from "../repositories/participant.repository";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";

class ParticipantService {
    async getAllParticipants(): Promise<ParticipantDTO[]> {
        return await participantRepository.findAll();
    }

    async createParticipant(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        return await participantRepository.create(participantData);
    }
}

export default new ParticipantService();
