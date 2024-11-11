import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { CompraProduto } from './compraproduto.entity';
import { ProdutoType } from '../../types/types';

@Entity()
@Index('IDX_PRODUTO_TITLE', ['produtoTitle'])
export class Produto implements ProdutoType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  produtoTitle: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @OneToMany(() => CompraProduto, (compraProduto) => compraProduto.produto)
  compraProdutos: CompraProduto[];
}
