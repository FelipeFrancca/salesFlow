'use client'

import React, { useState, useEffect } from 'react';
import api from '../../services/AppRoutes';
import '../../types/types'; 

const CreatePurchase: React.FC = () => {
  const [sales, setSales] = useState<VendaType[]>([]);
  const [selectedSale, setSelectedSale] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response: ApiResponse<VendaType[]> = await api.get('/vendas');
        setSales(response.data);
      } catch (error) {
        console.log('Erro ao carregar vendas:', error);
      }
    };

    fetchSales();
  }, []);

  const handleAddPurchase = async () => {
    try {
      const response: ApiResponse<any> = await api.post('/compras', {
        vendaId: selectedSale,
        quantity,
      });
      console.log('Compra criada:', response.data);
      setSelectedSale('');
      setQuantity(1);
    } catch (error) {
      console.log('Erro ao criar compra:', error);
    }
  };

  return (
    <div>
      <h2>Nova Compra</h2>
      <select
        value={selectedSale}
        onChange={(e) => setSelectedSale(e.target.value)}
      >
        <option value="">Selecione uma venda</option>
        {sales.map((sale) => (
          <option key={sale.id} value={sale.id}>
            Venda: {sale.vendaDesc} - Valor Total: R$ {sale.valor}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddPurchase}>Adicionar Compra</button>
    </div>
  );
};

export default CreatePurchase;

