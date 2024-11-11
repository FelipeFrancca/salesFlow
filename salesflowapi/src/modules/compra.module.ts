import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from '../components/entities/compra.entity';
import { CompraService } from '../services/compra/compra.service';
import { CompraController } from '../controllers/compra/compra.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Compra])],
  providers: [CompraService],
  controllers: [CompraController],
  exports: [CompraService],
})
export class CompraModule {}
