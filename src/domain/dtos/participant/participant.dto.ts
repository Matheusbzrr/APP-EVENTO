import { AreaOfExpertiseDTO } from '../areaOfExpertise/AreaOfExpertiseDTO';
export interface ParticipantDTO {
    idParticipant: number;
    name: string;
    email: string;
    position: string;
    contact: string;
    companyName?: string;
    AreaOfExpertise: AreaOfExpertiseDTO[];
    postPermission?: number;
}