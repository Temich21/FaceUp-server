import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Record } from 'src/record/record.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar', unique: true })
    @Index()
    email: string;

    @Column({ type: 'smallint' })
    age: number

    @Column({ type: 'varchar' })
    password: string

    @OneToMany(() => Record, record => record.user)
    records: Record[]

    constructor(name: string, email: string, age: number, hashPassword: string) {
        this.name = name
        this.email = email
        this.age = age
        this.password = hashPassword
    }
}