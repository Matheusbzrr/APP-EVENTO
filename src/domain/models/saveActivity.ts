import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Participant } from "./participant";
import { Activity } from "./activity";

@Entity({ name: "SaveActivity" })
export class SaveActivity {
    @PrimaryGeneratedColumn({ type: "int" })
    idSaveActivity!: number;

    @ManyToOne(() => Participant, participant => participant.saveActivits, {
        onDelete: "CASCADE",
    })
    participant!: Participant;

    @ManyToOne(() => Activity, activity => activity.saveActivits, {
        onDelete: "CASCADE",
    })
    activity!: Activity;
}