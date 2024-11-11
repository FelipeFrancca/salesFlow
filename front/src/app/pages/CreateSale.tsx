'use client'

import React, { useState } from 'react';
import api from '../../services/AppRoutes';
import "../../types/types";

const CreateSale: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddSale = async () => {
    try {
      const response: ApiResponse<Sale> = await api.post('/vendas', {
        productName,
        quantity,
      });
      console.log('Venda criada:', response.data);
      setProductName('');
      setQuantity(1);
    } catch (error) {
      console.log('Erro ao criar venda:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar nova venda</h2>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddSale}>Adicionar Venda</button>
    </div>
  );
};

export default CreateSale;

