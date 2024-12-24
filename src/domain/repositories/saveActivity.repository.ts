import { AppDataSource } from "../../infrastructure/db/data-source";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { SaveActivity } from "../models/saveActivity";
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
                .leftJoinAndSelect("activity.areaOfExpertise", "areaOfExpertise")
                .leftJoinAndSelect("activity.speaker", "speaker")
                .getMany();

            if (!saveActivities.length) {
                throw new NotFoundError("Nenhuma atividade salva encontrada.");
            }

            return saveActivities.map(saveActivity => ({
                idSaveActivity: saveActivity.idSaveActivity,
                idParticipant: saveActivity.participant.idParticipant,
                activity: {
                    idActivity: saveActivity.activity.idActivity,
                    title: saveActivity.activity.title,
                    description: saveActivity.activity.description,
                    time: saveActivity.activity.time,
                    date: saveActivity.activity.date,
                    location: saveActivity.activity.location,
                    checkins: saveActivity.activity.checkins?.map(checkin => ({
                        idCheckin: checkin.idCheckin,
                        participant: checkin.participant
                            ? {
                                  idParticipant: checkin.participant.idParticipant,
                                  name: checkin.participant.name ?? "Sem nome",
                                  email: checkin.participant.email ?? "Sem e-mail",
                                  companyName: checkin.participant.companyName ?? "Sem empresa",
                                  postPermission: checkin.participant.postPermission ?? 0,
                                  areaOfExpertise: checkin.participant.areaOfExpertise?.map(area => ({
                                      idArea: area.idArea,
                                      name: area.name,
                                  })) ?? [],
                              }
                            : null,
                        idActivity: checkin.activity?.idActivity ?? 0,
                        checkinDateTime: checkin.checkinDateTime,
                    })) ?? [],
                    speaker: saveActivity.activity.speaker?.map(speaker => ({
                        idSpeaker: speaker.idSpeaker,
                        name: speaker.name ?? "Sem nome",
                        description: speaker.description || "Sem descrição",
                        role: speaker.role || "Sem função",
                        company: speaker.company || "Sem empresa",
                    })) ?? [],
                    areaOfExpertise: saveActivity.activity.areaOfExpertise?.map(area => ({
                        idArea: area.idArea,
                        name: area.name,
                    })) ?? [],
                },
            })) as SaveActivityDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar todas as atividades salvas:", error);
            throw error instanceof NotFoundError
                ? error
                : new DatabaseError("Falha ao buscar atividades salvas no banco de dados!");
        }
    }

    async create(saveActivityData: CreateSaveActivityDTO): Promise<SaveActivityDTO> {
        try {
            const saveActivity = this.saveActivityRepository.create({
                participant: { idParticipant: saveActivityData.idParticipant },
                activity: { idActivity: saveActivityData.idActivity },
            });

            const savedSaveActivity = await this.saveActivityRepository.save(saveActivity);

            return {
                idSaveActivity: savedSaveActivity.idSaveActivity,
                idParticipant: savedSaveActivity.participant.idParticipant,
                activity: {
                    idActivity: savedSaveActivity.activity.idActivity,
                    title: savedSaveActivity.activity.title,
                    description: savedSaveActivity.activity.description,
                    time: savedSaveActivity.activity.time,
                    date: savedSaveActivity.activity.date,
                    location: savedSaveActivity.activity.location,
                    checkins: [],
                    speaker: [],
                    areaOfExpertise: [],
                },
            };
        } catch (error: any) {
            console.error("Erro ao criar atividade salva:", error);
            throw new DatabaseError("Falha ao criar a atividade salva no banco de dados!");
        }
    }

    async findByParticipantId(idParticipant: number): Promise<SaveActivityDTO[]> {
        try {
            const saveActivities = await this.saveActivityRepository
                .createQueryBuilder("saveActivity")
                .leftJoinAndSelect("saveActivity.participant", "participant")
                .leftJoinAndSelect("saveActivity.activity", "activity")
                .leftJoinAndSelect("activity.areaOfExpertise", "areaOfExpertise")
                .leftJoinAndSelect("activity.speaker", "speaker")
                .where("participant.idParticipant = :idParticipant", { idParticipant })
                .getMany();
    
            // Retorna uma lista vazia se não houver atividades salvas
            if (!saveActivities.length) {
                console.warn(`Nenhuma atividade salva encontrada para o participante com ID ${idParticipant}.`);
                return [];
            }
    
            return saveActivities.map(saveActivity => ({
                idSaveActivity: saveActivity.idSaveActivity,
                idParticipant: saveActivity.participant.idParticipant,
                activity: {
                    idActivity: saveActivity.activity.idActivity,
                    title: saveActivity.activity.title,
                    description: saveActivity.activity.description,
                    time: saveActivity.activity.time,
                    date: saveActivity.activity.date,
                    location: saveActivity.activity.location,
                    checkins: saveActivity.activity.checkins?.map(checkin => ({
                        idCheckin: checkin.idCheckin,
                        participant: checkin.participant
                            ? {
                                  idParticipant: checkin.participant.idParticipant,
                                  name: checkin.participant.name ?? "Sem nome",
                                  email: checkin.participant.email ?? "Sem e-mail",
                                  companyName: checkin.participant.companyName ?? "Sem empresa",
                                  postPermission: checkin.participant.postPermission ?? 0,
                                  areaOfExpertise: checkin.participant.areaOfExpertise?.map(area => ({
                                      idArea: area.idArea,
                                      name: area.name,
                                  })) ?? [],
                              }
                            : null,
                        idActivity: checkin.activity?.idActivity ?? 0,
                        checkinDateTime: checkin.checkinDateTime,
                    })) ?? [],
                    speaker: saveActivity.activity.speaker?.map(speaker => ({
                        idSpeaker: speaker.idSpeaker,
                        name: speaker.name ?? "Sem nome",
                        description: speaker.description || "Sem descrição",
                        role: speaker.role || "Sem função",
                        company: speaker.company || "Sem empresa",
                    })) ?? [],
                    areaOfExpertise: saveActivity.activity.areaOfExpertise?.map(area => ({
                        idArea: area.idArea,
                        name: area.name,
                    })) ?? [],
                },
            })) as SaveActivityDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar atividades salvas por ID do participante:", error);
            // Trata outros erros como falhas no banco de dados
            throw new DatabaseError("Falha ao buscar atividades salvas no banco de dados!");
        }
    }
    async delete(idSaveActivity: number): Promise<void> {
        try {
            const result = await this.saveActivityRepository.delete({ idSaveActivity });
    
            if (result.affected === 0) {
                throw new NotFoundError(`Atividade salva com ID ${idSaveActivity} não encontrada.`);
            }
        } catch (error: any) {
            console.error("Erro ao deletar atividade salva:", error);
            throw error.name === "QueryFailedError"
                ? new DatabaseError("Falha ao deletar a atividade salva no banco de dados!")
                : new TypeError("Erro inesperado ao deletar a atividade salva.");
        }
    }
}

export default new SaveActivityRepository();