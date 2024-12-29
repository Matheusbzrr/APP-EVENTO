import { AppDataSource } from "../../infrastructure/db/data-source";
import { SaveActivity } from "../models/saveActivity";

class SaveActivityRepository {
    async findAll(): Promise<SaveActivity[]> {
        return await AppDataSource.getRepository(SaveActivity)
            .createQueryBuilder("saveActivity")
            .leftJoinAndSelect("saveActivity.participant", "participant")
            .leftJoinAndSelect("saveActivity.activity", "activity")
            .leftJoinAndSelect("activity.areaOfExpertise", "areaOfExpertise")
            .leftJoinAndSelect("activity.speaker", "speaker")
            .getMany();
    }

    async findById(idSaveActivity: number): Promise<SaveActivity | null> {
        return await AppDataSource.getRepository(SaveActivity).findOne({
            where: { idSaveActivity },
            relations: ["participant", "activity", "activity.areaOfExpertise", "activity.speaker"],
        });
    }

    async findByParticipantId(idParticipant: number): Promise<SaveActivity[]> {
        return await AppDataSource.getRepository(SaveActivity)
            .createQueryBuilder("saveActivity")
            .leftJoinAndSelect("saveActivity.participant", "participant")
            .leftJoinAndSelect("saveActivity.activity", "activity")
            .leftJoinAndSelect("activity.areaOfExpertise", "areaOfExpertise")
            .leftJoinAndSelect("activity.speaker", "speaker")
            .where("participant.idParticipant = :idParticipant", { idParticipant })
            .getMany();
    }

    async save(saveActivity: SaveActivity): Promise<SaveActivity> {
        return await AppDataSource.getRepository(SaveActivity).save(saveActivity);
    }

    async delete(idSaveActivity: number): Promise<void> {
        const result = await AppDataSource.getRepository(SaveActivity).delete({ idSaveActivity });
        if (result.affected === 0) {
            throw new Error("Atividade salva não encontrada ou já foi excluída.");
        }
    }
}

export default new SaveActivityRepository();