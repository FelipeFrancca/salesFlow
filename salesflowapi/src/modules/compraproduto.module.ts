import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraProduto } from '../components/entities/compraproduto.entity';
import { CompraProdutoService } from '../services/compraproduto/compraproduto.service';
import { CompraProdutoController } from '../controllers/compraproduto/compraproduto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompraProduto])],
  providers: [CompraProdutoService],
  controllers: [CompraProdutoController],
  exports: [CompraProdutoService],
})
export class CompraProdutoModule {}
