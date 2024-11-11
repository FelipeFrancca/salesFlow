import { Button, Typography } from '@mui/material';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography className="textNotfound">Oops, página não encontrada 🤔</Typography>
      <Typography className="textNotfound">Algo não esta certo. Seu link deve esta faltando informações ou não existe neste site.</Typography>
      <Button
      sx={{
        backgroundColor: "#9CA3AF",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#6B7280",
        },
      }}
      className="mt-4 rounded-full flex items-center justify-center"
      variant="contained"
      href="/"> Voltar para uma página segura
      </Button>
    </div>
  );
}
