import { Controller, Post, Delete, Put, Get, Param, Body } from '@nestjs/common';
import { CompraProdutoService } from '../../services/compraproduto/compraproduto.service';
import { Compra } from '../../components/entities/compra.entity';
import { Produto } from '../../components/entities/produto.entity';
import { CompraProduto } from '../../components/entities/compraproduto.entity';

@Controller('compraproduto')
export class CompraProdutoController {
  constructor(private readonly compraProdutoService: CompraProdutoService) {}

  @Post()
  async addProductToCompra(
    @Body('compra') compra: Compra,
    @Body('produto') produto: Produto,
  ): Promise<CompraProduto> {
    return this.compraProdutoService.addProductToCompra(compra, produto);
  }

  @Delete(':id')
  async removeProductFromCompra(@Param('id') id: number): Promise<void> {
    return this.compraProdutoService.removeProductFromCompra(id);
  }
  
  @Put(':id')
  async updateCompraProduto(
    @Param('id') id: number,
    @Body('produto') produto: Produto,
  ): Promise<CompraProduto> {
    return this.compraProdutoService.updateCompraProduto(id, produto);
  }

  @Get(':compraId')
  async getProductsByCompra(@Param('compraId') compraId: number): Promise<CompraProduto[]> {
    return this.compraProdutoService.getProductsByCompra(compraId);
  }

  @Get('item/:id')
  async findOne(@Param('id') id: number): Promise<CompraProduto> {
    return this.compraProdutoService.findOne(id);
  }
}