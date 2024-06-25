import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as Excel from 'exceljs';
import { QueryBuilder } from 'typeorm'; // Import QueryBuilder
import { Producto } from '../entities/producto.entity';

@Injectable()
export class CategoriasService {
  //constructor(@Inject('PG_DATABASE') private clientPg: Client) {}
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto) // Inject ProductoRepository
    private readonly productoRepository: Repository<any>,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    const newCategoria =
      await this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(newCategoria);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async find(id: number) {
    const result = await this.categoriaRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new NotFoundException(`Error ,${id}`);
    }
    return result;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!categoria) {
      throw new NotFoundException(`Error ,${id}`);
    }
    this.categoriaRepository.merge(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const products = this.productoRepository.find({
      relations: ['categoria'],
      where: {
        // Add your 'where' condition here
        categoria: {
          // Filter within 'categoria'
          id: id, // Example: Filter by categoriaId = 10
        },
      },
    });
    if ((await products).length <= 0) {
      const categoria = await this.categoriaRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!categoria) {
        throw new NotFoundException();
      }
      return await this.categoriaRepository.delete(id);
    } else {
      throw new BadRequestException({
        msj: 'la categoria es utilizada por varios productos',
      });
    }
  }

  /////load excel
  async loadFromExcel(filePath: string) {
    try {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja del libro

      // 3. Validate number of columns
      const columnCount =
        worksheet.actualRowCount > 0 ? worksheet.getRow(1).actualCellCount : 0;
      if (columnCount !== 4) {
        return new BadRequestException({
          msj: 'El archivo debe tener 4 columnas',
        });
      }

      let rowNumber = 2;
      worksheet.eachRow(async (row, rowNumber) => {
        const categoria = new Categoria();
        categoria.nombre = row.getCell(1).text;
        categoria.imagen = row.getCell(2).text;
        categoria.descripcion = row.getCell(3).text;
        categoria.estado = !!row.getCell(4).text;
        //const datos = JSON.stringify(categoria);
        await this.categoriaRepository.save(categoria);
      });
      return { message: 'Datos cargados exitosamente' };
      ///('Datos cargados exitosamente');
    } catch (error) {
      console.log(error);
    }
  }

  ////export
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

  /* async exportToExcel() {
    const categorias = await this.categoriaRepository.find();
    //return categorias;
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Categorias');

    for (const categoria of categorias) {
      worksheet.getCell(1, categoria.id).value = categoria.nombre;
      worksheet.getCell(2, categoria.id).value = categoria.imagen;
      worksheet.getCell(3, categoria.id).value = categoria.descripcion;
      worksheet.getCell(4, categoria.id).value = categoria.estado;
    }

    console.log('Datos exportados exitosamente');

    await workbook.xlsx.writeFile('categorias.xlsx');
  } */
}
