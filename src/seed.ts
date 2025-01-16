import { DataSource } from 'typeorm';
import { Product } from './modules/products/entities/product.entity';
import { ProductCategory } from './modules/products/entities/productCategory.entity.';
import { ProductStatus } from './modules/products/entities/productStatus.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Root@1234',
  database: 'play',
  entities: [Product, ProductCategory, ProductStatus],
  synchronize: false, // Asegúrate de que la sincronización esté gestionada manualmente
  logging: true,
});

async function seed() {
  try {
    await dataSource.initialize();

    console.log('Database connected.');

    const categoriesData = ['Tecnología', 'Hogar y muebles', 'Herramientas'];

    const statusesData = ['pendiente', 'publicado', 'finalizado', 'eliminado'];

    // crear categorias
    const categories = categoriesData.map((category) => {
      const newCategory = new ProductCategory();
      newCategory.name = category;
      return newCategory;
    });
    await dataSource.manager.save(categories);

    // crear estados
    const statuses = statusesData.map((status) => {
      const newCategory = new ProductStatus();
      newCategory.name = status;
      return newCategory;
    });
    await dataSource.manager.save(statuses);

    console.log('Data seeded successfully.');
    await dataSource.destroy();

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const resourceTypes: ('blog' | 'video' | 'ebook')[] = [
  'blog',
  'video',
  'ebook',
];

// Función para generar un texto Lorem Ipsum aleatorio
function generateLoremIpsum(
  paragraphs: number = 1,
  sentences: number = 5,
): string {
  const lorem = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
    'Integer vitae libero ac risus egestas placerat. Integer imperdiet lectus quis justo feugiat suscipit.',
    'Aenean laoreet turpis ac sapien euismod hendrerit. Vivamus posuere orci at sapien lacinia, ut ullamcorper felis sagittis.',
  ];

  let loremIpsumText = '';
  for (let i = 0; i < paragraphs; i++) {
    let paragraph = '';
    for (let j = 0; j < sentences; j++) {
      const sentence = lorem[Math.floor(Math.random() * lorem.length)];
      paragraph += sentence + ' ';
    }
    loremIpsumText += `<p>${paragraph.trim()}</p>\n`;
  }

  return loremIpsumText;
}

function getRandomFileType(): string {
  const fileTypes = ['PDF', 'Presentación'];
  const randomIndex = Math.floor(Math.random() * fileTypes.length);
  return fileTypes[randomIndex];
}

seed();
