"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import api from "../../../../services/AppRoutes";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import VisualizarIcon from '@mui/icons-material/Visibility';
import Slider from "@mui/material/Slider";

const SalesListTable: React.FC = () => {
  const [sales, setSales] = useState<VendaType[]>([]);
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

  return (
    <TableContainer component={Paper} className="p-6">
      <div className="flex gap-6 items-center w-full mb-6">
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
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Titulo</TableCell>
            <TableCell align="left">Data de Criação</TableCell>
            <TableCell align="left">Descrição da venda</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">Lucro</TableCell>
            <TableCell align="left">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSales.map((sale) => {
            const totalCompras = sale.compras
              ? sale.compras.reduce((acc, compra) => acc + Number(compra.valor || 0), 0)
              : 0;
            const lucro = Number(sale.valor || 0) - totalCompras;

            return (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.vendaTitle}</TableCell>
                <TableCell>{"11/03/2023 09:06:45"}</TableCell>
                <TableCell>{sale.vendaDesc || "Atividade não especificada"}</TableCell>
                <TableCell>{`R$ ${sale.valor}`}</TableCell>
                <TableCell>{`R$ ${lucro}`}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => router.push(`/pages/saleView/${sale.id}`)}
                    sx={{
                      backgroundColor: "#9CA3AF",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#6B7280",
                      },
                    }}
                    variant="contained"
                    size="small"
                  >
                    <VisualizarIcon />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesListTable;
