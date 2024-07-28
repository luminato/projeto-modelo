
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@supabasePath/supabaseClient';

import IndexNavbar from "@components/Navbars/IndexNavbar.jsx";
import Footer from "@components/Footers/Footer.jsx";
import AlertSuccess from "@components/Alerts/AlertSuccess.jsx";
import AlertFail from '@components/Alerts/AlertFail.jsx';

function MaskCurrency(value, minimumFractionDigits = 2) {
  const numericValue = parseFloat(value?.toString().replace(/\D/g, '') || '0');
  const result = numericValue / 10 ** minimumFractionDigits;
  return result.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
  });
}

function MaskQuantity(value) {
  const numericValue = parseInt(value?.toString().replace(/\D/g, '') || '0', 10);
  return numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    style: 'decimal',
  });
}



const AnnouncementForm = ({ onSubmit }) => {
    const [transactionType, setTransactionType] = useState("buy");
    const [mileProgram, setMileProgram] = useState("");
    const [quantity, setQuantity] = useState("");
    const [formattedQuantity, setFormattedQuantity] = useState("");
    const [pricePerThousand, setPricePerThousand] = useState("");
    
    const handleQuantityChange = (e) => {
      const inputValue = e.target.value;
      const numericValue = parseInt(inputValue.replace(/\D/g, "") || "0", 10);
      setQuantity(numericValue.toString());
      setFormattedQuantity(MaskQuantity(numericValue));
    };
  
    useEffect(() => {
      setFormattedQuantity(MaskQuantity(quantity));
    }, [quantity]);
  
    const handlePriceChange = (e) => {
      const inputValue = e.target.value;
      const formattedValue = MaskCurrency(inputValue);
      setPricePerThousand(formattedValue);
    };
  
    useEffect(() => {
      if (pricePerThousand === "" || pricePerThousand === "R$ 0,00") {
        setPricePerThousand("");
      }
    }, [pricePerThousand]);
  
    const validateForm = () => {
      let errorMessage = "";
      if (!transactionType) {
        errorMessage = "O campo Tipo de transação é obrigatório e deve ser preenchido.";
      } else if (!mileProgram) {
        errorMessage = "O campo Programa de milhas é obrigatório e deve ser preenchido.";
      } else if (!quantity) {
        errorMessage = "O campo Quantidade de milhas para negociação é obrigatório e deve ser preenchido.";
      } else if (!pricePerThousand || pricePerThousand === "R$ 0,00") {
        errorMessage = "O campo Quanto quer pagar ou Preço do milheiro é obrigatório e deve ser preenchido.";
      }
  
      if (errorMessage) {
        alert(errorMessage); // Temporário para exibição de erros
        return false;
      }
      return true;
    };
  
    const handlePublish = () => {
      if (!validateForm()) {
        return;
      }
  
      onSubmit({
        transactionType,
        mileProgram,
        pricePerThousand: parseFloat(pricePerThousand.replace(/[^\d,]/g, "").replace(",", ".")),
        quantity: parseInt(quantity, 10),
      });
    };
  
    return (
      <div className="flex flex-col space-y-6 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 mt-16">Quero</h1>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">Tipo de transação</label>
          <select
            className="p-2 border rounded-md"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="buy">Comprar</option>
            <option value="sell">Vender</option>
          </select>
        </div>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">Programa de milhas</label>
          <select
            className="p-2 border rounded-md"
            value={mileProgram}
            onChange={(e) => setMileProgram(e.target.value)}
          >
            <option value="">Escolha o Programa de milhas</option>
            <option value="LATAM">LATAM</option>
            <option value="AZUL">AZUL</option>
            <option value="AZUL INTERLINE">AZUL INTERLINE</option>
            <option value="SMILES">SMILES</option>
            <option value="TAP">TAP Miles & Go</option>
            <option value="AA">American Airlines</option>
            <option value="IB">IBERIA</option>
          </select>
        </div>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">Quantidade de milhas para negociação</label>
          <input
            type="text"
            className="p-2 border rounded-md"
            value={formattedQuantity}
            onChange={handleQuantityChange}
            placeholder="Digite o número de milhas"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">
            {transactionType === "buy" ? "Quanto quer pagar? (a cada 1000 milhas)" : "Preço do milheiro? (a cada 1000 milhas)"}
          </label>
          <input
            type="text"
            value={pricePerThousand}
            onChange={handlePriceChange}
            className="p-2 border rounded-md"
            placeholder="Digite o valor"
          />
        </div>
        <button
          className="bg-lightBlue-500 text-white font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg"
          type="button"
          onClick={handlePublish}
        >
          Publicar
        </button>
      </div>
    );
  };


  export default AnnouncementForm;