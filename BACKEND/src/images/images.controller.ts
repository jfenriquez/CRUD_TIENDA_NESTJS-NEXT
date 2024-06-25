import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';

import { UpdateImageDto } from './dto/update-image.dto';

import { v2 as cloudinary } from 'cloudinary';
import { multerConfig } from '../../multer.config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@UploadedFile() file: any) {
    return this.imagesService.create(file);
  }

  @Post('masive')
  @UseInterceptors(FilesInterceptor('images', 100, multerConfig))
  async creates(@UploadedFiles() files: []) {
    return this.imagesService.uploadImages(files);
  }

  @Get('export')
  async exportAll(@Res() res: Response): Promise<void> {
    const data = await this.imagesService.findAll();

    const columns = [
      {
        header: 'asset_id',
        key: 'asset_id',
        width: 10,
      },
      {
        header: 'format',
        key: 'format',
        width: 32,
      },
      {
        header: 'version',
        key: 'version',
        width: 32,
      },
      {
        header: 'type',
        key: 'type',
        width: 32,
      },
      {
        header: 'Fecha Creación',
        key: 'created_at',
        width: 32,
      },
      {
        header: 'url',
        key: 'url',
        width: 32,
      },
      {
        header: 'secure_urlurl',
        key: 'secure_url',
        width: 32,
      },
    ];

    const sheetName = 'Sheet1';

    const buffer = await this.imagesService.exportToExcel(
      data,
      columns,
      sheetName,
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=exported_data.xlsx',
    );
    res.end(buffer);
  }

  @Public()
  @Get(':id')
  findAll() {
    return this.imagesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await cloudinary.api.delete_resources([id]);
      console.log(`Image with ID ${id} deleted successfully from Cloudinary.`);
      return {
        message: 'Image deleted successfully from Cloudinary',
        response,
      };
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return { message: 'Error deleting image from Cloudinary', error };
    }
  }
}
