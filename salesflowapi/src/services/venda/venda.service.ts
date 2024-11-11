import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from '../../components/entities/venda.entity';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}

  findAll(): Promise<Venda[]> {
    return this.vendaRepository.find({ relations: ['compras'] });
  }

  async findOne(id: number): Promise<Venda> {
    const venda = await this.vendaRepository.findOne({
      where: { id },
      relations: ['compras'],
    });
    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada`);
    }
    return venda;
  }

  create(venda: Venda): Promise<Venda> {
    return this.vendaRepository.save(venda);
  }

  async update(id: number, venda: Venda): Promise<Venda> {
    const existingVenda = await this.findOne(id);
    const updatedVenda = Object.assign(existingVenda, venda);
    return this.vendaRepository.save(updatedVenda);
  }

  async remove(id: number): Promise<void> {
    const venda = await this.findOne(id);
    await this.vendaRepository.remove(venda);
  }
}
