import { AppDataSource } from "../../infrastructure/db/data-source";
import { Participant } from "../models/participant";
import { AreaOfExpertise } from "../models/areaOfExpertise";

class ParticipantRepository {
    async findByEmail(email: string): Promise<Participant | null> {
        return await AppDataSource.getRepository(Participant).findOne({
            where: { email },
            relations: ["areaOfExpertise"],
        });
    }

    async findAll(): Promise<Participant[]> {
        return await AppDataSource.getRepository(Participant).find({
            relations: ["areaOfExpertise"],
        });
    }

    async findById(id: number): Promise<Participant | null> {
        return await AppDataSource.getRepository(Participant).findOne({
            where: { idParticipant: id },
            relations: ["areaOfExpertise"],
        });
    }

    async findAreasByIds(ids: number[]): Promise<AreaOfExpertise[]> {
        return await AppDataSource.getRepository(AreaOfExpertise).findByIds(ids);
    }

    async save(participant: Participant): Promise<Participant> {
        return await AppDataSource.getRepository(Participant).save(participant);
    }
}

export default new ParticipantRepository();