import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { File } from 'src/file/file.entity';

export enum Category {
    BULLYING = "Bullying, bad behaviour",
    LEARNING_DIFFICULTIES = "Learning difficulties",
    HOME_PROBLEMS = "Problems at home",
    OTHER = "Something else"
}

@Entity()
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    details: string

    @Column({ type: 'enum', enum: Category })
    category: Category

    @ManyToOne(() => User, user => user.records, { onDelete: 'CASCADE' })
    user: User

    @OneToMany(() => File, file => file.record)
    files: File[]
}