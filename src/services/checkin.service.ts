import checkinRepository from "../repositories/checkin.repository";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";

class CheckinService {
    async getAllCheckins(): Promise<CheckinDTO[]> {
        return await checkinRepository.findAll();
    }

    async createCheckin(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        return await checkinRepository.create(checkinData);
    }
}

export default new CheckinService();
