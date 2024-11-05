import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, EntityRepository, Repository } from 'typeorm';
import { Record } from './record.entity';
import { RecordDto } from './dto/record.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordRepository extends Repository<Record> {
  constructor(private dataSource: DataSource) {
    super(Record, dataSource.createEntityManager())
  }

  async createRecord(recordDto: RecordDto): Promise<Record> {
    const newRecord = this.create({
      user: { id: recordDto.userId },
      title: recordDto.title,
      details: recordDto.details,
      category: recordDto.category
    })

    return await this.save(newRecord)
  }

  async updateRecord(RecordDto: RecordDto): Promise<void> {
    const updateResult = await this.update(RecordDto.id, RecordDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${RecordDto.id}`);
    }
  }

  async removeRecord(id: string): Promise<void> {
    const deleteResult = await this.delete(id)
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${id}`)
    }
  }

  async findAll(userId: string): Promise<Record[]> {
    return await this.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  async findOneRecord(id: string): Promise<Record> {
    const record = await this.createQueryBuilder('record')
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
