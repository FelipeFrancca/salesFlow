import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from '../../components/entities/compra.entity';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
  ) {}

  findAll(): Promise<Compra[]> {
    return this.compraRepository.find({ relations: ['venda'] });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id },
      relations: ['venda'],
    });
    if (!compra) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }
    return compra;
  }

  create(compra: Compra): Promise<Compra> {
    return this.compraRepository.save(compra);
  }

  async update(id: number, compra: Compra): Promise<Compra> {
    const existingCompra = await this.findOne(id);
    const updatedCompra = Object.assign(existingCompra, compra);
    return this.compraRepository.save(updatedCompra);
  }

  
  async remove(id: number): Promise<void> {
    const compra = await this.findOne(id);
    await this.compraRepository.remove(compra);
  }
}
