import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Record } from '../record/record.entity';

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    filename: string

    @Column({ type: 'bytea' })
    data: Buffer

    @ManyToOne(() => Record, record => record.files, { onDelete: 'CASCADE' })
    record: Record
}