// src/services/participant.service.ts
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import participantRepository from "../repositories/participant.repository";
class ParticipantService {
    async getAllParticipants(): Promise<ParticipantDTO[]> {
        return await participantRepository.findAll();
    }

    async createParticipant(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        return await participantRepository.create(participantData);
    }
}

export default new ParticipantService();
