import { Test, TestingModule } from '@nestjs/testing';
import { CompraProdutoController } from './compraproduto.controller';
import { CompraProdutoService } from '../../services/compraproduto/compraproduto.service';
import { Compra } from '../../components/entities/compra.entity';
import { Produto } from '../../components/entities/produto.entity';

describe('CompraProdutoController', () => {
  let controller: CompraProdutoController;
  let service: CompraProdutoService;

  const mockCompraProduto = {
    id: 1,
    compra: { id: 1 } as Compra,
    produto: { id: 1 } as Produto,
  };

  const mockCompraProdutoService = {
    addProductToCompra: jest.fn().mockResolvedValue(mockCompraProduto),
    removeProductFromCompra: jest.fn().mockResolvedValue({ affected: 1 }),
    updateCompraProduto: jest.fn().mockResolvedValue({ affected: 1 }),
    getProductsByCompra: jest.fn().mockResolvedValue([mockCompraProduto]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompraProdutoController],
      providers: [
        {
          provide: CompraProdutoService,
          useValue: mockCompraProdutoService,
        },
      ],
    }).compile();

    controller = module.get<CompraProdutoController>(CompraProdutoController);
    service = module.get<CompraProdutoService>(CompraProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a product to a compra', async () => {
    const compra = { id: 1 } as Compra;
    const produto = { id: 1 } as Produto;
    const result = await controller.addProductToCompra(compra, produto);

    expect(service.addProductToCompra).toHaveBeenCalledWith(compra, produto);
    expect(result).toEqual(mockCompraProduto);
  });

  it('should remove a product from a compra', async () => {
    const result = await controller.removeProductFromCompra(1);
    expect(service.removeProductFromCompra).toHaveBeenCalledWith(1);
    expect(result.affected).toEqual(1);
  });

  it('should update a product in a compra', async () => {
    const produto = { id: 2 } as Produto;
    const result = await controller.updateCompraProduto(1, produto);

    expect(service.updateCompraProduto).toHaveBeenCalledWith(1, produto);
    expect(result.affected).toEqual(1);
  });

  it('should get all products by compra ID', async () => {
    const result = await controller.getProductsByCompra(1);
    expect(service.getProductsByCompra).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockCompraProduto]);
  });
});
