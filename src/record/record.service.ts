import { Injectable } from '@nestjs/common';
import { RecordRepository } from 'src/record/record.repository';
import { DataSource, EntityManager } from 'typeorm';
import { RecordDto } from 'src/record/dto/record.dto';
import { Record } from 'src/record/record.entity';
import { File } from 'src/file/file.entity';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly dataSource: DataSource
  ) { }

  async create(recordDto: RecordDto, files: Express.Multer.File[]): Promise<Record> {
    return await this.dataSource.transaction(async (manager: EntityManager) => {
      const transactionalRecordRepository = manager.getRepository(Record)
      const transactionalFileRepository = manager.getRepository(File)

      const savedRecord = await transactionalRecordRepository.save({
        id: recordDto.id,
        user: { id: recordDto.userId },
        title: recordDto.title,
        details: recordDto.details,
        category: recordDto.category,
      });

      const fileEntities = files.map(file => {
        return transactionalFileRepository.create({
          record: { id: savedRecord.id },
          filename: file.originalname,
          data: file.buffer,
        });
      })

      await transactionalFileRepository.save(fileEntities)

      return savedRecord;
    })
  }

  async findAll(userId: string): Promise<Record[]> {
    return await this.recordRepository.findAll(userId)
  }

  async findOne(id: string): Promise<Record> {
    return await this.recordRepository.findOneRecord(id)
  }

  async update(RecordDto: RecordDto): Promise<void> {
    await this.recordRepository.updateRecord(RecordDto)
  }

  async remove(id: string): Promise<void> {
    await this.recordRepository.removeRecord(id)
  }
}
