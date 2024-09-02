import express from "express";

import booksControllers from "../controllers/booksControllers.js";
import { isValidIsbn, validateBody } from "../middlewares/index.js";
import {
  createBookSchema,
  updateStatusBookSchema,
} from "../schemas/booksSchemas.js";

export const booksRouter = express.Router();

booksRouter.get("/", booksControllers.getBooks);
booksRouter.post(
  "/",
  validateBody(createBookSchema),
  booksControllers.createBook
);
booksRouter.put(
  "/:isbn",
  isValidIsbn,
  validateBody(createBookSchema),
  booksControllers.updateBook
);
booksRouter.patch(
  "/:isbn",
  isValidIsbn,
  validateBody(updateStatusBookSchema),
  booksControllers.updateBook
);
booksRouter.delete("/:isbn", isValidIsbn, booksControllers.deleteBook);
