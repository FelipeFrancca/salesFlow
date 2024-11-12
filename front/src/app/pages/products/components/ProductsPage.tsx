"use client";

import { FC, useState, useEffect } from "react";
import { useCart } from "../../cart/CartContext";
import { useRouter } from "next/navigation";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/PostAdd";
import { Spinner } from "@material-tailwind/react";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import api from "../../../../services/AppRoutes";
import Slider from "@mui/material/Slider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2"; 
import { FormatCurrency } from "../../utils/formatCurrency";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProdutoType | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedValue, setEditedValue] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<ApiResponse<ProdutoType[]>>("/produtos");
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
    const { addToCart, cart } = useCart();

    const handleAddToCart = () => {
      addToCart({ id: product.id, produtoTitle: product.produtoTitle, valor: product.valor });
      console.log("Carrinho Atualizado: ", cart);
      
      Swal.fire({
        title: 'Produto adicionado!',
        text: `${product.produtoTitle} foi adicionado ao seu carrinho.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    };
    
    const handleEditProduct = (product: ProdutoType) => {
      setCurrentProduct(product);
      setEditedName(product.produtoTitle);
      setEditedValue(product.valor);
      setOpenDialog(true);
    };

    
    const handleDeleteProduct = (productId: number) => {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Você tem certeza de que deseja excluir este produto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(`/produtos/${productId}`);
            setProducts(products.filter((prod) => prod.id !== productId)); 
            Swal.fire('Produto excluído!', '', 'success');
          } catch (error) {
            console.log('Erro ao excluir produto:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o produto.', 'error');
          }
        }
      });
    };

    return (
      <div className="w-52 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <BrokenImageIcon style={{ fontSize: 50 }} className="text-gray-300" />
      <h3 className="text-lg font-semibold">{product.produtoTitle}</h3>
      <p className="text-purple-700">{FormatCurrency(product.valor)}</p>
      <Button onClick={handleAddToCart} variant="contained" color="primary" size="small">
        Adicionar ao Carrinho
      </Button>
    </div>
    );
  };

  const handleAddProduct = () => {
    router.push("/pages/productRegistration");
  };

  const handleSaveEdit = async () => {
    if (currentProduct) {
      try {
        await api.put(`/produtos/${currentProduct.id}`, {
          produtoTitle: editedName,
          valor: editedValue,
        });
        setProducts(products.map((prod) =>
          prod.id === currentProduct.id ? { ...prod, produtoTitle: editedName, valor: editedValue } : prod
        ));
        setOpenDialog(false);  
        Swal.fire('Produto atualizado!', '', 'success');
      } catch (error) {
        console.log('Erro ao atualizar produto:', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao atualizar o produto.', 'error');
      }
    }
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="edit-product-dialog">
        <DialogTitle id="edit-product-dialog">Editar Produto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do Produto"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Valor"
            type="number"
            fullWidth
            value={editedValue}
            onChange={(e) => setEditedValue(Number(e.target.value))}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
