import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import participantRepository from "../repositories/participant.repository";
import { ValidationError } from "../exceptions/validation-error";
import { ConflictError } from "../exceptions/conflict-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { Participant } from "../models/participant";
import { AppDataSource } from "../../infrastructure/db/data-source";

class ParticipantService {
    async getAllParticipants(): Promise<ParticipantDTO[]> {
        const participants = await participantRepository.findAll();

        if (!participants.length) {
            throw new NotFoundError("Nenhum participante encontrado.");
        }

        return participants.map(this.mapToParticipantDTO);
    }

    async getParticipantByEmail(email: string): Promise<ParticipantDTO> {
        if (!email) {
            throw new ValidationError("O e-mail é obrigatório.");
        }

        const participant = await participantRepository.findByEmail(email);

        if (!participant) {
            throw new NotFoundError(`Participante com e-mail ${email} não encontrado.`);
        }

        return this.mapToParticipantDTO(participant);
    }

    async createParticipant(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        const { email, name, idArea } = participantData;
    
        if (!email || !name) {
            throw new ValidationError("Nome e e-mail são obrigatórios.");
        }
    
        const existingParticipant = await participantRepository.findByEmail(email);
        if (existingParticipant) {
            throw new ConflictError("Já existe um participante com esse e-mail.");
        }
    
        const areasOfExpertise = await participantRepository.findAreasByIds(idArea);
        if (areasOfExpertise.length !== idArea.length) {
            throw new ValidationError("Uma ou mais áreas de expertise fornecidas são inválidas.");
        }
    
        const participant = AppDataSource.getRepository(Participant).create({
            name: participantData.name,
            email: participantData.email,
            companyName: participantData.companyName || "",
            postPermission: participantData.postPermission || 0,
            position: participantData.position,
            contact: participantData.contact,
            areaOfExpertise: areasOfExpertise,
        });
    
        const savedParticipant = await participantRepository.save(participant);
    
        return this.mapToParticipantDTO(savedParticipant);
    }

    async updateParticipant(
        id: number,
        updateData: Partial<CreateParticipantDTO>
    ): Promise<Partial<ParticipantDTO>> {
        // Verifica se o participante existe
        const participant = await participantRepository.findById(id);
        if (!participant) {
            throw new NotFoundError(`Participante com ID ${id} não encontrado.`);
        }

        // Validação de e-mail
        if (updateData.email) {
            const existingParticipant = await participantRepository.findByEmail(updateData.email);
            if (existingParticipant && existingParticipant.idParticipant !== id) {
                throw new ConflictError("Já existe um participante com esse e-mail.");
            }
        }

        // Validação das áreas de expertise
        if (updateData.idArea) {
            const areasOfExpertise = await participantRepository.findAreasByIds(updateData.idArea);
            if (areasOfExpertise.length !== updateData.idArea.length) {
                throw new ValidationError("Uma ou mais áreas de expertise fornecidas são inválidas.");
            }
            participant.areaOfExpertise = areasOfExpertise;
        }

        // Atualiza os dados do participante
        Object.assign(participant, updateData);

        // Salva as alterações
        const updatedParticipant = await participantRepository.save(participant);

        // Retorna apenas os dados atualizados
        return {
            idParticipant: updatedParticipant.idParticipant,
            name: updatedParticipant.name,
            email: updatedParticipant.email,
            position: updatedParticipant.position,
            contact: updatedParticipant.contact,
            companyName: updatedParticipant.companyName,
            postPermission: updatedParticipant.postPermission,
        };
    }


    private mapToParticipantDTO(participant: Participant): ParticipantDTO {
        return {
            idParticipant: participant.idParticipant,
            name: participant.name,
            email: participant.email,
            position: participant.position,
            contact: participant.contact,
            companyName: participant.companyName,
            postPermission: participant.postPermission,
            AreaOfExpertise: participant.areaOfExpertise
                ? participant.areaOfExpertise.map((area) => ({
                      idArea: area.idArea,
                      name: area.name,
                  }))
                : [],
        };
    }
}

export default new ParticipantService();