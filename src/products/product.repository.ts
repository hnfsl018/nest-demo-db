import { Repository, EntityRepository } from 'typeorm';
import { Product } from './products.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getCustom(id: number): Promise<any> {
    const product = this.query(
        `
            SELECT * FROM product WHERE id != $1
        `,
      [id],
    );
    return product
  }
}
