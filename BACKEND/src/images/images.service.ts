import { Injectable, UploadedFiles } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ConfigService } from '@nestjs/config';

import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path2 from 'path';
import * as Excel from 'exceljs';
@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  async create(file: any) {
    cloudinary.config({
      cloud_name: this.configService.get<string>(
        'config.cloudinaryConfig.cloudName',
      ),
      api_key: this.configService.get<string>(
        'config.cloudinaryConfig.apiKey_cloudinary',
      ),
      api_secret: this.configService.get<string>(
        'config.cloudinaryConfig.apiSecret',
      ),
    });
    this.configService.get<string>('config.cloudinaryConfig.apiKey_cloudinary');
    try {
      const { originalname, filename, path } = file;
      const response = await cloudinary.uploader.upload(path, {
        public_id: filename,
      });
      const filePath = await path2.join('uploads', filename);
      console.log('filePath', filePath);

      // Verifica si la propiedad 'secure_url' existe en la respuesta de Cloudinary
      if (response && response.secure_url) {
        fs.unlinkSync(filePath);
        console.log(`File ${filename} deleted successfully.`);
        return response;
      } else {
        console.log(`File ${filename} not found on Cloudinary.`);
        return { message: 'File not found on Cloudinary' };
      }
    } catch (error) {
      console.error('Error processing file:', error);
      return { message: 'File error' };
    }
  }

  async uploadImages(files: []) {
    console.log('files', files);
    try {
      const imagesArray = [];
      for (const image of files) {
        const response = await this.create(image);
        imagesArray.push(response);
      }
      return imagesArray;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    cloudinary.config({
      cloud_name: this.configService.get<string>(
        'config.cloudinaryConfig.cloudName',
      ),
      api_key: this.configService.get<string>(
        'config.cloudinaryConfig.apiKey_cloudinary',
      ),
      api_secret: this.configService.get<string>(
        'config.cloudinaryConfig.apiSecret',
      ),
    });
    this.configService.get<string>('config.cloudinaryConfig.apiKey_cloudinary');
    try {
      const result = await cloudinary.api.resources({
        //resource_type: 'image',
        //type: 'upload',
        max_results: 1000,
      });
      console.log('Sresut', result.resources.length);
      return result.resources;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching images from Cloudinary');
    }
  }

  /////export dataimages cloudinary
  async exportToExcel(
    data: any[],
    columns: { header: string; key: string }[],
    sheetName: string,
  ): Promise<Excel.Buffer> {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Add columns
    worksheet.columns = columns;

    // Add data rows
    worksheet.addRows(data);

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
