"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import api from "../../../../services/AppRoutes";
import { Button, Typography } from "@mui/material";
import VisualizarIcon from '@mui/icons-material/Visibility';
import { Spinner } from "@material-tailwind/react";
import Slider from "@mui/material/Slider";

const SalesListCard: React.FC = () => {
  const [sales, setSales] = useState<VendaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const router = useRouter();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response: ApiResponse<VendaType[]> = await api.get("/vendas");
        setSales(response.data);
      } catch (error) {
        console.log("Erro ao carregar vendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) => {
    const matchesTextSearch = 
      sale.vendaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.vendaDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(sale.id).includes(searchTerm) ||
      String(sale.valor).includes(searchTerm);

    const matchesPriceRange = sale.valor >= priceRange[0] && sale.valor <= priceRange[1];
    const matchesCompraSearch = sale.compras?.some((compra) => {
      return (
        compra.compraTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(compra.valor).includes(searchTerm)
      );
    });

    return (matchesTextSearch || matchesCompraSearch) && matchesPriceRange;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner className="h-12 w-12" color="indigo" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-6 items-center w-full">
        <div className="flex items-center w-full mb-6">
          <input
            type="text"
            placeholder="Pesquisar por venda"
            className="p-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center w-56 mb-6">
          <p>Faixa de preço</p>
          <p>R$ {priceRange[0]} - R$ {priceRange[1]}</p>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `R$ ${value}`}
            min={0}
            max={4000}
            step={50}
          />
        </div>
      </div>
      <ul className="flex flex-wrap items-center justify-start gap-6 w-full p-6">
        {filteredSales.map((sale) => {
          const totalCompras = sale.compras
            ? sale.compras.reduce((acc, compra) => acc + Number(compra.valor || 0), 0)
            : 0;
          const lucro = Number(sale.valor || 0) - totalCompras;

          return (
            <li
              key={sale.id}
              className="bg-[#D9D9D9] p-6 rounded-[20px] w-full bg-clip-border border-0 bg-gray-400/60 backdrop-saturate-200 backdrop-blur shadow-[0_20px_27px_0_rgba(0,0,0,0.05)]"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Typography>Resumo da venda:</Typography>
                  <h3 className="text-xl font-bold">#{sale.id}</h3>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{sale.vendaTitle}</h3>
                  <span className="text-lg font-semibold">R$ {sale.valor}</span>
                </div>
              </div>

              <p className="bg-[#C0C0C0] p-3 rounded-md mb-2 text-gray-700 text-sm">
                {sale.vendaDesc || "Descrição da venda"}
              </p>

              <h4 className="text-md font-semibold mb-2">
                Compras para atender à esta venda:
              </h4>
              <ul className="space-y-2 mb-4">
                {sale.compras && sale.compras.length > 0 ? (
                  sale.compras.map((compra) => (
                    <li
                      key={compra.id}
                      className="bg-[#C0C0C0] p-3 rounded-md flex justify-between items-center text-gray-700 text-sm"
                    >
                      <span>Compra: {compra.compraTitle}</span>
                      <span>Valor: R$ {compra.valor}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma compra registrada.</p>
                )}
              </ul>
              <div className="flex flex-row items-center justify-between">
                <div className="text-lg font-semibold text-green-700">
                  Lucro: R$ {lucro}
                </div>

                <Button
                  onClick={() => router.push(`/pages/saleView/${sale.id}`)}
                  sx={{
                    backgroundColor: "#9CA3AF",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#6B7280",
                    },
                  }}
                  className="mt-4 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  variant="contained"
                >
                  <VisualizarIcon />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SalesListCard;
