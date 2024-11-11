import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from '../components/entities/venda.entity';
import { VendaService } from '../services/venda/venda.service';
import { VendaController } from '../controllers/venda/venda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Venda])],
  providers: [VendaService],
  controllers: [VendaController],
  exports: [VendaService],
})
export class VendaModule {}
