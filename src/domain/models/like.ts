import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Participant } from "./participant";
import { Post } from "./post";

@Entity({ name: "Like" })
export class Like {
    @PrimaryGeneratedColumn({ type: "int" })
    idLike!: number;

    @ManyToOne(() => Participant, (participant) => participant.likes, {
        onDelete: "CASCADE",
    })
    participant!: Participant;

    @ManyToOne(() => Post, (post) => post.likes, {
        onDelete: "CASCADE",
    })
    post!: Post;
}