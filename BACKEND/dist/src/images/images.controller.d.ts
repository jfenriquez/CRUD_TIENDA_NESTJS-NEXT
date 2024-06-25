import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { Response } from 'express';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    create(file: any): Promise<import("cloudinary").UploadApiResponse | {
        message: string;
    }>;
    creates(files: []): Promise<any[]>;
    exportAll(res: Response): Promise<void>;
    findAll(): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateImageDto: UpdateImageDto): string;
    remove(id: string): Promise<{
        message: string;
        response: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        response?: undefined;
    }>;
}
