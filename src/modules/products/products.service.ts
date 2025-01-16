import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from './entities/productStatus.entity';
import { Like, Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity.';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductStatus)
    private readonly statusRepository: Repository<ProductStatus>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['status', 'category'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const data = await this.productRepository.findOne({
      where: { id },
      relations: ['status', 'category'],
    });

    if (!data) throw new NotFoundException(`No existe el producto`);

    return data;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { statusId, categoryId, name,...productDetails } = createProductDto;
    const slug = await this.validSlug(name)
    const product = this.productRepository.create({
      ...productDetails,
      name,
      slug,
      category: {
        id: createProductDto.categoryId,
      },
      status: {
        id: 1, // estado pendiente
      },
    });
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { statusId, categoryId, ...productDetails } = updateProductDto;
    
    await this.productRepository.update(id, {
      ...productDetails,
      category: {
        id: updateProductDto.categoryId,
      },
      status: {
        id: statusId,
      },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.delete(product.id);
  }

  async findStatuses(): Promise<ProductStatus[]> {
    return this.statusRepository.find();
  }

  async findCategories(): Promise<ProductCategory[]> {
    return this.categoryRepository.find();
  }

  async validSlug(name: string) {
    const slugAux = slugify(name, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    const products = await this.productRepository.find({
      where: {
        slug: Like(`${slugAux}%`)
      },
    });
    const slug = `${slugAux}${products.length > 0 ? `-${products.length}` : ''}`;
    return slug;
  }
}
