import { Injectable } from '@nestjs/common';
import { RecordRepository } from 'src/record/record.repository';
import { RecordDto } from 'src/record/dto/record.dto';
import { Record } from 'src/record/record.entity';
import { FileRepository } from 'src/file/file.repository';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly fileRepository: FileRepository
  ) { }

  async create(recordDto: RecordDto, files: Express.Multer.File[]): Promise<Record> {
    //Add transaction
    const record = await this.recordRepository.create(recordDto)

    const fileEntities = files.map(file => {
      return this.fileRepository.createFile(file, record.id);
    })

    await this.fileRepository.saveFiles(fileEntities)

    return record
  }

  async findAll(userId: string): Promise<Record[]> {
    //index на userId в ДБ в рекордах
    return await this.recordRepository.findAll(userId)
  }

  async findOne(id: string): Promise<Record> {
    return await this.recordRepository.findOne(id)
  }

  async update(RecordDto: RecordDto): Promise<void> {
    await this.recordRepository.update(RecordDto)
  }

  async remove(id: string): Promise<void> {
    await this.recordRepository.remove(id)
  }
}
