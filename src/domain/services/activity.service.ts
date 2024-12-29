import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import activityRepository from "../repositories/activity.repository";
import { ValidationError } from "../exceptions/validation-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { Activity } from "../models/activity";

class ActivityService {
    async getAllActivities(): Promise<ActivityDTO[]> {
        const activities = await activityRepository.findAll();

        if (!activities.length) {
            throw new NotFoundError("Nenhuma atividade disponível no momento.");
        }

        return activities.map(this.mapToActivityDTO);
    }

    async getActivityById(id: number): Promise<ActivityDTO> {
        const activity = await activityRepository.findById(id);

        if (!activity) {
            throw new NotFoundError("Atividade não encontrada.");
        }

        return this.mapToActivityDTO(activity);
    }

    async createActivity(activityData: CreateActivityDTO): Promise<ActivityDTO> {
        const { title, date, time, location, speakerId, idArea } = activityData;

        if (!title || !date || !time || !location || !speakerId || !idArea) {
            throw new ValidationError("Dados obrigatórios faltando: título, data, hora, localização, palestrantes ou áreas de expertise.");
        }

        if (isNaN(new Date(date).getTime())) {
            throw new ValidationError("O campo 'data' deve ser uma data válida.");
        }

        if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
            throw new ValidationError("O campo 'hora' deve ser um horário válido no formato HH:mm.");
        }

        const speakers = await activityRepository.findSpeakersByIds(speakerId);
        const areasOfExpertise = await activityRepository.findAreasByIds(idArea);

        const activity = activityRepository.create({
            title,
            description: activityData.description || "Sem descrição",
            time,
            date: new Date(date),
            location,
            speaker: speakers,
            areaOfExpertise: areasOfExpertise,
        });

        const savedActivity = await activityRepository.save(activity);

        return this.mapToActivityDTO(savedActivity);
    }

    async deleteActivity(id: number): Promise<void> {
        await activityRepository.delete(id);
    }

    private mapToActivityDTO(activity: Activity): ActivityDTO {
        return {
            idActivity: activity.idActivity,
            title: activity.title,
            description: activity.description,
            time: activity.time,
            date: activity.date,
            location: activity.location,
            speaker: activity.speaker?.map(speaker => ({
                idSpeaker: speaker.idSpeaker,
                name: speaker.name || "Sem nome",
                description: speaker.description || "Sem descrição",
                role: speaker.role || "Sem função",
                company: speaker.company || "Sem empresa",
            })) ?? [],
            areaOfExpertise: activity.areaOfExpertise?.map(area => ({
                idArea: area.idArea,
                name: area.name,
            })) ?? [],
            checkins: activity.checkins?.map(checkin => ({
                idCheckin: checkin.idCheckin,
                participant: checkin.participant
                    ? {
                          idParticipant: checkin.participant.idParticipant,
                          name: checkin.participant.name || "Sem nome",
                          email: checkin.participant.email || "Sem e-mail",
                          companyName: checkin.participant.companyName || "Sem empresa",
                          position: checkin.participant.position || "Sem cargo",
                          contact: checkin.participant.contact || "Sem contato",
                          postPermission: checkin.participant.postPermission || 0,
                          AreaOfExpertise: checkin.participant.areaOfExpertise?.map(area => ({
                              idArea: area.idArea,
                              name: area.name,
                          })) ?? [],
                      }
                    : null,
                idActivity: checkin.activity?.idActivity || 0,
                checkinDateTime: checkin.checkinDateTime,
            })) ?? [],
        };
    }
}

export default new ActivityService();