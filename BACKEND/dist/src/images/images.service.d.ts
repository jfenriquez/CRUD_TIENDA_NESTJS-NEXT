import { UpdateImageDto } from './dto/update-image.dto';
import { ConfigService } from '@nestjs/config';
import * as Excel from 'exceljs';
export declare class ImagesService {
    private readonly configService;
    constructor(configService: ConfigService);
    create(file: any): Promise<import("cloudinary").UploadApiResponse | {
        message: string;
    }>;
    uploadImages(files: []): Promise<any[]>;
    findAll(): Promise<any>;
    exportToExcel(data: any[], columns: {
        header: string;
        key: string;
    }[], sheetName: string): Promise<Excel.Buffer>;
    findOne(id: number): string;
    update(id: number, updateImageDto: UpdateImageDto): string;
    remove(id: number): string;
}
