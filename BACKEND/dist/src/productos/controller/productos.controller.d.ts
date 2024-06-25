import { ProductosService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    create(createProductoDto: CreateProductoDto): Promise<import("../entities/producto.entity").Producto>;
    ordenar(precio: string): Promise<import("../entities/producto.entity").Producto[]>;
    findAll(): Promise<import("../entities/producto.entity").Producto[]>;
    findOne(searchValue: string): Promise<import("../entities/producto.entity").Producto[]>;
    update(id: string, updateProductoDto: UpdateProductoDto): Promise<import("../entities/producto.entity").Producto>;
    remove(id: string): Promise<import("@nestjs/common").NotFoundException | import("typeorm").DeleteResult>;
}
