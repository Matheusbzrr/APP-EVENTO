import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import speakerRepository from "../repositories/speaker.repository";
import { ConflictError } from "../exceptions/conflict-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { Speaker } from "../models/speaker";

class SpeakerService {
    async getAllSpeakers(): Promise<SpeakerDTO[]> {
        const speakers = await speakerRepository.findAll();

        if (!speakers.length) {
            throw new NotFoundError("Nenhum palestrante encontrado!");
        }

        return speakers.map(this.mapToSpeakerDTO);
    }

    async createSpeaker(speakerData: CreateSpeakerDTO): Promise<SpeakerDTO> {
        const existingSpeaker = await speakerRepository.findByName(speakerData.name);

        if (existingSpeaker) {
            throw new ConflictError("Palestrante com este nome já existe!");
        }

        const speaker = new Speaker();
        Object.assign(speaker, speakerData);

        const savedSpeaker = await speakerRepository.save(speaker);

        return this.mapToSpeakerDTO(savedSpeaker);
    }

    async deleteSpeaker(idSpeaker: number): Promise<void> {
        const speaker = await speakerRepository.findById(idSpeaker);

        if (!speaker) {
            throw new NotFoundError("Palestrante não encontrado ou já foi excluído!");
        }

        await speakerRepository.delete(idSpeaker);
    }

    private mapToSpeakerDTO(speaker: Speaker): SpeakerDTO {
        return {
            idSpeaker: speaker.idSpeaker,
            name: speaker.name,
            description: speaker.description || "Sem descrição",
            role: speaker.role || "Sem função",
            company: speaker.company || "Sem empresa",
        };
    }
}

export default new SpeakerService();