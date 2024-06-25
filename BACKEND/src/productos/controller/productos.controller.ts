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
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from '../services/productos.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { v2 as cloudinary } from 'cloudinary';
import { multerConfig } from '../../../multer.config';
import * as fs from 'fs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear de productos' })
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  ////////FILTROS POR PRECIO Y CATEGORIA
  /* @Get('filtro/:categoria')
  filtro(
    @Param('precio') precio: string,
    @Param('categoria') categoria: string,
  ) {
    return this.productosService.filtro(precio, categoria);
  } */

  /////ORDENAR PRODUCTOS POR PRECIO
  @Public()
  @Get('/filtro/:precio')
  ordenar(@Param('precio') precio: string) {
    return this.productosService.findAllOrderPrice(precio);
  }

  @Public()
  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  //////buscar por nombre
  @Public()
  @Get(':searchValue')
  findOne(@Param('searchValue') searchValue: string) {
    return this.productosService.findOne(searchValue);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }
}
