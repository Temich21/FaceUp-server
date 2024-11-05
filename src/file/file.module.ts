import { Module } from '@nestjs/common';
import { FileRepository } from 'src/file/file.repository';
import { File } from 'src/file/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService, FileRepository],
  exports: [FileRepository],
})
export class FileModule { }
