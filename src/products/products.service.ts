import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { Product } from './products.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(body: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = body.name;
    product.qty = body.qty;
    try {
      await product.save();
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ id: id });
    if (!product) throw new NotFoundException('noooooooo');
    return product;
  }

  async getSomeField(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      select: ['id', 'name'],
      where: {
        id: id,
      },
    });
    if (!product) throw new NotFoundException('product not fount');
    return product;
  }

  async getCustom(id: number): Promise<any> {
    const product = await this.productRepository.getCustom(id);
    return product;
  }

  async getPagi(page: number): Promise<any> {
    const [result, total] = await this.productRepository.findAndCount({
      select: ['id', 'name'],
      skip: (page - 1) * 2,
      take: 2,
      order: {
          name: 'ASC'
      }
    });
    if(result.length == 0) throw new NotFoundException();
    return {
        items: result,
        total: total,
        page: page
    }
  }
  
  async getDemo() {
      const demo = this.productRepository.query(``,[])
  }
  
}
