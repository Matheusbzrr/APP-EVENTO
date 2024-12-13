export interface CreateParticipantDTO {
    idParticipant: number;
    name: string;
    email: string;
    companyName?: string;
    postPermission?: number;
}