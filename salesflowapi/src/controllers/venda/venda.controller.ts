import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VendaService } from '../../services/venda/venda.service';
import { Venda } from '../../components/entities/venda.entity';

@Controller('vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Get()
  findAll(): Promise<Venda[]> {
    return this.vendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Venda> {
    return this.vendaService.findOne(+id);
  }

  @Post()
  create(@Body() venda: Venda): Promise<Venda> {
    return this.vendaService.create(venda);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() venda: Venda): Promise<Venda> {
    return this.vendaService.update(+id, venda);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.vendaService.remove(+id);
  }
}
