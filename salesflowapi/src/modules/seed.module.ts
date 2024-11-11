import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from '../components/entities/venda.entity';
import { Compra } from '../components/entities/compra.entity';
import { Produto } from '../components/entities/produto.entity';
import { CompraProduto } from '../components/entities/compraproduto.entity';

import { VendaSeedService } from '../components/seeds/venda.seed';
import { CompraSeedService } from '../components/seeds/compra.seed';
import { ProdutoSeedService } from '../components/seeds/produto.seed';
import { CompraProdutoSeedService } from '../components/seeds/compraproduto.seed';

import { VendaService } from '../services/venda/venda.service';
import { ProdutoService } from '../services/produto/produto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda, Compra, Produto, CompraProduto]),
  ],
  providers: [
    VendaSeedService,
    CompraSeedService,
    ProdutoSeedService,
    CompraProdutoSeedService,
    VendaService,
    ProdutoService,
  ],
  exports: [
    VendaSeedService,
    CompraSeedService,
    ProdutoSeedService,
    CompraProdutoSeedService,
  ],
})
export class SeedModule {}
