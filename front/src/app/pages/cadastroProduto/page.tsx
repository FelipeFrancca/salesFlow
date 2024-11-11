"use client";

import { FC, useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import api from "../../../services/AppRoutes";
import { useRouter } from "next/navigation";

// Função para formatar o valor com separador de milhar
const formatCurrency = (value: string): string => {
  const sanitizedValue = value.replace(/\D/g, "");
  const numberValue = Number(sanitizedValue);
  if (isNaN(numberValue)) return "";
  return numberValue.toLocaleString("pt-BR");
};

const CadastroProduto: FC = () => {
  const [produtoTitle, setProdutoTitle] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedValor = valor.replace(/\D/g, "");

    const valorNumber = parseFloat(sanitizedValor);
    
    // Verificação se o valor está dentro da faixa permitida
    if (!produtoTitle || !sanitizedValor || valorNumber < 0 || valorNumber > 20000) {
      setErrorMessage("Por favor, insira um valor entre R$ 0 e R$ 20.000.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/produtos", {
        produtoTitle,
        valor: valorNumber,
      });
      setSuccessMessage("Produto cadastrado com sucesso!");
      setProdutoTitle("");
      setValor("");
      setErrorMessage("");
      router.push("/pages/products");
    } catch (error) {
      setErrorMessage("Erro ao cadastrar o produto. Tente novamente.");
      console.error("Erro ao cadastrar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com mudanças no campo de valor
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, "");
    const valueNumber = Number(sanitizedValue);

    // Permitir apenas valores entre 0 e 20.000
    if (valueNumber >= 0 && valueNumber <= 20000) {
      const formattedValue = formatCurrency(inputValue);
      setValor(formattedValue);
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-40">
      <h2 className="text-xl font-semibold">Cadastrar Produto</h2>
      <h2 className="text-s font-semibold mb-4">Obs: o valor máximo de um produto é de 20.000.</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth
          value={produtoTitle}
          onChange={(e) => setProdutoTitle(e.target.value)}
          required
        />
        <TextField
          label="Valor"
          variant="outlined"
          type="text"  
          fullWidth
          value={valor}
          onChange={handleValorChange} 
          required
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CadastroProduto;
