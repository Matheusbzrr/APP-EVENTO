import { ParticipantDTO } from "../participant/participant.dto";

export interface LikeDTO {
    idLike: number;
    participant: ParticipantDTO | null;
    idActivity: number;
}