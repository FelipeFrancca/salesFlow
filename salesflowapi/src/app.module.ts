import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VendaModule } from './modules/venda.module';
import { CompraModule } from './modules/compra.module';
import { ProdutoModule } from './modules/produto.module';
import { CompraProdutoModule } from './modules/compraproduto.module';
import { SeedModule } from './modules/seed.module';

import { Venda } from './components/entities/venda.entity';
import { Compra } from './components/entities/compra.entity';
import { Produto } from './components/entities/produto.entity';
import { CompraProduto } from './components/entities/compraproduto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Venda, 
        Compra, 
        Produto, 
        CompraProduto,
        __dirname + '/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
    }),
    VendaModule,
    CompraModule,
    ProdutoModule,
    CompraProdutoModule,
    SeedModule,
  ],
})
export class AppModule {}
