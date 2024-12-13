import { AppDataSource } from "../db/data-source";
import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import { Activity } from "../models/activity";
import { Speaker } from "../models/speaker";
import { convertTimeToCorrectFormat } from "../utils/time-utils";

class ActivityRepository {
    activityRepository = AppDataSource.getRepository(Activity);
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<ActivityDTO[]> {
        try {
            const activities = await this.activityRepository.find({
                relations: ["checkins", "speaker"],
            });

            return activities.map(activity => ({
                idActivity: activity.idActivity,
                title: activity.title,
                description: activity.description,
                time: activity.time,
                location: activity.location,
                checkins: activity.checkins.map(checkin => ({
                    idCheckin: checkin.idCheckin,
                    participantId: checkin.participant.idParticipant,
                    activity: checkin.activity.idActivity,
                    checkinDateTime: checkin.checkinDateTime,
                })),
                speaker: activity.speaker
                    ? activity.speaker.map(speaker => ({
                          idSpeaker: speaker.idSpeaker,
                          name: speaker.name,
                      }))
                    : [],
            }));
        } catch (error) {
            console.error("Erro ao buscar todas as atividades:", error);
            throw new Error("Falha ao retornar as Atividades!");
        }
    }

    async create(activityData: CreateActivityDTO): Promise<ActivityDTO> {
        try {
            const activity = this.activityRepository.create(activityData);

            if (activityData.time) {
                activity.time = convertTimeToCorrectFormat(activityData.time);
            }

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
                location: savedActivity.location,
                speaker: savedActivity.speaker?.map(speaker => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name,
                })),
                checkins: [], // Assumindo que nenhuma checagem está inclusa na criação
            };
        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            throw new Error("Falha ao criar a Atividade!");
        }
    }
}

export default new ActivityRepository();