import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ConflictError } from "../exceptions/conflict-error";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { ValidationError } from "../exceptions/validation-error";
import { Participant } from "../models/participant";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { ParticipantDTO } from "../dtos/participant/participant.dto";

class ParticipantRepository {
    participantRepository = AppDataSource.getRepository(Participant);
    areaOfExpertiseRepository = AppDataSource.getRepository(AreaOfExpertise);

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
                relations: ["areaOfExpertise"],
            });

            if (!participant) {
                throw new NotFoundError(`Participante com e-mail ${email} não encontrado.`);
            }

            return this.mapToParticipantDTO(participant);
        } catch (error: any) {
            this.handleRepositoryError(error, "buscar o Participante pelo e-mail");
        }
    }

    async findAll(): Promise<ParticipantDTO[]> {
        try {
            const participants = await this.participantRepository.find({
                relations: ["areaOfExpertise"],
            });

            if (!participants.length) {
                throw new NotFoundError("Nenhum participante encontrado.");
            }

            return participants.map(this.mapToParticipantDTO);
        } catch (error: any) {
            this.handleRepositoryError(error, "buscar todos os Participantes");
        }
    }

    async create(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        try {
            const { email, name, idArea, companyName, postPermission , contact, position  } = participantData;

            if (!email || !name) {
                throw new ValidationError("Nome e e-mail são obrigatórios.");
            }

            const participantExists = await this.participantRepository.findOneBy({ email });
            if (participantExists) {
                throw new ConflictError("Já existe um participante com esse e-mail.");
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                throw new ValidationError("O e-mail fornecido não tem um formato válido.");
            }

            const areasOfExpertise = await this.areaOfExpertiseRepository.findByIds(idArea);
            if (areasOfExpertise.length !== idArea.length) {
                throw new ValidationError("Uma ou mais áreas de expertise fornecidas são inválidas.");
            }

            const participant = this.participantRepository.create({
                name,
                email,
                companyName,
                postPermission,
                position,
                contact,
                areaOfExpertise: areasOfExpertise,
            });

            const savedParticipant = await this.participantRepository.save(participant);

            return this.mapToParticipantDTO(savedParticipant);
        } catch (error: any) {
            this.handleRepositoryError(error, "criar o Participante");
        }
    }
    async updateParticipant(id: number, updateData: Partial<CreateParticipantDTO>): Promise<ParticipantDTO> {
        try {
            const participant = await this.participantRepository.findOne({
                where: { idParticipant: id },
                relations: ["areaOfExpertise"],
            });
    
            if (!participant) {
                throw new NotFoundError(`Participante com ID ${id} não encontrado.`);
            }
    
            if (updateData.email) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(updateData.email)) {
                    throw new ValidationError("O e-mail fornecido não tem um formato válido.");
                }
    
                const emailExists = await this.participantRepository.findOneBy({
                    email: updateData.email,
                });
    
                if (emailExists && emailExists.idParticipant !== id) {
                    throw new ConflictError("Já existe um participante com esse e-mail.");
                }
            }
    
            if (updateData.idArea) {
                const areasOfExpertise = await this.areaOfExpertiseRepository.findByIds(updateData.idArea);
                if (areasOfExpertise.length !== updateData.idArea.length) {
                    throw new ValidationError("Uma ou mais áreas de expertise fornecidas são inválidas.");
                }
                participant.areaOfExpertise = areasOfExpertise;
            }
    
            Object.assign(participant, {
                name: updateData.name || participant.name,
                email: updateData.email || participant.email,
                companyName: updateData.companyName || participant.companyName,
                position: updateData.position || participant.position,
                contact: updateData.contact || participant.contact,
                postPermission: updateData.postPermission ?? participant.postPermission,
            });
    
            const updatedParticipant = await this.participantRepository.save(participant);
    
            return this.mapToParticipantDTO(updatedParticipant);
        } catch (error: any) {
            this.handleRepositoryError(error, "atualizar o Participante");
        }
    }

    private mapToParticipantDTO(participant: Participant): ParticipantDTO {
        return {
            idParticipant: participant.idParticipant,
            name: participant.name,
            email: participant.email,
            companyName: participant.companyName,
            position: participant.position,
            contact: participant.contact,
            postPermission: participant.postPermission,
            AreaOfExpertise: participant.areaOfExpertise
                ? participant.areaOfExpertise.map((area: AreaOfExpertise) => ({
                      idArea: area.idArea,
                      name: area.name,
                  }))
                : [],
        };
    }

    private handleRepositoryError(error: any, action: string): never {
        if (
            error instanceof ConflictError ||
            error instanceof ValidationError ||
            error instanceof NotFoundError
        ) {
            throw error;
        } else if (error.name === "QueryFailedError") {
            throw new DatabaseError(`Falha ao ${action} no banco de dados!`);
        } else {
            throw new TypeError(`Falha inesperada ao ${action}!`);
        }
    }
}

export default new ParticipantRepository();