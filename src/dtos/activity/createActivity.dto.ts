export interface CreateActivityDTO {
    title: string;
    description: string;
    time: string;
    location: string;
    speakerId?: number[]; 
}