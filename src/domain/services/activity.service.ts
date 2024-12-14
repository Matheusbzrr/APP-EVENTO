
import { ActivityDTO } from "../dtos/activity/activity.dto";
import { CreateActivityDTO } from "../dtos/activity/createActivity.dto";
import activityRepository from "../repositories/activity.repository";

class ActivityService {
    async getAllActivities(): Promise<ActivityDTO[]> {
        return await activityRepository.findAll();
    }

    async createActivity(activityData: CreateActivityDTO): Promise<ActivityDTO> {
        return await activityRepository.create(activityData);
    }
}

export default new ActivityService();
