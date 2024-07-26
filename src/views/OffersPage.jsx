import React, { useEffect, useState } from 'react';
import IndexNavbar from "@components/Navbars/IndexNavbar.jsx";
import Footer from "@components/Footers/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import supabase from '@supabasePath/supabaseClient'; // Certifique-se de que o caminho está correto

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(10);

  useEffect(() => {
    // Função para buscar ofertas do Supabase
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false }); // Ordenar por data de criação, mais recente primeiro

      if (error) {
        console.error('Erro ao buscar ofertas:', error.message);
        return;
      }

      setOffers(data);
    };

    fetchOffers();
  }, []);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(offers.length / offersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <IndexNavbar />
      <div className="min-h-screen flex flex-col pt-20">
        <div className="flex-grow container mx-auto mt-8 mb-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Últimos Anúncios</h2>
          <div className="flex flex-wrap -mx-4">
            {currentOffers.map((offer) => {
              const whatsappURL = `https://wa.me/${offer.user_phone_number}?text=Ol%C3%A1%2C%20vi%20sua%20oferta%20de%20${offer.quantity}%20milhas%20por%20R%24%20${offer.price_per_thousand.toFixed(2)}%20na%20VUPT%21%2C%20vamos%20negociar%3F`;

              return (
                <div key={offer.id} className="w-full md:w-1/2 px-4 mb-4">
                  <div
                    className={`bg-white rounded-lg shadow-md p-6 border border-${
                      offer.transaction_type === "comprar" ? "blue" : "green"
                    }-500`}
                    style={{ minHeight: '300px' }} // Ajuste a altura mínima conforme necessário
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6"> {/* Aumenta o espaçamento entre os elementos */}
                          <div
                            className={`text-xl font-bold ${
                              offer.transaction_type === "comprar" ? "text-blue-500" : "text-green-500"
                            }`}
                          >
                            {offer.transaction_type === "comprar" ? "Compra" : "Venda"}
                          </div>
                          <div
                            className={`text-lg font-semibold ${getMileProgramColor(offer.mileage_program)} text-white px-2 py-1 rounded`}
                          >
                            {offer.mileage_program}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4"> {/* Aumenta o espaçamento entre os elementos */}
                          <div className="text-lg font-bold">
                            {offer.user_first_name} {offer.user_last_name}
                          </div>
                          <div className="flex items-center">
                            {[...Array(offer.user_rating)].map((_, index) => (
                              <FontAwesomeIcon key={index} icon={faStar} className="h-4 w-4 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4"> {/* Aumenta o espaçamento entre os elementos */}
                          <div className="text-lg font-semibold">
                            {offer.quantity} milhas
                          </div>
                          <div className="text-lg font-semibold">
                            R$ {offer.price_per_thousand.toFixed(2)} / milheiro
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-6"> {/* Aumenta o espaçamento do botão */}
                        <a
                          href={whatsappURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-green-500"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} style={{color: "#63E6BE"}} className="h-6 w-6 mr-2" />
                          <span>Whatsapp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginação */}
          <div className="py-2">
            <nav className="block">
              <ul className="flex pl-0 rounded list-none flex-wrap">
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <a
                      href="#!"
                      className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 ${currentPage === number ? 'bg-lightBlue-500 text-white' : 'bg-white text-lightBlue-500'}`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
