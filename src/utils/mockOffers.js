// src/utils/mockOffers.js
export const mockOffers = [
  {
    id_offer: 1,
    transactionType: "comprar",
    mileProgram: "LATAM",
    quantity: 10000,
    pricePerThousand: 200.0,
    userName: "Usuário Teste",
    rating: 4,
  },
  // Adicione outros anúncios mockados aqui
];

export const initializeMockOffers = () => {
  if (!localStorage.getItem("offers")) {
    localStorage.setItem("offers", JSON.stringify(mockOffers));
  }
};
