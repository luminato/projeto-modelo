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

export default function Announce() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [transactionType, setTransactionType] = useState("buy");
  const [mileProgram, setMileProgram] = useState("");
  const [quantity, setQuantity] = useState("");
  const [formattedQuantity, setFormattedQuantity] = useState("");
  const [pricePerThousand, setPricePerThousand] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(storedUser);
  }, []);

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
      setAlertMessage(errorMessage);
      return false;
    }
    return true;
  };

  async function handlePublish() {
    if (!validateForm()) {
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    if (user && user.status === 'under review') {
      setAlertMessage("Usuário em avaliação não pode criar anúncios.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    const newOffer = {
      transaction_type: transactionType,
      mileage_program: mileProgram,
      price_per_thousand: parseFloat(pricePerThousand.replace(/[^\d,]/g, "").replace(",", ".")),
      quantity: parseInt(quantity, 10),
      user_first_name: user?.first_name || "primeiro", 
      user_last_name: user?.last_name || "ultimo",
      user_id: user?.id || 1, 
      user_rating: user?.rating || 2, 
      user_phone_number: user?.phone_number || "5581986429085", 
      created_at: new Date().toISOString(),
      user_photo_url: user?.photo_url || "", 
    };

    const { data, error } = await supabase
      .from('offers')
      .insert([newOffer]);

    if (error) {
      console.error('Erro ao publicar o anúncio:', error.message);
      setAlertMessage("Falha ao criar o anúncio. Tente novamente.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    setTransactionType("buy");
    setMileProgram("");
    setQuantity("");
    setFormattedQuantity("");
    setPricePerThousand("");

    setAlertType("success");
    setAlertMessage("Anúncio Criado! Seu anúncio foi publicado com sucesso.");
    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertType("");
  };

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

  if (!user) {
    navigate("/"); // Redireciona para a página inicial se user for null
    return null;
  }

  return (
    <>
      <IndexNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {showAlert && (alertType === "success" ? (
          <AlertSuccess onClose={handleCloseAlert}>
            <b className="capitalize">Anúncio Criado!</b> {alertMessage}
          </AlertSuccess>
        ) : (
          <AlertFail onClose={handleCloseAlert}>
            <b>Ocorreu um erro!</b> {alertMessage}
          </AlertFail>
        ))}
        <h1 className="text-4xl font-bold mb-8 mt-16">Quero</h1>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Tipo de transação</label>
          <select
            className="block w-full p-2 border rounded-md"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="buy">Comprar</option>
            <option value="sell">Vender</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Programa de milhas</label>
          <select
            className="block w-full p-2 border rounded-md"
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
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Quantidade de milhas para negociação</label>
          <input
            type="text"
            className="block w-full p-2 border rounded-md"
            value={formattedQuantity}
            onChange={handleQuantityChange}
            placeholder="Digite o número de milhas"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            {transactionType === "buy" ? "Quanto quer pagar? (a cada 1000 milhas)" : "Preço do milheiro? (a cada 1000 milhas)"}
          </label>
          <input
            type="text"
            value={pricePerThousand}
            onChange={handlePriceChange}
            className="block w-full p-2 border rounded-md"
            placeholder="Digite o valor"
          />
        </div>
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handlePublish}
        >
          Publicar
        </button>
      </div>
      <Footer />
    </>
  );
}
