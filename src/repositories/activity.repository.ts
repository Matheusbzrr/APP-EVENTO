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
    
            return activities
                .filter(activity => !!activity) 
                .map(activity => ({
                    idActivity: activity.idActivity ?? 0, 
                    title: activity.title ?? "Sem título",
                    description: activity.description ?? "Sem descrição",
                    time: activity.time ?? "00:00",
                    location: activity.location ?? "Sem local",
                    checkins: activity.checkins
                        ? activity.checkins
                              .filter(checkin => !!checkin) 
                              .map(checkin => ({
                                  idCheckin: checkin.idCheckin ?? 0,
                                  participantId: checkin.participant?.idParticipant ?? null,
                                  activity: checkin.activity?.idActivity ?? 0,
                                  checkinDateTime: checkin.checkinDateTime ?? new Date(),
                              }))
                        : [],
                    speaker: activity.speaker
                        ? activity.speaker
                              .filter(speaker => !!speaker) 
                              .map(speaker => ({
                                  idSpeaker: speaker.idSpeaker ?? 0,
                                  name: speaker.name ?? "Sem nome",
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
                checkins: [], 
            };
        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            throw new Error("Falha ao criar a Atividade!");
        }
    }
}

export default new ActivityRepository();