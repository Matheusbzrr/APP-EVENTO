import { AppDataSource } from "../../infrastructure/db/data-source";
import { Checkin } from "../models/checkin";
import { Participant } from "../models/participant";

class CheckinRepository {
    async findAll(): Promise<Checkin[]> {
        return await AppDataSource.getRepository(Checkin)
            .createQueryBuilder("checkin")
            .leftJoinAndSelect("checkin.participant", "participant")
            .leftJoinAndSelect("participant.areaOfExpertise", "areaOfExpertise")
            .leftJoinAndSelect("checkin.activity", "activity")
            .getMany();
    }

    async findById(idCheckin: number): Promise<Checkin | null> {
        return await AppDataSource.getRepository(Checkin).findOne({
            where: { idCheckin },
            relations: ["participant", "participant.areaOfExpertise", "activity"],
        });
    }

    async findByParticipantId(idParticipant: number): Promise<Checkin[]> {
        return await AppDataSource.getRepository(Checkin)
            .createQueryBuilder("checkin")
            .leftJoinAndSelect("checkin.participant", "participant")
            .leftJoinAndSelect("participant.areaOfExpertise", "areaOfExpertise")
            .leftJoinAndSelect("checkin.activity", "activity")
            .where("participant.idParticipant = :idParticipant", { idParticipant })
            .getMany();
    }

    async save(checkin: Checkin): Promise<Checkin> {
        return await AppDataSource.getRepository(Checkin).save(checkin);
    }

    async delete(idCheckin: number): Promise<void> {
        const result = await AppDataSource.getRepository(Checkin).delete(idCheckin);
        if (result.affected === 0) {
            throw new Error("Checkin não encontrado ou já excluído.");
        }
    }
}

export default new CheckinRepository();