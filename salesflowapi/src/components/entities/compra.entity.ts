import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Venda } from './venda.entity';
import { CompraProduto } from './compraproduto.entity';
import { CompraType } from '../../types/types';

@Entity()
@Index('IDX_VENDA', ['venda'])
export class Compra implements CompraType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  compraTitle: string;

  @Column({ type: 'text' })
  compraDesc: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @ManyToOne(() => Venda, (venda) => venda.compras, { nullable: false })
  venda: Venda;

  @OneToMany(() => CompraProduto, (compraProduto) => compraProduto.compra, { cascade: true })
  compraProdutos: CompraProduto[];
}
