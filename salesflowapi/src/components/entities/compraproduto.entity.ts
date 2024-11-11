import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Compra } from './compra.entity';
import { Produto } from './produto.entity';
import { CompraProdutoType } from '../../types/types';

@Entity()
export class CompraProduto implements CompraProdutoType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Compra, (compra) => compra.compraProdutos, { onDelete: 'CASCADE' })
  compra: Compra;

  @ManyToOne(() => Produto, (produto) => produto.compraProdutos, { onDelete: 'CASCADE' })
  produto: Produto;

  @Column('int')
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;
}
