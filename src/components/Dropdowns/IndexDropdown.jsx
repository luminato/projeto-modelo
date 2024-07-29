import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Não usado atualmente
import supabase from '@supabasePath/supabaseClient';
import AnnouncementForm from '@components/Forms/AnnouncementForm.jsx';
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
    setAlertMessage(""); // Limpar a mensagem de alerta antes de iniciar
    setAlertType(""); // Limpar o tipo de alerta antes de iniciar

    // Obter a sessão atual do Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Erro ao obter sessão:', sessionError.message);
      setAlertMessage("Erro ao obter dados do usuário. Tente novamente.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    const storedUser = session?.user ?? null;

    console.log('Usuário armazenado:', storedUser); // Adicionado para verificar o usuário

    if (!storedUser) { // Adicionado para verificar se o usuário está logado
      setAlertMessage("Usuário não está logado.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    // Verificar o status do usuário
    if (storedUser.user_metadata.status === 'under review') {
      setAlertMessage("Usuário em avaliação não pode criar anúncios.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    // Buscar dados do usuário no banco de dados
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_id, user_first_name, user_last_name, user_rating, user_phone_number')
      .eq('user_id', storedUser.id)
      .single();

    console.log('Dados do usuário do banco de dados:', userData); // Adicionado para verificar os dados do usuário

    if (userError || !userData) {
      setAlertMessage("Dados do usuário não encontrados.");
      setAlertType("fail");
      setShowAlert(true);
      return;
    }

    // Criar novo anúncio com dados do usuário
    const newOffer = {
      ...offer,
      user_first_name: userData.user_first_name,
      user_last_name: userData.user_last_name,
      user_id: userData.user_id,
      user_rating: userData.user_rating,
      user_phone_number: userData.user_phone_number,
      created_at: new Date().toISOString(),
    };

    // Inserir a nova oferta na tabela `offers`
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
