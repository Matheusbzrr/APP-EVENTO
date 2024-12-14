// src/repositories/participant.repository.ts
import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateParticipantDTO } from "../dtos/participant/CreateParticipantDTO";
import { ParticipantDTO } from "../dtos/participant/participant.dto";
import { Participant } from "../models/participant";
import { NotFoundError, ValidationError, DatabaseError} from "../../infrastructure/utils/CustomErrors";

class ParticipantRepository {
    participantRepository = AppDataSource.getRepository(Participant);

    async findByEmail(email: string): Promise<ParticipantDTO | null> {
        try {

            if (!email) {
                throw new ValidationError("O e-mail é obrigatório.");
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
            if (!(error instanceof NotFoundError || error instanceof ValidationError)) {
                console.error("Erro ao buscar participante por e-mail:", error);
                throw new DatabaseError("Erro ao enviar os dados");
            }
            throw error;
        }
    }
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
            throw new DatabaseError("Erro ao retornar os Participantes!");
        }
    }

    async create(participantData: CreateParticipantDTO): Promise<ParticipantDTO> {
        try {

            if (!participantData.email || !participantData.name) {
                throw new ValidationError("Nome e e-mail são obrigatórios.");
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
            throw new DatabaseError("Falha ao salvar o Participante no banco de dados!");
        }
    }
}

export default new ParticipantRepository();