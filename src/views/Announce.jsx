import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@supabasePath/supabaseClient';
import AnnouncementForm from '@components/Forms/AnnouncementForm.jsx'
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handlePublish = async (offer) => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (storedUser && storedUser.status === 'under review') {
      setAlertMessage("Usuário em avaliação não pode criar anúncios.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    const newOffer = {
      ...offer,
      user_first_name: storedUser?.first_name || "primeiro",
      user_last_name: storedUser?.last_name || "ultimo",
      user_id: storedUser?.id || 1,
      user_rating: storedUser?.rating || 2,
      user_phone_number: storedUser?.phone_number || "5581986429085",
      created_at: new Date().toISOString(),
      user_photo_url: storedUser?.photo_url || "",
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

    setAlertType("success");
    setAlertMessage("Anúncio Criado! Seu anúncio foi publicado com sucesso.");
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertType("");
  };

  return (
    <>
      <IndexNavbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
          {showAlert && (alertType === "success" ? (
            <AlertSuccess onClose={handleCloseAlert}>
              <b className="capitalize">Anúncio Criado!</b> {alertMessage}
            </AlertSuccess>
          ) : (
            <AlertFail onClose={handleCloseAlert}>
              <b>Ocorreu um erro!</b> {alertMessage}
            </AlertFail>
          ))}
          <AnnouncementForm onSubmit={handlePublish} />
        </main>
        <Footer />
      </div>
    </>
  );
}
