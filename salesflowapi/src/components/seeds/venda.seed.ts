import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from '../entities/venda.entity';

@Injectable()
export class VendaSeedService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}

  async seed() {
    const existingVendas = await this.vendaRepository.count();
    if (existingVendas === 0) {
      const vendas = [
        this.vendaRepository.create({
          vendaTitle: 'Amortecedores',
          vendaDesc: 'O pagamento dos amortecedores foi realizado no pix',
          valor: 1199.00,
          data: new Date(),
          compras: [],
        }),
        this.vendaRepository.create({
          vendaTitle: 'Kit de embreagem',
          vendaDesc: 'O pagamento do kit de embreagem foi realizado no cartão',
          valor: 2300.00,
          data: new Date(),
          compras: [],
        }),
        this.vendaRepository.create({
          vendaTitle: 'Pastilhas de freio',
          vendaDesc: 'O pagamento do  pastilhas de freio foi realizado no boleto',
          valor: 300.00,
          data: new Date(),
          compras: [],
        }),
      ];

      await this.vendaRepository.save(vendas);
      console.log('Vendas iniciais inseridas.');
    }
  }
}
