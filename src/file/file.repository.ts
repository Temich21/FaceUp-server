import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) { }

  createFile(file: Express.Multer.File, recordId: string): File {
    return this.fileRepository.create({
      record: { id: recordId },
      filename: file.originalname,
      data: file.buffer,
    });
  }

  async saveFiles(newFiles: File[]): Promise<File[]> {
    return await this.fileRepository.save(newFiles);
  }

  async saveFile(newFiles: File): Promise<File> {
    return await this.fileRepository.save(newFiles);
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { id } })

    if (file == null) {
      throw new NotFoundException(`Cannot find File`);
    }
    return file
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.fileRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cannot find File with id ${id}`);
    }
  }
}
