import { CreateSaveActivityDTO } from "../dtos/saveActivity/createSaveActivity";
import { SaveActivityDTO } from "../dtos/saveActivity/saveActivityDTO";
import SaveActivityRepository from "../repositories/SaveActivity.repository";

class SaveActivityService {
    async getAllSaveActivities(): Promise<SaveActivityDTO[]> {
        return await SaveActivityRepository.findAll();
    }

    async createSaveActivity(saveActivityData: CreateSaveActivityDTO): Promise<SaveActivityDTO> {
        return await SaveActivityRepository.create(saveActivityData);
    }
    async getSaveActivitiesByParticipantId(idParticipant: number): Promise<SaveActivityDTO[]> {
        return await SaveActivityRepository.findByParticipantId(idParticipant);
    }
}

export default new SaveActivityService();