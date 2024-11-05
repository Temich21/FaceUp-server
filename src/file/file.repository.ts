import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  createFile(file: Express.Multer.File, recordId: string): File {
    return this.create({
      record: { id: recordId },
      filename: file.originalname,
      data: file.buffer,
    });
  }

  async saveFiles(newFiles: File[]): Promise<File[]> {
    return await this.save(newFiles);
  }

  async saveFile(newFiles: File): Promise<File> {
    return await this.save(newFiles);
  }

  async findOneFile(id: string): Promise<File> {
    const file = await this.findOne({ where: { id } })

    if (file == null) {
      throw new NotFoundException(`Cannot find File`);
    }
    return file
  }

  async removeFile(id: string): Promise<void> {
    const deleteResult = await this.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Cannot find File with id ${id}`);
    }
  }
}
