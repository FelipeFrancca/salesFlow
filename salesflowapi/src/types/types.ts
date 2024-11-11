export interface VendaType {
  id: number;
  vendaTitle: string;
  vendaDesc: string;
  valor: number;
  data: Date;
  compras: CompraType[];
}

export interface CompraType {
  id: number;
  compraTitle: string;
  compraDesc: string;
  valor: number;
  data: Date;
  venda: VendaType;
  compraProdutos: CompraProdutoType[];
}

export interface ProdutoType {
  id: number;
  produtoTitle: string;
  valor: number;
  data: Date;
  compraProdutos: CompraProdutoType[];
}

export interface CompraProdutoType {
  id: number;
  compra: CompraType;
  produto: ProdutoType;
  quantidade: number;
  preco: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
}