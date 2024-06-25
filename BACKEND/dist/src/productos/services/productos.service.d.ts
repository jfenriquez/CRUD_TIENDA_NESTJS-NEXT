import { NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { CategoriasService } from './categorias.service';
export declare class ProductosService {
    private productoRepository;
    private categoriasService;
    constructor(productoRepository: Repository<Producto>, categoriasService: CategoriasService);
    create(createProductoDto: CreateProductoDto): Promise<Producto>;
    findAll(): Promise<Producto[]>;
    findAllId(id: number): Promise<Producto[]>;
    findOne(searchValue: string): Promise<Producto[]>;
    findAllOrderPrice(price: string): Promise<Producto[]>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto>;
    remove(id: number): Promise<NotFoundException | import("typeorm").DeleteResult>;
}
