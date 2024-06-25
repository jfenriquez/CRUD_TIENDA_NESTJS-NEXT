import { BadRequestException } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { Response } from 'express';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    newEndPoint(): Promise<import("../entities/categoria.entity").Categoria[]>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<import("../entities/categoria.entity").Categoria>;
    findAll(): Promise<import("../entities/categoria.entity").Categoria[]>;
    exportExcel(res: Response): Promise<void>;
    findOne(id: string): Promise<import("../entities/categoria.entity").Categoria>;
    update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<import("../entities/categoria.entity").Categoria>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    uploadExcel(file: any): Promise<BadRequestException | {
        message: string;
    }>;
}
