import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Participant } from './participant';

@Entity({ name: 'Post' })
export class Post {
    @PrimaryGeneratedColumn({ type: 'int' })
    idPost!: number;

    @Column({ length: 300, nullable: true })
    imageUrl?: string;

    @Column({ length: 1000, nullable: true })
    description?: string;

    @ManyToOne(() => Participant, participant => participant.posts, {
        onDelete: 'CASCADE',
    })
    participant!: Participant;

    constructor(participant: Participant, imageUrl?: string, description?: string) {
        this.participant = participant;
        this.imageUrl = imageUrl;
        this.description = description;
    }
}