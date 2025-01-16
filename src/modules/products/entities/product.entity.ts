import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductStatus } from './productStatus.entity';
import { ProductCategory } from './productCategory.entity.';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  slug: string;

  @Column()
  image: string;

  @ManyToOne(() => ProductStatus, (status) => status.products)
  @JoinColumn({ name: 'status_id' })
  status: ProductStatus;

  @ManyToOne(() => ProductCategory, (status) => status.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @Column()
  provider: string;
}
