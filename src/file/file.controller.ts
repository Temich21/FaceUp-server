import { Body, Controller, Delete, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Get(':id')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.getFile(id);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });
    res.send(file.data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('recordId') recordId: string,
  ) {
    return await this.fileService.uploadFile(file, recordId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    await this.fileService.removeFile(id)
  }
}
