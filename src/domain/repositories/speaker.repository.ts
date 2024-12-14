import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import { Speaker } from "../models/speaker";
import { DatabaseError, ConflictError } from "../../infrastructure/utils/CustomErrors";

class SpeakerRepository {
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<SpeakerDTO[]> {
        try {
            const speakers = await this.speakerRepository.find();
            return speakers.map(speaker => ({
                idSpeaker: speaker.idSpeaker,
                name: speaker.name,
            }));
        }catch (error) {
            console.error("Erro ao buscar todos os palestrantes:", error);
            throw new DatabaseError("Falha ao retornar os Palestrantes!");
        }
    }

    async create(speakerData: CreateSpeakerDTO): Promise<SpeakerDTO> {
        try {
            const existingSpeaker = await this.speakerRepository.findOneBy({ name: speakerData.name });
            if (existingSpeaker) {
                throw new ConflictError("Palestrante com este nome já existe!"); 
            }


            const speaker = this.speakerRepository.create(speakerData);
            const savedSpeaker = await this.speakerRepository.save(speaker);
            return {
                idSpeaker: savedSpeaker.idSpeaker,
                name: savedSpeaker.name,
            };
        } catch (error) {
            console.error("Erro ao criar palestrante:", error);
            throw new DatabaseError("Falha ao criar o Palestrante!");
        }
    }
}

export default new SpeakerRepository();
