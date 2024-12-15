import { ParticipantDTO } from "../participant/participant.dto";

export interface SaveActivityDTO {
    idSaveActivity: number;
    participant: ParticipantDTO | null;
    idActivity: number;
}