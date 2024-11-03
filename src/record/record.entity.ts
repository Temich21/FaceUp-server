import { Column as ColumnORM, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';

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

    @ColumnORM({ type: 'varchar' })
    title: string

    @ColumnORM({ type: 'varchar' })
    details: string

    @ColumnORM({ type: 'enum', enum: Category })
    category: Category

    @ManyToOne(() => User, user => user.records, { onDelete: 'CASCADE' })
    user: User

    // @OneToMany(() => Column, column => column.board)
    // columns: Column[]
}