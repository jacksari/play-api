import { IsNotEmpty, IsString, IsInt, IsUrl, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  statusId: number; // status_id

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  categoryId: number; // category_id

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  provider: string;
}
