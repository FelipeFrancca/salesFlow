"use client";

import { Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../services/AppRoutes"; 

const formatCurrency = (value: number | string): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
};

const CartPage = () => {
  const [cart, setCart] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = (productId: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você tem certeza de que deseja remover este produto do carrinho?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        setCart(cart.filter(product => product.id !== productId));
        Swal.fire('Produto removido!', '', 'success');
      }
    });
  };

  const handleFinalizePurchase = async () => {
    if (cart.length > 0) {
      try {
        setLoading(true);
        const newPurchase = await api.post('/compras', { products: cart });

        await api.post('/compraproduto', {
          compraId: newPurchase.data.id,
          products: cart.map(product => product.id),
        });

        await api.post('/vendas', {
          compraId: newPurchase.data.id,
        });

        Swal.fire('Compra finalizada!', '', 'success');
        setCart([]);
      } catch (error) {
        console.error('Erro ao finalizar a compra', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao finalizar a compra.', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire('Carrinho vazio', 'Adicione produtos ao carrinho antes de finalizar a compra.', 'warning');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.valor, 0);
  };

  return (
    <div className="w-full mt-40">
      <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">Seu carrinho está vazio.</Typography>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <Typography variant="body1">{product.produtoTitle} - {formatCurrency(product.valor)}</Typography>
              </div>
              <Button
                onClick={() => handleRemoveFromCart(product.id)}
                variant="outlined"
                color="error"
                size="small"
              >
                Remover
              </Button>
            </div>
          ))}
          <Divider style={{ margin: '20px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="primary">{formatCurrency(calculateTotal())}</Typography>
          </div>
          <Button
            onClick={handleFinalizePurchase}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Finalizando...' : 'Finalizar Compra'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
