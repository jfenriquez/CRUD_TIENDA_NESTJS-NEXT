import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as Excel from 'exceljs';
export declare class CategoriasService {
    private categoriaRepository;
    private readonly productoRepository;
    constructor(categoriaRepository: Repository<Categoria>, productoRepository: Repository<any>);
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    find(id: number): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    loadFromExcel(filePath: string): Promise<BadRequestException | {
        message: string;
    }>;
    exportToExcel(data: any[], columns: {
        header: string;
        key: string;
    }[], sheetName: string): Promise<Excel.Buffer>;
}
