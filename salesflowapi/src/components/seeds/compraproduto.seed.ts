import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from '../entities/compra.entity';
import { Produto } from '../entities/produto.entity';
import { CompraProduto } from '../entities/compraproduto.entity';

@Injectable()
export class CompraProdutoSeedService {
  constructor(
    @InjectRepository(CompraProduto)
    private compraProdutoRepository: Repository<CompraProduto>,
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async seed() {
    const existingCompraProdutos = await this.compraProdutoRepository.count();
    if (existingCompraProdutos === 0) {
      const compras = await this.compraRepository.find();
      const produtos = await this.produtoRepository.find();

      if (compras.length > 0 && produtos.length > 0) {
        const compraProdutos = [
          this.compraProdutoRepository.create({
            compra: compras[0],
            produto: produtos[0],
            quantidade: 2,
            preco: 60.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[0],
            produto: produtos[9],
            quantidade: 4,
            preco: 15.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[1],
            produto: produtos[1],
            quantidade: 1,
            preco: 200.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[1],
            produto: produtos[3],
            quantidade: 1,
            preco: 2100.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[2],
            produto: produtos[0],
            quantidade: 2,
            preco: 120.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[2],
            produto: produtos[1],
            quantidade: 1,
            preco: 180.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[3],
            produto: produtos[0],
            quantidade: 1,
            preco: 120.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[3],
            produto: produtos[9],
            quantidade: 3,
            preco: 15.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[4],
            produto: produtos[2],
            quantidade: 1,
            preco: 1600.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[4],
            produto: produtos[11],
            quantidade: 2,
            preco: 35.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[5],
            produto: produtos[2],
            quantidade: 1,
            preco: 1600.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[5],
            produto: produtos[10],
            quantidade: 10,
            preco: 5.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[6],
            produto: produtos[3],
            quantidade: 1,
            preco: 2100.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[6],
            produto: produtos[11],
            quantidade: 2,
            preco: 35.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[7],
            produto: produtos[4],
            quantidade: 2,
            preco: 320.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[7],
            produto: produtos[6],
            quantidade: 1,
            preco: 60.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[8],
            produto: produtos[5],
            quantidade: 2,
            preco: 280.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[8],
            produto: produtos[10],
            quantidade: 15,
            preco: 5.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[9],
            produto: produtos[4],
            quantidade: 1,
            preco: 320.0,
          }),
          this.compraProdutoRepository.create({
            compra: compras[9],
            produto: produtos[8],
            quantidade: 3,
            preco: 22.0,
          }),
        ];

        await this.compraProdutoRepository.save(compraProdutos);
        console.log('Associações de CompraProduto iniciais inseridas.');
      } else {
        console.log('Não foram encontradas compras e produtos para associar.');
      }
    }
  }
}
