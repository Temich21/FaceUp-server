import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Record } from './record.entity';
import { RecordDto } from './dto/record.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordRepository {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) { }

  async create(RecordDto: RecordDto): Promise<Record> {
    const newRecord = this.recordRepository.create({
      user: { id: RecordDto.userId },
      title: RecordDto.title,
      details: RecordDto.details,
      category: RecordDto.category
    });
    return await this.recordRepository.save(newRecord);
  }

  async update(RecordDto: RecordDto): Promise<void> {
    const updateResult = await this.recordRepository.update(RecordDto.id, RecordDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${RecordDto.id}`);
    }
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.recordRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cannot find Record with id ${id}`);
    }
  }

  async findAll(userId: string): Promise<Record[]> {
    return await this.recordRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  // async findOne(id: string): Promise<Record> {
  //   const Record = await this.recordRepository.createQueryBuilder('Record')
  //     .leftJoinAndSelect('Record.columns', 'columns')
  //     .leftJoinAndSelect('columns.cards', 'cards')
  //     .where('Record.id = :id', { id })
  //     .orderBy('Record.rank', 'ASC')
  //     .addOrderBy('columns.rank', 'ASC')
  //     .addOrderBy('cards.rank', 'ASC')
  //     .getOne();

  //   if (Record == null) {
  //     throw new NotFoundException(`Cannot find Record with id ${id}`)
  //   }

  //   return Record
  // }
}
