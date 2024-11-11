import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../../components/entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: ['compraProdutos'],
    });
  }

  create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }
 
  async delete(id: number): Promise<boolean> {
    const produto = await this.produtoRepository.findOne({ where: { id } });

    if (!produto) {
      return false;
    }

    await this.produtoRepository.remove(produto);
    return true;
  }
}
