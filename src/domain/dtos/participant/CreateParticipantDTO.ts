export interface CreateParticipantDTO {
    name: string;
    email: string;
    position: string;
    contact: string;
    companyName?: string;
    idArea: number[];
    postPermission?: number;
    
}