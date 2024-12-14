import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Participant } from './participant';
@Entity({ name: 'AreaOfExpertise' })
export class AreaOfExpertise {
    @PrimaryGeneratedColumn({ type: 'int' })
    idArea!: number;

    @Column({ length: 100 })
    name!: string;

    @ManyToMany(() => Participant, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinTable()
    participant?: Participant[];

    constructor(name: string) {
        this.name = name;
    }
}
