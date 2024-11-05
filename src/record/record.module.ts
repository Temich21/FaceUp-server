import { Module } from '@nestjs/common';
import { RecordController } from 'src/record/record.controller';
import { RecordService } from 'src/record/record.service';
import { RecordRepository } from 'src/record/record.repository';
import { Record } from 'src/record/record.entity';
import { File } from 'src/file/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record, File]), FileModule],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule { }
