import { LikeDTO } from "../like/like.dto";
import { ParticipantDTO } from "../participant/participant.dto";

export interface PostDTO {
    idPost: number;
    participant: ParticipantDTO;
    imageUrl: string;
    description: string;
    likes?: LikeDTO[];

}