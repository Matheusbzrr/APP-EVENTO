import { AppDataSource } from "../../infrastructure/db/data-source";
import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import { Activity } from "../models/activity";
import { Speaker } from "../models/speaker";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { SaveActivity } from "../models/saveActivity";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { ValidationError } from "../exceptions/validation-error";
import { SaveActivityDTO } from "../dtos/saveActivity/saveActivityDTO";

class ActivityRepository {
    activityRepository = AppDataSource.getRepository(Activity);
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<ActivityDTO[]> {
        try {
            const activities = await this.activityRepository
                .createQueryBuilder('activity')
                .leftJoinAndSelect('activity.checkins', 'checkin')
                .leftJoinAndSelect('checkin.participant', 'participant')
                .leftJoinAndSelect('participant.areaOfExpertise', 'areaOfExpertise')
                .leftJoinAndSelect('activity.speaker', 'speaker')
                .leftJoinAndSelect('activity.saveActivits', 'saveActivity')
                .leftJoinAndSelect('saveActivity.participant', 'saveActivityParticipant')
                .leftJoinAndSelect('saveActivityParticipant.areaOfExpertise', 'saveActivityParticipantAreaOfExpertise')
                .getMany();

            if (!activities.length) {
                throw new NotFoundError("Nenhuma atividade disponível no momento.");
            }

            return activities.map(activity => ({
                idActivity: activity.idActivity,
                title: activity.title ?? "Sem título",
                description: activity.description ?? "Sem descrição",
                time: activity.time ?? "00:00",
                date: activity.date ?? new Date("2000-01-01"),
                location: activity.location ?? "Sem local",
                checkins: activity.checkins.map(checkin => ({
                    idCheckin: checkin.idCheckin,
                    participant: checkin.participant ? {
                        idParticipant: checkin.participant.idParticipant,
                        name: checkin.participant.name ?? "Sem nome",
                        email: checkin.participant.email ?? "Sem e-mail",
                        companyName: checkin.participant.companyName ?? "Sem empresa",
                        postPermission: checkin.participant.postPermission ?? 0,
                        areaOfExpertise: checkin.participant.areaOfExpertise?.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        })) ?? [],
                    } : null,
                    idActivity: checkin.activity?.idActivity ?? 0,
                    checkinDateTime: checkin.checkinDateTime,
                })) as CheckinDTO[],
                speaker: activity.speaker?.map(speaker => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name ?? "Sem nome",
                    description: speaker.description || "Sem descrição",
                    role: speaker.role || "Sem função",
                    company: speaker.company || "Sem empresa",
                })) ?? [],
                saveActivits: activity.saveActivits?.map(saveActivity => ({
                    idSaveActivity: saveActivity.idSaveActivity,
                    participant: saveActivity.participant ? {
                        idParticipant: saveActivity.participant.idParticipant,
                        name: saveActivity.participant.name ?? "Sem nome",
                        email: saveActivity.participant.email ?? "Sem e-mail",
                        companyName: saveActivity.participant.companyName ?? "Sem empresa",
                        postPermission: saveActivity.participant.postPermission ?? 0,
                        areaOfExpertise: saveActivity.participant.areaOfExpertise?.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        })) ?? [],
                    } : null,
                    idActivity: saveActivity.activity?.idActivity ?? 0,
                })) as SaveActivityDTO[],
            }));
        } catch (error: any) {
            if (error instanceof TypeError) {
                throw new TypeError("Erro interno no servidor. Por favor, tente novamente mais tarde.");
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao tentar acessar as Atividades! Por favor, tente novamente.");
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new Error("Erro desconhecido. Por favor, entre em contato com o suporte.");
            }
        }
    }

    async create(activityData: CreateActivityDTO): Promise<ActivityDTO> {
        try {
            if (!activityData.title || !activityData.date || !activityData.time || !activityData.location || !activityData.speakerId) {
                throw new ValidationError("Dados obrigatórios faltando: título, data, hora, localização ou palestrantes.");
            }

            if (isNaN(new Date(activityData.date).getTime())) {
                throw new ValidationError("O campo 'data' deve ser uma data válida.");
            }

            if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(activityData.time)) {
                throw new ValidationError("O campo 'hora' deve ser um horário válido no formato HH:mm.");
            }

            const activity = this.activityRepository.create({
                ...activityData,
                time: activityData.time,
            });

            if (activityData.speakerId) {
                const speakers = await this.speakerRepository.findByIds(activityData.speakerId);
                activity.speaker = speakers;
            }

            const savedActivity = await this.activityRepository.save(activity);

            return {
                idActivity: savedActivity.idActivity,
                title: savedActivity.title,
                description: savedActivity.description,
                time: savedActivity.time,
                date: savedActivity.date,
                location: savedActivity.location,
                speaker: savedActivity.speaker?.map(speaker => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name,
                    description: speaker.description || "Sem descrição",
                    role: speaker.role || "Sem função",
                    company: speaker.company || "Sem empresa",
                })) ?? [],
                checkins: [],
                saveActivits: [],
            };
        } catch (error: any) {
            if (error instanceof ValidationError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar a Atividade no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao criar a atividade!");
            }
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.activityRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundError("Atividade não encontrada ou já excluída.");
            }
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao deletar a Atividade no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao deletar a atividade!");
            }
        }
    }
}

export default new ActivityRepository();