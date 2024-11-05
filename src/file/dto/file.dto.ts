import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class FileDto {
    @IsString()
    id: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    recordId: string

    constructor(id: string, title: string, recordId: string) {
        this.id = id
        this.title = title
        this.recordId = recordId
    }
}
