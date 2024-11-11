declare global {
  export interface CompraType {
    id: number;
    compraTitle: string;
    compraDesc: string;
    valor: number;
    data: Date;
    compras: Array<VendaType>;
  }

  export interface VendaType {
    id: number;
    vendaTitle: string;
    vendaDesc: string;
    valor: number;
    data: Date;
    compras: Array<CompraType>;
  }

  export interface SaleViewProps {
    id: string;
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
    produtoId: number;
    compraId: number;
    produto: ProdutoType;
    compra: CompraType;
  }

  export interface ApiResponse<T = any> {
    data: T;
    status: number;
  }
}
export {};
