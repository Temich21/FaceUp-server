import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from 'src/file/file.repository';

import { File } from './file.entity';

type UploadedFileResponse = {
  id: string
  filename: string
}

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
  ) { }

  async getFile(fileId: string): Promise<File> {
    return this.fileRepository.findOne(fileId)
  }

  async uploadFile(file: Express.Multer.File, recordId: string): Promise<UploadedFileResponse> {
    const fileEntity = this.fileRepository.createFile(file, recordId)
    await this.fileRepository.saveFile(fileEntity)
    return { id: fileEntity.id, filename: fileEntity.filename }
  }

  async removeFile(fileId: string): Promise<string> {
    await this.fileRepository.remove(fileId)
    return fileId
  }
}
