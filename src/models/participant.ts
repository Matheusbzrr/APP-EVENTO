import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Checkin } from './checkin';
import { Post } from './post';
import { AreaOfExpertise } from './areaOfExpertise';

@Entity({ name: 'Participant' })
export class Participant {
    @PrimaryGeneratedColumn({ type: 'int' })
    idParticipant!: number;

    @Column({ length: 300 })
    name!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column({ length: 100, nullable: true })
    companyName?: string;

    @Column({ type: 'tinyint', nullable: true })
    postPermission?: number;

    @OneToMany(() => Checkin, checkin => checkin.participant)
    checkins!: Checkin[];

    @OneToMany(() => Post, post => post.participant)
    posts!: Post[];

    @ManyToMany(() => AreaOfExpertise, areaofexpertise => areaofexpertise.participant, {onUpdate: 'CASCADE'})
    areaofexpertise?: AreaOfExpertise[];

    constructor(
        name: string,
        email: string,
        companyName?: string,
        postPermission?: number
    ) {
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.postPermission = postPermission;
    }
}
