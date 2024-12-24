import { AppDataSource } from "../../infrastructure/db/data-source";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { RecordNotFoundError } from "../exceptions/record-not-found";
import { SaveActivity } from "../models/saveActivity";
import { Participant } from "../models/participant";
import { Activity } from "../models/activity";
import { SaveActivityDTO } from "../dtos/saveActivity/saveActivityDTO";
import { CreateSaveActivityDTO } from "../dtos/saveActivity/createSaveActivity";

class SaveActivityRepository {
    saveActivityRepository = AppDataSource.getRepository(SaveActivity);

    async findAll(): Promise<SaveActivityDTO[]> {
        try {
            const saveActivities = await this.saveActivityRepository
                .createQueryBuilder("saveActivity")
                .leftJoinAndSelect("saveActivity.participant", "participant")
                .leftJoinAndSelect("saveActivity.activity", "activity")
                .getMany();

            if (!saveActivities.length) {
                throw new NotFoundError("Nenhuma atividade salva encontrada.");
            }

            return saveActivities.map(saveActivity => ({
                idSaveActivity: saveActivity.idSaveActivity,
                participant: saveActivity.participant
                    ? {
                          idParticipant: saveActivity.participant.idParticipant,
                          name: saveActivity.participant.name ?? "Sem nome",
                          email: saveActivity.participant.email ?? "Sem e-mail",
                          companyName: saveActivity.participant.companyName ?? "Sem empresa",
                          postPermission: saveActivity.participant.postPermission ?? 0,
                      }
                    : null,
                idActivity: saveActivity.activity?.idActivity ?? 0,
            })) as SaveActivityDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar todas as atividades salvas:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar as atividades salvas no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar as atividades salvas!");
            }
        }
    }

    async create(saveActivityData: CreateSaveActivityDTO): Promise<SaveActivityDTO> {
        try {
            const saveActivity = this.saveActivityRepository.create({
                participant: { idParticipant: saveActivityData.idParticipant } as Participant,
                activity: { idActivity: saveActivityData.idActivity } as Activity,
            });
    
            const savedSaveActivity = await this.saveActivityRepository.save(saveActivity);
    
            return {
                idSaveActivity: savedSaveActivity.idSaveActivity,
                participant: savedSaveActivity.participant
                    ? {
                          idParticipant: savedSaveActivity.participant.idParticipant,
                          name: savedSaveActivity.participant.name ?? "Sem nome",
                          email: savedSaveActivity.participant.email ?? "Sem e-mail",
                          position: savedSaveActivity.participant.position ?? "Sem cargo",
                          contact: savedSaveActivity.participant.contact ?? "Sem contato",
                          companyName: savedSaveActivity.participant.companyName ?? "Sem empresa",
                          postPermission: savedSaveActivity.participant.postPermission ?? 0,
                          AreaOfExpertise: savedSaveActivity.participant.areaOfExpertise
                              ? savedSaveActivity.participant.areaOfExpertise.map(area => ({
                                    idArea: area.idArea,
                                    name: area.name,
                                }))
                              : [],
                      }
                    : null,
                idActivity: savedSaveActivity.activity?.idActivity ?? 0,
            };
        } catch (error: any) {
            console.error("Erro ao criar atividade salva:", error);
            if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar a atividade salva no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao criar a atividade salva!");
            }
        }
    }
    async findByParticipantId(idParticipant: number): Promise<SaveActivityDTO[]> {
        try {
            const saveActivities = await this.saveActivityRepository
                .createQueryBuilder("saveActivity")
                .leftJoinAndSelect("saveActivity.participant", "participant")
                .leftJoinAndSelect("saveActivity.activity", "activity")
                .where("participant.idParticipant = :idParticipant", { idParticipant })
                .getMany();

            if (!saveActivities.length) {
                throw new NotFoundError(`Nenhuma atividade salva encontrada para o participante com ID ${idParticipant}.`);
            }

            return saveActivities.map(saveActivity => ({
                idSaveActivity: saveActivity.idSaveActivity,
                participant: saveActivity.participant
                    ? {
                          idParticipant: saveActivity.participant.idParticipant,
                          name: saveActivity.participant.name ?? "Sem nome",
                          email: saveActivity.participant.email ?? "Sem e-mail",
                          companyName: saveActivity.participant.companyName ?? "Sem empresa",
                          postPermission: saveActivity.participant.postPermission ?? 0,
                      }
                    : null,
                idActivity: saveActivity.activity?.idActivity ?? 0,
            })) as SaveActivityDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar atividades salvas por ID do participante:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar atividades salvas no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar atividades salvas!");
            }
        }
    }
}
export default new SaveActivityRepository();