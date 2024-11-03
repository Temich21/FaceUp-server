import { Controller, Get, Post, Body, Patch, Param, Delete, Next, Res } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDto } from './dto/record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) { }

  @Post()
  async create(
    @Body() recordDto: RecordDto,
  ) {
    return await this.recordService.create(recordDto)
  }

  @Get('all/:userId')
  async findAll(
    @Param('userId') userId: string,
  ) {
    const records = await this.recordService.findAll(userId)
    return records
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: string,
  // ) {
  //   return await this.recordService.findOne(id)
  // }

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
