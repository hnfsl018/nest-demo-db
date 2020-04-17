import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get()
  async getProduct() {
    return await this.productService.getProducts();
  }

  @Get('/custom')
  async getCustom(): Promise<any> {
    return await this.productService.getCustom(1);
  }

  @Get('/pagi')
  async getPagi(@Query('page') page) {
    return this.productService.getPagi(page)
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.getSomeField(id);
  }
}
