import { CheckinDTO } from "../checkin/checkin.dto";
import { SpeakerDTO } from "../speaker/speaker.dto";
import { LikeDTO } from "../like/like.dto";
import { AreaOfExpertiseDTO } from "../areaOfExpertise/AreaOfExpertiseDTO";

export interface ActivityDTO {
    idActivity: number;
    title: string;
    description: string;
    time: string;
    date: Date;
    location: string;
    checkins?: CheckinDTO[];
    speaker?: SpeakerDTO[];
    areaOfExpertise: AreaOfExpertiseDTO[];
}