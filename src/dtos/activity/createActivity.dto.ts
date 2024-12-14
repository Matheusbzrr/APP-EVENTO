export interface CreateActivityDTO {
    title: string;
    description: string;
    time: string;
    date: Date;
    location: string;
    speakerId?: number[]; 
}