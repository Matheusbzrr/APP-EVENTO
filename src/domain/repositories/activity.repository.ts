import { AppDataSource } from "../../infrastructure/db/data-source";
import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import { Activity } from "../models/activity";
import { Speaker } from "../models/speaker";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import { DatabaseError } from "../../infrastructure/utils/CustomErrors";

class ActivityRepository {
    activityRepository = AppDataSource.getRepository(Activity);
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<ActivityDTO[]> {
        try {
            const activities = await this.activityRepository
                .createQueryBuilder('activity')
                .leftJoinAndSelect('activity.checkins', 'checkin')
                .leftJoinAndSelect('checkin.participant', 'participant')
                .leftJoinAndSelect('activity.speaker', 'speaker')
                .leftJoinAndSelect('activity.likes', 'like')
                .leftJoinAndSelect('like.participant', 'likeParticipant')
                .getMany();

                
                if (!activities) {
                    console.error("Nenhuma atividade encontrada no banco de dados.");
                    throw new Error("Nenhuma atividade disponível no momento.");
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
                    } : null,
                    idActivity: checkin.activity?.idActivity ?? 0,
                    checkinDateTime: checkin.checkinDateTime,
                })) as CheckinDTO[],
                speaker: activity.speaker?.map(speaker => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name ?? "Sem nome",
                })),
                likes: activity.likes?.map(like => ({
                    idLike: like.idLike,
                    participant: like.participant ? {
                        idParticipant: like.participant.idParticipant,
                        name: like.participant.name ?? "Sem nome",
                        email: like.participant.email ?? "Sem e-mail",
                        companyName: like.participant.companyName ?? "Sem empresa",
                        postPermission: like.participant.postPermission ?? 0,
                    } : null,
                    idActivity: like.activity?.idActivity ?? 0,
                })) as LikeDTO[],
            }));
        } catch (error){ 
        if (error instanceof TypeError) {
            console.error("Erro de tipo:", error.message);
            throw new Error("Erro interno no servidor. Por favor, tente novamente mais tarde.");
        } else if (error instanceof DatabaseError) { 
            console.error("Erro no banco de dados:", error.message);
            throw new Error("Falha ao tentar acessar as Atividades!");
        } else {
            console.error("Erro desconhecido:", error);
            throw new Error("Falha ao retornar as Atividades!");
        }
        }
    }

    async create(activityData: CreateActivityDTO): Promise<ActivityDTO> {
        try {
            const formattedTime = activityData.time;
            const activity = this.activityRepository.create({ 
                ...activityData, 
                time: formattedTime 
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
                })),
                checkins: [],
                likes: [], // Novo campo likes adicionado
            };




        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            throw new Error("Falha ao criar a Atividade!");
        }
    }
}

export default new ActivityRepository();