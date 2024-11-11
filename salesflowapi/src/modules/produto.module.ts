import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../components/entities/produto.entity';
import { ProdutoService } from '../services/produto/produto.service';
import { ProdutoController } from '../controllers/produto/produto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [ProdutoService],
})
export class ProdutoModule {}
