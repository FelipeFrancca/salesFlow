import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CompraService } from '../../services/compra/compra.service';
import { Compra } from '../../components/entities/compra.entity';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get()
  findAll(): Promise<Compra[]> {
    return this.compraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Compra> {
    return this.compraService.findOne(+id);
  }

  @Post()
  create(@Body() compra: Compra): Promise<Compra> {
    return this.compraService.create(compra);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() compra: Compra): Promise<Compra> {
    return this.compraService.update(+id, compra);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.compraService.remove(+id);
  }
}
