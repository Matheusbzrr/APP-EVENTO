import { CreateSpeakerDTO } from "../dtos/speaker/createSpeaker.dto";
import { SpeakerDTO } from "../dtos/speaker/speaker.dto";
import speakerRepository from "../repositories/speaker.repository";
class SpeakerService {
    async getAllSpeakers(): Promise<SpeakerDTO[]> {
        return await speakerRepository.findAll();
    }

    async createSpeaker(speakerData: CreateSpeakerDTO): Promise<SpeakerDTO> {
        return await speakerRepository.create(speakerData);
    }
}

export default new SpeakerService();
