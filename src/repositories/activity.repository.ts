import { AppDataSource } from "../db/data-source";
import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import { Activity } from "../models/activity";
import { Speaker } from "../models/speaker";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";

class ActivityRepository {
    activityRepository = AppDataSource.getRepository(Activity);
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<ActivityDTO[]> {
        try {
            const activities = await this.activityRepository
                .createQueryBuilder('activity')
                .leftJoinAndSelect('activity.checkins', 'checkin')
                .leftJoinAndSelect('checkin.participant', 'participant')
                .leftJoinAndSelect('checkin.activity', 'activityRelation')
                .leftJoinAndSelect('activity.speaker', 'speaker')
                .getMany();

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
            }));
        } catch (error) {
            console.error("Erro ao buscar todas as atividades:", error);
            throw new Error("Falha ao retornar as Atividades!");
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
            };
        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            throw new Error("Falha ao criar a Atividade!");
        }
    }
}

export default new ActivityRepository();