import { CreateSaveActivityDTO } from "../dtos/saveActivity/createSaveActivity";
import { SaveActivityDTO } from "../dtos/saveActivity/saveActivityDTO";
import saveActivityRepository from "../repositories/saveActivity.repository";
import { NotFoundError } from "../exceptions/not-found-error";
import { SaveActivity } from "../models/saveActivity";

class SaveActivityService {
    async getAllSaveActivities(): Promise<SaveActivityDTO[]> {
        const saveActivities = await saveActivityRepository.findAll();
        if (!saveActivities.length) {
            throw new NotFoundError("Nenhuma atividade salva encontrada.");
        }

        return saveActivities.map(this.mapToDTO);
    }

    async createSaveActivity(saveActivityData: CreateSaveActivityDTO): Promise<SaveActivityDTO> {
        const saveActivity = new SaveActivity();
        saveActivity.participant = { idParticipant: saveActivityData.idParticipant } as any;
        saveActivity.activity = { idActivity: saveActivityData.idActivity } as any;

        const savedSaveActivity = await saveActivityRepository.save(saveActivity);
        return this.mapToDTO(savedSaveActivity);
    }

    async getSaveActivitiesByParticipantId(idParticipant: number): Promise<SaveActivityDTO[]> {
        const saveActivities = await saveActivityRepository.findByParticipantId(idParticipant);

        return saveActivities.map(this.mapToDTO);
    }

    async deleteSaveActivity(idSaveActivity: number): Promise<void> {
        await saveActivityRepository.delete(idSaveActivity);
    }

    private mapToDTO(saveActivity: SaveActivity): SaveActivityDTO {
        return {
            idSaveActivity: saveActivity.idSaveActivity,
            idParticipant: saveActivity.participant.idParticipant,
            activity: {
                idActivity: saveActivity.activity.idActivity,
                title: saveActivity.activity.title,
                description: saveActivity.activity.description || "Sem descrição",
                time: saveActivity.activity.time,
                date: saveActivity.activity.date,
                location: saveActivity.activity.location || "Localização não informada",
                checkins: saveActivity.activity.checkins?.map((checkin) => ({
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
                })) || [],
                speaker: saveActivity.activity.speaker?.map((speaker) => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name || "Sem nome",
                    description: speaker.description || "Sem descrição",
                    role: speaker.role || "Sem função",
                    company: speaker.company || "Sem empresa",
                })) || [],
                areaOfExpertise: saveActivity.activity.areaOfExpertise?.map((area) => ({
                    idArea: area.idArea,
                    name: area.name,
                })) || [],
            },
        };
    }
}

export default new SaveActivityService();