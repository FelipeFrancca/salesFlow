import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from '../entities/compra.entity';
import { Venda } from '../entities/venda.entity';

@Injectable()
export class CompraSeedService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}

  async seed() {
    const existingCompras = await this.compraRepository.count();
    if (existingCompras === 0) {
      const vendas = await this.vendaRepository.find();

      if (vendas.length > 0) {
        const compras = [
          this.compraRepository.create({
            compraTitle: 'Compra de amortecedor traseiro básico',
            compraDesc: 'Compra de amortecedor traseiro para veículos de passeio',
            valor: 60.00,
            data: new Date(),
            venda: vendas[0],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de amortecedor dianteiro esportivo',
            compraDesc: 'Amortecedor dianteiro com maior resistência, linha esportiva',
            valor: 200.00,
            data: new Date(),
            venda: vendas[0],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de kit completo de amortecedores',
            compraDesc: 'Kit de amortecedores traseiros e dianteiros para SUVs',
            valor: 400.00,
            data: new Date(),
            venda: vendas[0],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de amortecedores reforçados',
            compraDesc: 'Amortecedores traseiros para uso em veículos comerciais',
            valor: 180.00,
            data: new Date(),
            venda: vendas[0],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de kit de embreagem para caminhonetes',
            compraDesc: 'Compra para reposição em frota de veículos comerciais',
            valor: 1900.00,
            data: new Date(),
            venda: vendas[1],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de embreagem linha econômica',
            compraDesc: 'Kit de embreagem básico para veículos de passeio',
            valor: 1600.00,
            data: new Date(),
            venda: vendas[1],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de kit de embreagem reforçado',
            compraDesc: 'Kit para veículos de alto desempenho e cargas pesadas',
            valor: 2200.00,
            data: new Date(),
            venda: vendas[1],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de pastilhas de freio dianteiras',
            compraDesc: 'Pastilhas com maior durabilidade para uso urbano',
            valor: 280.00,
            data: new Date(),
            venda: vendas[2],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de pastilhas de freio traseiras linha premium',
            compraDesc: 'Pastilhas de freio para veículos de alto desempenho',
            valor: 400.00,
            data: new Date(),
            venda: vendas[2],
          }),
          this.compraRepository.create({
            compraTitle: 'Compra de pastilhas de freio com desconto',
            compraDesc: 'Pastilhas em promoção, aproveitando desconto por volume',
            valor: 270.00,
            data: new Date(),
            venda: vendas[2],
          }),
        ];

        await this.compraRepository.save(compras);
        console.log('Compras iniciais inseridas.');
      } else {
        console.log('Nenhuma venda encontrada para associar as compras.');
      }
    }
  }
}