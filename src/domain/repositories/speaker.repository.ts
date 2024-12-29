import { AppDataSource } from "../../infrastructure/db/data-source";
import { Speaker } from "../models/speaker";

class SpeakerRepository {
    async findAll(): Promise<Speaker[]> {
        return await AppDataSource.getRepository(Speaker).find();
    }

    async findByName(name: string): Promise<Speaker | null> {
        return await AppDataSource.getRepository(Speaker).findOneBy({ name });
    }

    async findById(idSpeaker: number): Promise<Speaker | null> {
        return await AppDataSource.getRepository(Speaker).findOneBy({ idSpeaker });
    }

    async save(speaker: Speaker): Promise<Speaker> {
        return await AppDataSource.getRepository(Speaker).save(speaker);
    }

    async delete(idSpeaker: number): Promise<void> {
        const result = await AppDataSource.getRepository(Speaker).delete(idSpeaker);
        if (result.affected === 0) {
            throw new Error("Palestrante não encontrado ou já foi excluído!");
        }
    }
}

export default new SpeakerRepository();