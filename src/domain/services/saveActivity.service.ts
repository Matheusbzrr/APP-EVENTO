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
        if (!saveActivities.length) {
            throw new NotFoundError(`Nenhuma atividade salva encontrada para o participante com ID ${idParticipant}.`);
        }

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
                description: saveActivity.activity.description,
                time: saveActivity.activity.time,
                date: saveActivity.activity.date,
                location: saveActivity.activity.location,
                checkins: [],
                speaker: [],
                areaOfExpertise: [],
            },
        };
    }
}

export default new SaveActivityService();