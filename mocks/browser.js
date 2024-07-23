import { setupWorker, rest } from "msw";
import { faker } from "@faker-js/faker";

// Defina seus handlers de mock
const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    const users = Array.from({ length: 1 }, () => ({
      user_id: faker.finance.pin({length: 3}),
      username: faker.person.username(),
      name: faker.person.firstNamename(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      rating: faker.string.numeric({ length: 1, exclude: ['6','7','8','9'] }),
      status: "Active",
    }));

    return res(ctx.status(200), ctx.json(users));
  }),

  // Adicione outros handlers conforme necessário
];

// Configure o MSW
export const worker = setupWorker(...handlers);
