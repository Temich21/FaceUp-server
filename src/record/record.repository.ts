import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { RecordDto } from './dto/record.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordRepository {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) { }

  async create(recordDto: RecordDto): Promise<Record> {
    const newRecord = this.recordRepository.create({
      user: { id: recordDto.userId },
      title: recordDto.title,
      details: recordDto.details,
      category: recordDto.category
    })

    return await this.recordRepository.save(newRecord)
  }

  async update(RecordDto: RecordDto): Promise<void> {
    const updateResult = await this.recordRepository.update(RecordDto.id, RecordDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${RecordDto.id}`);
    }
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.recordRepository.delete(id)
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${id}`)
    }
  }

  async findAll(userId: string): Promise<Record[]> {
    return await this.recordRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordRepository.createQueryBuilder('record')
      .select(['record.id', 'record.title', 'record.details', 'record.category', 'record.userId'])
      .leftJoin('record.files', 'files')
      .addSelect(['files.id', 'files.filename'])
      .where('record.id = :id', { id })
      .getOne()

    if (record == null) {
      throw new NotFoundException(`Cannot find Record with id ${id}`);
    }

    return record
  }
}
