import { ParticipantDTO } from "../participant/participant.dto";

export interface PostDTO {
    idPost: number;
    participant: ParticipantDTO;
    imageUrl: string;
    description: string;
}