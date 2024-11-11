import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraProduto } from '../../components/entities/compraproduto.entity';
import { Compra } from '../../components/entities/compra.entity';
import { Produto } from '../../components/entities/produto.entity';

@Injectable()
export class CompraProdutoService {
  constructor(
    @InjectRepository(CompraProduto)
    private compraProdutoRepository: Repository<CompraProduto>,
  ) {}

  async addProductToCompra(compra: Compra, produto: Produto): Promise<CompraProduto> {
    const compraProduto = this.compraProdutoRepository.create({ compra, produto });
    return this.compraProdutoRepository.save(compraProduto);
  }

  async removeProductFromCompra(compraProdutoId: number): Promise<void> {
    const compraProduto = await this.findOne(compraProdutoId);
    await this.compraProdutoRepository.remove(compraProduto);
  }

  async updateCompraProduto(compraProdutoId: number, produto: Produto): Promise<CompraProduto> {
    const compraProduto = await this.findOne(compraProdutoId);
    compraProduto.produto = produto;
    return this.compraProdutoRepository.save(compraProduto);
  }

  async getProductsByCompra(compraId: number): Promise<CompraProduto[]> {
    return this.compraProdutoRepository.find({
      where: { compra: { id: compraId } },
      relations: ['produto', 'compra'],
    });
  }

  async findOne(id: number): Promise<CompraProduto> {
    const compraProduto = await this.compraProdutoRepository.findOne({
      where: { id },
      relations: ['produto', 'compra'],
    });
    if (!compraProduto) {
      throw new NotFoundException(`CompraProduto com ID ${id} não encontrada`);
    }
    return compraProduto;
  }
}
