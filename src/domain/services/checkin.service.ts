import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import checkinRepository from "../repositories/checkin.repository";
class CheckinService {
    async getAllCheckins(): Promise<CheckinDTO[]> {
        return await checkinRepository.findAll();
    }

    async createCheckin(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        return await checkinRepository.create(checkinData);
    }
    async getCheckinsByParticipantId(idParticipant: number): Promise<CheckinDTO[]> {
        return await checkinRepository.getCheckinsByParticipantId(idParticipant);
    }
}

export default new CheckinService();
