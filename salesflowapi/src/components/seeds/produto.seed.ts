import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoSeedService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async seed() {
    const existingProdutos = await this.produtoRepository.count();
    if (existingProdutos === 0) {
      const produtos = [
        this.produtoRepository.create({
          produtoTitle: 'Amortecedor traseiro básico',
          valor: 120.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Amortecedor dianteiro esportivo',
          valor: 180.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Kit de embreagem linha econômica',
          valor: 1600.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Kit de embreagem reforçado',
          valor: 2100.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Pastilha de freio de alta durabilidade',
          valor: 320.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Pastilha de freio premium traseira',
          valor: 280.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Óleo para freio',
          valor: 60.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Desengraxante industrial',
          valor: 55.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Lubrificante multiuso',
          valor: 22.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Parafuso de fixação para amortecedores',
          valor: 15.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Porca de fixação para pastilhas',
          valor: 5.00,
          data: new Date(),
        }),
        this.produtoRepository.create({
          produtoTitle: 'Kit de fixação para embreagem',
          valor: 35.00,
          data: new Date(),
        }),
      ];      

      await this.produtoRepository.save(produtos);
      console.log('Produtos iniciais inseridas.');
    }
  }
}
