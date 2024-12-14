export interface ParticipantDTO {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;
    postPermission?: number;
}