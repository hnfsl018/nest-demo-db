import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column()
  name: string;

  @Column()
  qty: number;
}
