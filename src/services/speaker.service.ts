import speakerRepository from "../repositories/speaker.repository";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";

class SpeakerService {
    async getAllSpeakers(): Promise<SpeakerDTO[]> {
        return await speakerRepository.findAll();
    }

    async createSpeaker(speakerData: CreateSpeakerDTO): Promise<SpeakerDTO> {
        return await speakerRepository.create(speakerData);
    }
}

export default new SpeakerService();
