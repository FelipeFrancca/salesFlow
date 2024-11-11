"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import api from "../../../../services/AppRoutes";
import { Typography, Button, TextField} from "@mui/material";
import { Spinner } from "@material-tailwind/react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const SaleView: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [sale, setSale] = useState<VendaType | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCompra, setExpandedCompra] = useState<number | null>(null);
  const [compraProdutos, setCompraProdutos] = useState<Record<number, CompraProdutoType[]>>({});
  const [isEditing, setIsEditing] = useState(false); 
  const [editedSale, setEditedSale] = useState<VendaType | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await api.get(`/vendas/${id}`);
        setSale(response.data);
        setEditedSale(response.data); 
      } catch (error) {
        console.log("Erro ao carregar detalhes da venda:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchSale();
  }, [id]);  

  const fetchCompraProdutos = async (compraId: number) => {
    try {
      const response = await api.get(`/compraproduto/${compraId}`);
      setCompraProdutos((prev) => ({ ...prev, [compraId]: response.data }));
    } catch (error) {
      console.log(`Erro ao carregar produtos para a compra ${compraId}:`, error);
    }
  };

  const handleToggleExpand = (compraId: number) => {
    if (expandedCompra === compraId) {
      setExpandedCompra(null);
    } else {
      setExpandedCompra(compraId);
      if (!compraProdutos[compraId]) {
        fetchCompraProdutos(compraId);
      }
    }
  };

  const handleRemoveProduct = async (compraId: number, compraProdutoId: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você tem certeza de que deseja remover este produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/compraproduto/${compraProdutoId}`);
          console.log('Produto removido:', response);
          setCompraProdutos((prev) => {
            const updatedCompraProdutos = { ...prev };
            updatedCompraProdutos[compraId] = updatedCompraProdutos[compraId].filter(produto => produto.id !== compraProdutoId);
            return updatedCompraProdutos;
          });
          Swal.fire('Produto removido!', '', 'success');
        } catch (error) {
          console.log('Erro ao remover produto da compra:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao remover o produto.', 'error');
        }
      }
    });
  };

  const handleRemoveCompra = async (compraId: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você tem certeza de que deseja remover esta compra? (Todos os produtos relacionados também serão removidos)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/compras/${compraId}`);
          console.log('Compra removida:', response);
          setSale((prevSale) => (prevSale ? { ...prevSale, compras: prevSale.compras.filter(compra => compra.id !== compraId) } : null));
          Swal.fire('Compra removida!', '', 'success');
        } catch (error) {
          console.log('Erro ao remover compra:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao remover a compra.', 'error');
        }
      }
    });
  };

  const handleRemoveSale = async () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você tem certeza de que deseja remover esta venda? (Todos as compras e produtos relacionados também serão removidos)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed && sale) {
        try {
          const removeProdutosPromises = sale.compras?.map((compra) => {
            return api.delete(`/compraproduto/${compra.id}`);
          });
          await Promise.all(removeProdutosPromises);
          const removeComprasPromises = sale.compras?.map((compra) => {
            return api.delete(`/compras/${compra.id}`);
          });
          await Promise.all(removeComprasPromises);
          const response = await api.delete(`/vendas/${id}`);
          console.log('Venda removida:', response);

          router.push('/vendas');
          Swal.fire('Venda removida!', '', 'success');
        } catch (error) {
          console.log('Erro ao remover a venda e suas compras:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao remover a venda.', 'error');
        }
      }
    });
  };

  const handleSaveEdit = async () => {
    if (editedSale !== null) {
      try {
        const response = await api.put(`/vendas/${id}`, editedSale);
        setSale(response.data);
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          title: 'Venda atualizada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.log('Erro ao atualizar a venda:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar a venda',
          text: 'Ocorreu um erro ao tentar atualizar a venda. Tente novamente mais tarde.',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner className="h-12 w-12" color="indigo" />
      </div>
    );
  }

  if (!sale) return <p>Venda não encontrada.</p>;

  const totalCompras = sale.compras?.reduce((acc, compra) => acc + Number(compra.valor || 0), 0) || 0;
  const lucro = Number(sale.valor || 0) - totalCompras;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-40">
      <Button
        onClick={() => router.back()}
        sx={{
          backgroundColor: "#9CA3AF",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#6B7280",
          },
        }}
        className="w-15 h-10 rounded-full flex items-center justify-center mb-4"
        variant="contained"
      >
        Voltar
      </Button>
      <Typography variant="h4" gutterBottom>Detalhes da Venda - #{sale.id}</Typography>

      {isEditing ? (
        <div>
          <TextField
            label="Título da venda"
            fullWidth
            value={editedSale?.vendaTitle || ''}
            onChange={(e) => setEditedSale({ ...editedSale, vendaTitle: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Descrição da venda"
            fullWidth
            value={editedSale?.vendaDesc || ''}
            onChange={(e) => setEditedSale({ ...editedSale, vendaDesc: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Valor estimado (R$)"
            fullWidth
            value={editedSale?.valor || ''}
            onChange={(e) => setEditedSale({ ...editedSale, valor: e.target.value })}
            margin="normal"
            type="number"
          />
          <Button onClick={handleSaveEdit} color="primary" variant="contained" sx={{ marginTop: 2 }}>
            Salvar Alterações
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6">{sale.vendaTitle}</Typography>
          <Typography variant="body1" color="textSecondary">{sale.vendaDesc || "Descrição da venda"}</Typography>
          <div className="mt-6">
        <Typography variant="h6">Compras para atender à esta venda:</Typography>
        <ul>
          {sale.compras && sale.compras.length > 0 ? (
            sale.compras.map((compra) => (
              <li key={compra.id} className="my-2 p-2 border rounded-md bg-gray-100">
                <div
                  onClick={() => handleToggleExpand(compra.id)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>Compra: {compra.compraTitle}</span>
                  <span>R$ {compra.valor}</span>
                  <DeleteIcon
                    onClick={() => handleRemoveCompra(compra.id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
                {expandedCompra === compra.id && compraProdutos[compra.id] && (
                  <div className="mt-2 ml-4 bg-white p-2 rounded-md border">
                    {compraProdutos[compra.id].length > 0 ? (
                      <ul>
                        {compraProdutos[compra.id].map((compraProduto) => (
                          <li key={compraProduto.id} className="flex justify-between my-1">
                            <span>{compraProduto.produto.produtoTitle}</span>
                            <span>Qt: {compraProduto.quantidade}</span>
                            <span>R$ {compraProduto.produto.valor}</span>
                            <DeleteIcon
                              onClick={() => handleRemoveProduct(compra.id, compraProduto.id)}
                              className="cursor-pointer text-red-500"
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Nenhum produto encontrado.</p>
                    )}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma compra registrada.</p>
          )}
        </ul>
      </div>
          <div className="mt-4 text-lg font-bold">Valor Total: R$ {sale.valor}</div>
          <div className="mt-2 text-lg text-green-700 font-semibold">Lucro: R$ {lucro}</div>
        </div>
      )}

      <div className="flex gap-4 mt-4">
      <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" startIcon={<EditIcon />}>
      </Button>
        <Button
          onClick={handleRemoveSale}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
        </Button>
      </div>
    </div>
  );
};

export default SaleView;
