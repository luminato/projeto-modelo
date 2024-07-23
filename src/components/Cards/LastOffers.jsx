import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function LastOffers() {
  const [announcedOffers, setAnnouncedOffers] = useState([]);
  const [displayedOffers, setDisplayedOffers] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Carregar ofertas anunciadas do localStorage ao montar o componente
    const storedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    
    // Ordenar ofertas por data de criação (do mais recente para o mais antigo)
    const sortedOffers = storedOffers.sort((a, b) => b.id - a.id);
    
    // Limitar o número de ofertas exibidas com base na largura da tela
    const getNumberOfOffersToDisplay = () => {
      if (windowWidth < 1024) return 4; // Adiciona mais um card para telas menores que 1024px
      return 3; // Número padrão de ofertas
    };
    
    setDisplayedOffers(getNumberOfOffersToDisplay());
    
    // Atualiza o número de ofertas exibidas
    const lastOffers = sortedOffers.slice(0, displayedOffers);
    setAnnouncedOffers(lastOffers);

  }, [windowWidth, displayedOffers]);

  useEffect(() => {
    // Função para atualizar a largura da tela
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    // Adiciona o event listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Limpeza do event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMileProgramColor = (program) => {
    switch (program) {
      case 'LATAM':
        return 'bg-red-500';
      case 'AZUL':
      case 'AZUL INTERLINE':
        return 'bg-blue-500';
      case 'SMILES':
        return 'bg-orange-500';
      case 'TAP':
        return 'bg-green-500';
      case 'AA':
        return 'bg-blue-500';
      case 'IB':
        return 'bg-red-500';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Últimas Ofertas</h2>
      <div className="flex flex-wrap -mx-4">
        {announcedOffers.map((offer) => (
          <div key={offer.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div
              className={`bg-white rounded-lg shadow-md border border-${
                offer.transactionType === "comprar" ? "blue" : "green"
              }-500`}
              style={{ minHeight: '200px' }} // Definindo altura mínima fixa para os cards
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`text-xl font-bold ${
                      offer.transactionType === "comprar" ? "text-blue-500" : "text-green-500"
                    }`}
                  >
                    {offer.transactionType === "comprar" ? "Compra" : "Venda"}
                  </div>
                  <div
                    className={`text-lg font-semibold ${getMileProgramColor(offer.mileProgram)} text-white px-2 py-1 rounded`}
                  >
                    {offer.mileProgram}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="ml-2 text-sm font-semibold">
                    {offer.userName}
                  </div>
                  <div className="flex items-center">
                    {[...Array(offer.rating)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="h-4 w-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-semibold">
                      {offer.quantity} milhas
                    </div>
                    <div className="text-lg font-semibold">
                      R$ {offer.pricePerThousand.toFixed(2)} / milheiro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
