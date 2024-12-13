import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Activity } from './activity';


@Entity({ name: 'Speaker' })
export class Speaker {
    @PrimaryGeneratedColumn({ type: 'int' })
    idSpeaker!: number;

    @Column({ length: 200 })
    name!: string;

    constructor(name: string) {
        this.name = name;
    }

    @ManyToMany(() => Activity, activity => activity.speaker, {onUpdate: 'CASCADE'})
    activity?: Activity[];
}
