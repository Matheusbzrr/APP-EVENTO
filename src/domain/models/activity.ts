import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Checkin } from './checkin';
import { Speaker } from './speaker';
import { AreaOfExpertise } from './areaOfExpertise';

@Entity({ name: 'Activity' })
export class Activity {
    @PrimaryGeneratedColumn({ type: 'int' })
    idActivity!: number;

    @Column({ length: 100 })
    title!: string;

    @Column({ length: 250 })
    description!: string;

    @Column({ type: 'time' })
    time!: string;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ length: 200 })
    location!: string;

    @OneToMany(() => Checkin, checkin => checkin.activity)
    checkins!: Checkin[];

    @ManyToMany(() => Speaker, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinTable()
    speaker?: Speaker[];

    @ManyToMany(() => AreaOfExpertise, areaOfExpertise => areaOfExpertise.activity, { onUpdate: 'CASCADE' })
    @JoinTable()
    areaOfExpertise?: AreaOfExpertise[];

    constructor(title: string, description: string, time: string, location: string) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.location = location;
    }
}