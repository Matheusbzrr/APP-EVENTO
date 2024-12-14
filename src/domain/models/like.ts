import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Participant } from './participant';
import { Activity } from './activity';

@Entity({ name: 'Like' })
export class Like {
    @PrimaryGeneratedColumn({ type: 'int' })
    idLike!: number;

    @ManyToOne(() => Participant, participant => participant.likes, {
        onDelete: 'CASCADE',
    })
    participant!: Participant;

    @ManyToOne(() => Activity, activity => activity.likes, {
        onDelete: 'CASCADE',
    })
    activity!: Activity;

    constructor(participant: Participant, activity: Activity) {
        this.participant = participant;
        this.activity = activity;
    }
}