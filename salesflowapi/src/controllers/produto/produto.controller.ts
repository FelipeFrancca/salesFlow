import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ProdutoService } from '../../services/produto/produto.service';
import { Produto } from '../../components/entities/produto.entity';
import { ApiResponse } from '../../types/types';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Produto[]>> {
    const produtos = await this.produtoService.findAll();

    return {
      data: produtos,
      status: 200,
    };
  }

  @Post()
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ApiResponse<void>> {
    const result = await this.produtoService.delete(id);

    if (result) {
      return {
        data: undefined,
        status: 200,
      };
    } else {
      return {
        data: undefined,
        status: 404,
      };
    }
  }
}
