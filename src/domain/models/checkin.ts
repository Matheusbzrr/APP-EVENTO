import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Participant } from './participant';
import { Activity } from './activity';

@Entity({ name: 'Checkin' })
export class Checkin {
    @PrimaryGeneratedColumn({ type: 'int' })
    idCheckin!: number;

    @ManyToOne(() => Participant, participant => participant.checkins, {
        onDelete: 'CASCADE',
    })
    participant!: Participant;

    @ManyToOne(() => Activity, activity => activity.checkins, {
        onDelete: 'CASCADE',
    })
    activity!: Activity;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    checkinDateTime!: Date;

    constructor(participant: Participant, activity: Activity) {
        this.participant = participant;
        this.activity = activity;
    }
    
    
}
