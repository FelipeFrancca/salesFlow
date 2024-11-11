"use client";

import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import api from "../../../../services/AppRoutes";
import Swal from "sweetalert2";

const NewSale: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [vendaTitle, setVendaTitle] = useState(""); 
  const [vendaDesc, setVendaDesc] = useState(""); 
  const [valor, setValor] = useState(""); 

  const handleSave = async () => {
    const saleValue = parseFloat(valor);
    if (isNaN(saleValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Valor inválido',
        text: 'Por favor, insira um valor válido.',
      });
      return;
    }
    
    try {
      await api.post("/vendas", {
        vendaTitle,
        vendaDesc,
        valor: saleValue,
        data: new Date(), 
        compras: [], 
      });
      Swal.fire({
        icon: 'success',
        title: 'Venda cadastrada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      onClose(); 
    } catch (error) {
      console.error("Erro ao cadastrar a venda:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar a venda',
        text: 'Ocorreu um erro ao tentar cadastrar a venda. Tente novamente mais tarde.',
      });
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Cadastro de Nova Venda</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          fullWidth
          value={vendaTitle}
          onChange={(e) => setVendaTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Descrição da venda"
          fullWidth
          value={vendaDesc}
          onChange={(e) => setVendaDesc(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Valor estimado (R$)"
          fullWidth
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          margin="normal"
          type="number" 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSale;
