import { ActivityDTO } from "../activity/activity.dto";
import { ParticipantDTO } from "../participant/participant.dto";

export interface SaveActivityDTO {
    idSaveActivity: number;
    idParticipant: number;
    activity: ActivityDTO;
}