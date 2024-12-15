// src/repositories/participant.repository.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import { ConflictError } from "../exceptions/conflict-error";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { ValidationError } from "../exceptions/validation-error";
import { Participant } from "../models/participant";


class ParticipantRepository {
    participantRepository = AppDataSource.getRepository(Participant);

    async findByEmail(email: string): Promise<ParticipantDTO | null> {
        try {

            if (!email) {
                throw new ValidationError("O e-mail é obrigatório.");
            } 

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                throw new ValidationError("O e-mail fornecido não tem um formato válido.");
            }

            const participant = await this.participantRepository.findOne({
                where: { email },
            });
    
            if (!participant) {
                throw new NotFoundError(`Participante com e-mail ${email} não encontrado.`);
            }
    
            return {
                idParticipant: participant.idParticipant,
                name: participant.name,
                email: participant.email,
                companyName: participant.companyName,
                postPermission: participant.postPermission,
            };
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error instanceof ValidationError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                 throw new DatabaseError("Falha ao criar o Participante no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar todos os Participantes!");
            }
            
        }
    }
    async findAll(): Promise<CreateParticipantDTO[]> {
        try {
            const participants = await this.participantRepository.find();

            if (!participants) {
                throw new NotFoundError("Nenhum participante encontrado.");
            }

            return participants.map(participant => ({
                idParticipant: participant.idParticipant,
                name: participant.name,
                email: participant.email,
                companyName: participant.companyName,
                postPermission: participant.postPermission,
            }));
        } catch (error: any) {
            console.error("Erro ao criar participante:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                 throw new DatabaseError("Falha ao buscar o Participante no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar todos os Participantes!");
            }
            
        }
    }

    async create(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        try {
            if (!participantData.email || !participantData.name) {
                throw new ValidationError("Nome e e-mail são obrigatórios.");
            }

            const participantExists = await this.participantRepository.findOneBy({ email: participantData.email})
            if (participantExists) {
                throw new ConflictError("Já existe um participante com esse e-mail.");
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(participantData.email)) {
                throw new ValidationError("O e-mail fornecido não tem um formato válido.");
            }
            
            const participant = this.participantRepository.create(participantData);
            const savedParticipant = await this.participantRepository.save(participant);
            return {
                idParticipant: savedParticipant.idParticipant,
                name: savedParticipant.name,
                email: savedParticipant.email,
                companyName: savedParticipant.companyName,
                postPermission: savedParticipant.postPermission,
            };
        } catch (error: any) {
            console.error("Erro ao criar participante:", error);
            if (error instanceof ConflictError) {
                throw error;
            } else if (error instanceof ValidationError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar o Participante no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao criar o participante!");
            }
        }
    }
}

export default new ParticipantRepository();