import { AppDataSource } from "../db/data-source";
import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import { Speaker } from "../models/speaker";

class SpeakerRepository {
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<SpeakerDTO[]> {
        try {
            const speakers = await this.speakerRepository.find();
            return speakers.map(speaker => ({
                idSpeaker: speaker.idSpeaker,
                name: speaker.name,
            }));
        } catch (error) {
            console.error("Erro ao buscar todos os speakers:", error);
            throw new Error("Falha ao retornar os Speakers!");
        }
    }

    async create(speakerData: CreateSpeakerDTO): Promise<SpeakerDTO> {
        try {
            const speaker = this.speakerRepository.create(speakerData);
            const savedSpeaker = await this.speakerRepository.save(speaker);
            return {
                idSpeaker: savedSpeaker.idSpeaker,
                name: savedSpeaker.name,
            };
        } catch (error) {
            console.error("Erro ao criar speaker:", error);
            throw new Error("Falha ao criar o Speaker!");
        }
    }
}

export default new SpeakerRepository();
