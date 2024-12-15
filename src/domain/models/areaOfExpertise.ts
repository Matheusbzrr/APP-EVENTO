import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Participant } from './participant';
import { Activity } from './activity';

@Entity({ name: 'AreaOfExpertise' })
export class AreaOfExpertise {
    @PrimaryGeneratedColumn({ type: 'int' })
    idArea!: number;

    @Column({ length: 100 })
    name!: string;

    @ManyToMany(() => Participant, participant => participant.areaOfExpertise, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    participant?: Participant[];

    @ManyToMany(() => Activity, activity => activity.areaOfExpertise, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    activity?: Activity[];

    constructor(name: string) {
        this.name = name;
    }
}