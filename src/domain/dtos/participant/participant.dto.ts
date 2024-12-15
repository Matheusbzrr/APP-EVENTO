export interface ParticipantDTO {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;

    postPermission?: number;
}
import { AreaOfExpertiseDTO } from '../areaOfExpertise/AreaOfExpertiseDTO';
export interface ParticipantDTO {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;
    AreaOfExpertise: AreaOfExpertiseDTO[];
    postPermission?: number;
}