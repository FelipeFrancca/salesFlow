"use client";

import { FC, useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/PostAdd";
import { Spinner } from "@material-tailwind/react";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import api from "../../../../services/AppRoutes";
import { useRouter } from "next/navigation";
import Slider from "@mui/material/Slider";

const formatCurrency = (value: number | string): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<ApiResponse<ProdutoType[]>>("/produtos");
        console.log("Resposta completa:", response);

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("A resposta não contém um array de produtos:", response);
        }
      } catch (error) {
        console.log("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner className="h-12 w-12" color="indigo" />
      </div>
    );
  }

 
  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.produtoTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.valor >= priceRange[0] && product.valor <= priceRange[1];
    return matchesTitle && matchesPrice;
  });

  const ProductCard: FC<{ product: ProdutoType }> = ({ product }) => {
    return (
      <div className="w-52 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        <BrokenImageIcon style={{ fontSize: 50 }} className="text-gray-300" />
        <h3 className="text-lg font-semibold">{product.produtoTitle}</h3>
        <p className="text-purple-700">{formatCurrency(product.valor)}</p> {/* Aqui formata o valor */}
      </div>
    );
  };

  const handleAddProduct = () => {
    router.push("/pages/cadastroProduto");
  };

  return (
    <div className="flex w-3/5 mb-5">
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-6 items-center w-full">
          <input
            type="text"
            placeholder="Buscar por nome ou valor"
            className="p-2 border rounded-md mr-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col items-center w-56">
            <p>Faixa de preço</p>
            <p>R$ {priceRange[0]} - R$ {priceRange[1]}</p>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `R$ ${value}`}
              min={0}
              max={20000}
              step={50}
            />
          </div>
          <Button
            sx={{
              backgroundColor: "#6B7280",
              color: "#FFFFFF",
              width: "120px",
              height: "100%",
            }}
            variant="contained"
            size="small"
            onClick={handleAddProduct}
          >
            <AddIcon /> Novo
          </Button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum produto encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
