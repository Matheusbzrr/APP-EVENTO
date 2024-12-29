// src/services/participant.service.ts
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from '../dtos/participant/participant.dto';
import participantRepository from "../repositories/participant.repository";
import { Participant } from '../models/participant';
class ParticipantService {
    async getAllParticipants(): Promise<ParticipantDTO[]> {
        return await participantRepository.findAll();
    }
    async getParticipantByEmail(email: string): Promise<ParticipantDTO | null> {
        return await participantRepository.findByEmail(email);
    }
    async createParticipant(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        return await participantRepository.create(participantData);
    }
    async updateParticipant(id: number, updateData: Partial<CreateParticipantDTO>): Promise<ParticipantDTO> {
        return await participantRepository.updateParticipant(id, updateData);
    }}

export default new ParticipantService();
