import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { RecordDto } from './dto/record.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) { }

  async create(RecordDto: RecordDto): Promise<Record> {
    return await this.recordRepository.create(RecordDto)
  }

  async findAll(userId: string): Promise<Record[]> {
    return await this.recordRepository.findAll(userId)
  }

  // async findOne(id: string): Promise<Board> {
  //   return await this.recordRepository.findOne(id)
  // }

  async update(RecordDto: RecordDto): Promise<void> {
    await this.recordRepository.update(RecordDto)
  }

  async remove(id: string): Promise<void> {
    await this.recordRepository.remove(id)
  }
}
