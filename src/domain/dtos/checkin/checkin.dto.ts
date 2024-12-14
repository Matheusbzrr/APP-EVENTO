import { ParticipantDTO } from "../participant/participant.dto";

export interface CheckinDTO {
    idCheckin: number;
    participant: ParticipantDTO | null
    idActivity: number 
    checkinDateTime: Date;
}
