import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Compra } from './compra.entity';
import { VendaType } from '../../types/types';

@Entity()
export class Venda implements VendaType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  vendaTitle: string;

  @Column({ type: 'text' })
  vendaDesc: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @OneToMany(() => Compra, (compra) => compra.venda, { cascade: true })
  compras: Compra[];
}