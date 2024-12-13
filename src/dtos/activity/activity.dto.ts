import { CheckinDTO } from "../checkin/checkin.dto";
import { SpeakerDTO } from "../speaker/speaker.dto";

export interface ActivityDTO {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    location: string;
    checkins?: CheckinDTO[];
    speaker?: SpeakerDTO[];
}
