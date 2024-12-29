import { AppDataSource } from "../../infrastructure/db/data-source";
import { Activity } from "../models/activity";
import { Speaker } from "../models/speaker";
import { AreaOfExpertise } from "../models/areaOfExpertise";

class ActivityRepository {
    async findAll(): Promise<Activity[]> {
        return await AppDataSource.getRepository(Activity)
            .createQueryBuilder("activity")
            .leftJoinAndSelect("activity.checkins", "checkin")
            .leftJoinAndSelect("checkin.participant", "participant")
            .leftJoinAndSelect("participant.areaOfExpertise", "participantAreaOfExpertise")
            .leftJoinAndSelect("activity.speaker", "speaker")
            .leftJoinAndSelect("activity.areaOfExpertise", "activityAreaOfExpertise")
            .getMany();
    }

    async findById(id: number): Promise<Activity | null> {
        return await AppDataSource.getRepository(Activity)
            .createQueryBuilder("activity")
            .leftJoinAndSelect("activity.checkins", "checkin")
            .leftJoinAndSelect("checkin.participant", "participant")
            .leftJoinAndSelect("participant.areaOfExpertise", "participantAreaOfExpertise")
            .leftJoinAndSelect("activity.speaker", "speaker")
            .leftJoinAndSelect("activity.areaOfExpertise", "activityAreaOfExpertise")
            .where("activity.idActivity = :id", { id })
            .getOne();
    }

    async save(activity: Activity): Promise<Activity> {
        return await AppDataSource.getRepository(Activity).save(activity);
    }

    async delete(id: number): Promise<void> {
        const result = await AppDataSource.getRepository(Activity).delete(id);
        if (result.affected === 0) {
            throw new Error("Atividade não encontrada ou já excluída.");
        }
    }

    async findSpeakersByIds(ids: number[]): Promise<Speaker[]> {
        return await AppDataSource.getRepository(Speaker).findByIds(ids);
    }

    async findAreasByIds(ids: number[]): Promise<AreaOfExpertise[]> {
        return await AppDataSource.getRepository(AreaOfExpertise).findByIds(ids);
    }

    create(data: Partial<Activity>): Activity {
        return AppDataSource.getRepository(Activity).create(data);
    }
}

export default new ActivityRepository();