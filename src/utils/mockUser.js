export const mockUser = {
  username: "Usuário Teste",
  name: 'Usuário',
  lastname: 'Teste',
  id_user: 1,
  status: "active", // Pode ser 'under review' para testar o caso de usuário em avaliação
};

export const initializeMockUser = () => {
  if (!localStorage.getItem("loggedInUser")) {
    localStorage.setItem("loggedInUser", JSON.stringify(mockUser));
  }
};
