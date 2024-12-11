import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity({ name: 'Categoria' })
export class Categoria {
    @PrimaryGeneratedColumn({ type: 'int' })
    idCategoria!: number;

    @Column({ length: 60 })
    nome: string;

    @Column({ length: 100, nullable: true })
    descricao?: string;

    constructor(
        nome: string,
        descricao?: string,
        
    ) {
        this.nome = nome;
        this.descricao = descricao;
        
    }
}
