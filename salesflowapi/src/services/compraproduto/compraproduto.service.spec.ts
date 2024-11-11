import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompraProdutoService } from './compraproduto.service';
import { CompraProduto } from '../../components/entities/compraproduto.entity';
import { Repository } from 'typeorm';
import { Compra } from '../../components/entities/compra.entity';
import { Produto } from '../../components/entities/produto.entity';

describe('CompraProdutoService', () => {
  let service: CompraProdutoService;
  let repository: Repository<CompraProduto>;

  const mockCompraProduto = {
    id: 1,
    compra: { id: 1 } as Compra,
    produto: { id: 1 } as Produto,
  };

  const mockCompraProdutoRepository = {
    create: jest.fn().mockReturnValue(mockCompraProduto),
    save: jest.fn().mockResolvedValue(mockCompraProduto),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    find: jest.fn().mockResolvedValue([mockCompraProduto]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompraProdutoService,
        {
          provide: getRepositoryToken(CompraProduto),
          useValue: mockCompraProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<CompraProdutoService>(CompraProdutoService);
    repository = module.get<Repository<CompraProduto>>(getRepositoryToken(CompraProduto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a product to a compra', async () => {
    const compra = { id: 1 } as Compra;
    const produto = { id: 1 } as Produto;
    const result = await service.addProductToCompra(compra, produto);

    expect(repository.create).toHaveBeenCalledWith({ compra, produto });
    expect(repository.save).toHaveBeenCalledWith(mockCompraProduto);
    expect(result).toEqual(mockCompraProduto);
  });

  it('should remove a product from a compra', async () => {
    const result = await service.removeProductFromCompra(1);
    expect(result.affected).toEqual(1);
  });

  it('should update the product associated with a compra', async () => {
    const produto = { id: 2 } as Produto;
    const result = await service.updateCompraProduto(1, produto);

    expect(repository.update).toHaveBeenCalledWith(1, { produto });
    expect(result.affected).toEqual(1);
  });

  it('should get all products by compra ID', async () => {
    const result = await service.getProductsByCompra(1);
    expect(repository.find).toHaveBeenCalledWith({
      where: { compra: { id: 1 } },
      relations: ['produto', 'compra'],
    });
    expect(result).toEqual([mockCompraProduto]);
  });
});
