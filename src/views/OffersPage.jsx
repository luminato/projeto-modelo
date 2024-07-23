import React, { useEffect, useState } from 'react';
import IndexNavbar from "@components/Navbars/IndexNavbar.jsx";
import Footer from "@components/Footers/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Atualize a importação para o pacote de marcas

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(10);

  useEffect(() => {
    const savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
    const reversedOffers = savedOffers.reverse();
    setOffers(reversedOffers);
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

  const addNewOffer = (newOffer) => {
    const updatedOffers = [newOffer, ...offers];
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

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
            {currentOffers.map((offer) => (
              <div key={offer.id} className="w-full md:w-1/2 lg:w-1/2 px-4 mb-4">
                <div
                  className={`bg-white rounded-lg shadow-md p-6 border border-${
                    offer.transactionType === "comprar" ? "blue" : "green"
                  }-500`}
                >
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
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(offer.rating)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className="h-4 w-4 text-yellow-500" />
                      ))}
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {offer.userName}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        {offer.quantity} milhas
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        R$ {offer.pricePerThousand.toFixed(2)} / milheiro
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <a
                      href={`https://wa.me/?text=Estou%20interessado%20na%20sua%20oferta%20de%20milhas!`}
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
            ))}
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
