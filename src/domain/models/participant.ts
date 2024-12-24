import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Checkin } from './checkin';
import { Post } from './post';
import { AreaOfExpertise } from './areaOfExpertise';
import { Like } from './like';
import { SaveActivity } from './saveActivity';

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

    @Column({ length: 100, nullable: false })
    position!: string;
    @Column({length:15, nullable:false})
    contact!: string;

    @OneToMany(() => Checkin, checkin => checkin.participant)
    checkins!: Checkin[];

    @OneToMany(() => Post, post => post.participant)
    posts!: Post[];

    @OneToMany(() => SaveActivity, saveActivity => saveActivity.participant)
    saveActivits!: SaveActivity[];


    @ManyToMany(() => AreaOfExpertise, areaofexpertise => areaofexpertise.participant, { onUpdate: 'CASCADE' })
    @JoinTable()
    areaOfExpertise?: AreaOfExpertise[];

    @OneToMany(() => Like, like => like.participant)
    likes!: Like[];

    constructor(
        name: string,
        email: string,
        companyName: string,
        postPermission: number,
        position: string,
        contact: string
    ) {
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.postPermission = postPermission;
        this.position = position;
        this.contact = contact;
    }
}