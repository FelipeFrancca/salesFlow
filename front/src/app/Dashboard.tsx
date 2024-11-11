"use client";

import React from "react";
import { IconButton, Toolbar, Tooltip, Typography, Zoom } from "@mui/material";
import Image from "next/image";
import VendasIcon from '@mui/icons-material/PointOfSale';
import ProdutosIcon from '@mui/icons-material/Inventory';
import CarrinhoIcon from '@mui/icons-material/ShoppingCart';
import Logo from "./assets/img/salesflow.png";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="w-3/5 h-14 flex justify-center fixed left-1/2 transform -translate-x-1/2 top-12 transition-shadow duration-300 ease-in-out bg-clip-border border-0 rounded-lg bg-gray-400/60 backdrop-saturate-200 backdrop-blur shadow-[0_20px_27px_0_rgba(0,0,0,0.05)]">
        <Toolbar disableGutters className="w-full flex justify-center">
          <div className="flex flex-wrap items-center justify-between w-full max-w-3xl px-8">
            <Tooltip
              title="Ver vendas cadastradas"
              placement="bottom"
              TransitionComponent={Zoom}
            >
              <IconButton href="/" className="rounded-full">
                <Typography variant="h6" className="font-bold text-black flex items-center gap-1">
                  <VendasIcon /> Vendas
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Voltar para o início"
              placement="bottom"
              TransitionComponent={Zoom}
            >
              <div className="relative flex justify-center items-center w-24 h-24 bg-white rounded-full shadow-md">
                <IconButton href="/" className="p-0">
                  <Image src={Logo} alt="Logo" width={80} height={80} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip
              title="Ver produtos cadastrados"
              placement="bottom"
              TransitionComponent={Zoom}
            >
              <IconButton href="/pages/products" className="rounded-full">
                <Typography variant="h6" className="font-bold text-black flex items-center gap-1">
                  <ProdutosIcon /> Produtos
                </Typography>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
            <Tooltip
              title="Carrinho de compras"
              placement="bottom"
              TransitionComponent={Zoom}
              className="m-2"
            >
              <IconButton href="/pages/car" className="rounded-full">
                <Typography variant="h6" className="font-bold text-black">
                  <CarrinhoIcon />
                </Typography>
              </IconButton>
            </Tooltip>
      </div>
    </div>
  );
};

export default Dashboard;
