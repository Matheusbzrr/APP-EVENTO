import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import { ConflictError } from "../exceptions/conflict-error";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { Speaker } from "../models/speaker";

class SpeakerRepository {
    speakerRepository = AppDataSource.getRepository(Speaker);

    async findAll(): Promise<SpeakerDTO[]> {
        try {
            const speakers = await this.speakerRepository.find();
            if (!speakers.length) {
                throw new NotFoundError("Nenhum palestrante encontrado!");
            }

            return speakers.map(speaker => ({
                idSpeaker: speaker.idSpeaker,
                name: speaker.name,
                description: speaker.description || "Sem descrição",
                role: speaker.role || "Sem função",
                company: speaker.company || "Sem empresa",
            }));
        } catch (error: any) {
            console.error("Erro ao buscar palestrantes:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar os palestrantes no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar todos os palestrantes!");
            }
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
                description: savedSpeaker.description || "Sem descrição",
                role: savedSpeaker.role || "Sem função",
                company: savedSpeaker.company || "Sem empresa",
            };
        } catch (error: any) {
            console.error("Erro ao criar palestrante:", error);
            if (error instanceof ConflictError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar o palestrante no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao criar o palestrante!");
            }
        }
    }

    async delete(idSpeaker: number): Promise<void> {
        try {
            const result = await this.speakerRepository.delete(idSpeaker);
            if (result.affected === 0) {
                throw new NotFoundError("Palestrante não encontrado ou já foi excluído!");
            }
        } catch (error: any) {
            console.error("Erro ao deletar palestrante:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao deletar o palestrante no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao deletar o palestrante!");
            }
        }
    }
}

export default new SpeakerRepository();