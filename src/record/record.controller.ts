import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Patch } from '@nestjs/common';
import { RecordService } from 'src/record/record.service';
import { RecordDto } from 'src/record/dto/record.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Category } from 'src/record/record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('details') details: string,
    @Body('category') category: Category,
    @Body('userId') userId: string,
  ) {
    const recordDto = new RecordDto(id, title, details, category, userId)
    return await this.recordService.create(recordDto, files)
  }

  @Get('all/:userId')
  async findAll(
    @Param('userId') userId: string,
  ) {
    const records = await this.recordService.findAll(userId)
    return records
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return await this.recordService.findOne(id)
  }

  @Patch()
  async update(
    @Body() recordDto: RecordDto
  ) {
    await this.recordService.update(recordDto)
    return recordDto
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    await this.recordService.remove(id)
    return id
  }
}
