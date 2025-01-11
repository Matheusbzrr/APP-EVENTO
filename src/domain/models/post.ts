import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Participant } from './participant';
import { Like } from './like';

@Entity({ name: 'Post' })
export class Post {
    @PrimaryGeneratedColumn({ type: 'int' })
    idPost!: number;

    @Column({ length: 300, nullable: true })
    imageUrl?: string;

    @Column({ length: 2000, nullable: true })
    description?: string;

    @OneToMany(() => Like, like => like.post)
    likes!: Like[];

    @ManyToOne(() => Participant, participant => participant.posts, {
        onDelete: 'CASCADE',
    })
    participant!: Participant;
}
