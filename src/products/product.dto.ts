import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @Min(0)
    @Max(10)
    qty: number
}