import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/statuses')
  async findStatuses() {
    const data = await this.productsService.findStatuses();
    return {
      message: 'estados del producto',
      data,
    };
  }

  @Get('/categories')
  async findCategories() {
    const data = await this.productsService.findCategories();
    return {
      message: 'categorias del producto',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.productsService.findAll();
    return {
      message: 'Lista de productos',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.productsService.findOne(id);
    return {
      message: 'DEtalle del producto',
      data,
    };
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return {
      message: 'Producto creado de forma correcta',
      data: []
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productsService.update(id, updateProductDto);
    return {
      message: 'Actualizado de forma correcta del producto',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productsService.remove(id);
    return {
      message: 'Eliminado de forma correcta',
      data: [],
    };
  }
}
