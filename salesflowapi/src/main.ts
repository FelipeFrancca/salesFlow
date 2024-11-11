import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VendaSeedService } from './components/seeds/venda.seed';
import { CompraSeedService } from './components/seeds/compra.seed';
import { ProdutoSeedService } from './components/seeds/produto.seed';
import { CompraProdutoSeedService } from './components/seeds/compraproduto.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const vendaSeedService = app.get(VendaSeedService);
    const compraSeedService = app.get(CompraSeedService);
    const produtoSeedService = app.get(ProdutoSeedService);
    const compraprodutoSeedService = app.get(CompraProdutoSeedService);

    await vendaSeedService.seed();
    await compraSeedService.seed();
    await produtoSeedService.seed();
    await compraprodutoSeedService.seed();
  }

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
