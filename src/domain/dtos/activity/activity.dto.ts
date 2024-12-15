import { CheckinDTO } from "../checkin/checkin.dto";
import { SpeakerDTO } from "../speaker/speaker.dto";
import { SaveActivityDTO } from "../saveActivity/saveActivityDTO";

export interface ActivityDTO {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    date: Date;
    location: string;
    checkins?: CheckinDTO[];
    speaker?: SpeakerDTO[];
    saveActivits?: SaveActivityDTO[]; 
}