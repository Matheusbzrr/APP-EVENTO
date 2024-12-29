import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Activity } from "./activity";

@Entity({ name: "Speaker" })
export class Speaker {
    @PrimaryGeneratedColumn({ type: "int" })
    idSpeaker!: number;

    @Column({ length: 200 })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ length: 100, nullable: true })
    role?: string;

    @Column({ length: 200, nullable: true })
    company?: string;

    @ManyToMany(() => Activity, activity => activity.speaker, { onUpdate: "CASCADE" })
    activity?: Activity[];
}