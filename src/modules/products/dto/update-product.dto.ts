import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  statusId?: number;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  provider?: string;
}
