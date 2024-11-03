import {
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { Category } from '../record.entity';

export class RecordDto {
    @IsString()
    id: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    details: string

    @IsEnum(Category)
    @IsNotEmpty()
    category: Category

    @IsString()
    @IsNotEmpty()
    userId: string

    constructor(id: string, title: string, details: string, category: Category, userId: string) {
        this.id = id
        this.title = title
        this.details = details
        this.category = category
        this.userId = userId
    }
}
