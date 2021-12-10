import { rest } from "msw";
import { quizMock, usersMock } from "./data";

export const handlers = [
  rest.get("https://opentdb.com/api.php", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizMock));
  }),
  rest.get("http://localhost/DB_URL/users.json", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersMock));
  }),
  rest.put("/users/userId", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizMock));
  }),
  rest.get("/users/userId", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizMock));
  }),
];
