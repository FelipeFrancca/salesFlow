"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import api from "../../../../services/AppRoutes";
import { Typography, Button } from "@mui/material";
import { Spinner } from "@material-tailwind/react";

const SaleView: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [sale, setSale] = useState<VendaType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await api.get(`/vendas/${id}`);
        console.log(response.data);
        setSale(response.data);
      } catch (error) {
        console.log("Erro ao carregar detalhes da venda:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSale();
  }, [id]);

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
    <div className="max-w-3xl mx-auto p-6">
      <Button onClick={() => router.back()} className="mb-4" variant="outlined">Voltar</Button>
      <Typography variant="h4" gutterBottom>Detalhes da Venda - #{sale.id}</Typography>
      <Typography variant="h6">{sale.vendaTitle}</Typography>
      <Typography variant="body1" color="textSecondary">{sale.vendaDesc || "Descrição da venda"}</Typography>

      <div className="mt-6">
        <Typography variant="h6">Compras para atender à esta venda:</Typography>
        <ul>
          {sale.compras && sale.compras.length > 0 ? (
            sale.compras.map((compra) => (
              <li key={compra.id} className="flex justify-between my-2 p-2 border rounded-md bg-gray-100">
                <span>Compra: {compra.compraTitle}</span>
                <span>R$ {compra.valor}</span>
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
  );
};

export default SaleView;
