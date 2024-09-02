import { addBook, getAllBooks } from "../services/index.js";
import { ctrlWrapper, httpError } from "../helpers/index.js";

export const getBooks = async (req, res) => {
  const sort = Object.keys(req.query)
    .filter(
      (key) => key === "byTitle" || key === "byAuthor" || key === "byIsbn"
    )
    .reduce((obj, key) => {
      obj[key] = req.query[key];
      return obj;
    }, {});

  const filter = Object.keys(req.query)
    .filter((key) => !["byTitle", "byAuthor", "byIsbn"].includes(key))
    .reduce((obj, key) => {
      obj[key] = req.query[key];
      return obj;
    }, {});

  const result = await getAllBooks(filter, sort);

  res.json(result);
};

const createBook = async (req, res) => {
  const { isbn } = req.body;

  const { books } = await getAllBooks({ isbn });

  if (books.length) {
    throw httpError(
      409,
      "A book with the ISBN you have entered already exists in the database. Please check the ISBN number and try again."
    );
  }

  const result = await addBook(req.body);

  res.status(201).json(result);
};

export default {
  getBooks: ctrlWrapper(getBooks),
  createBook: ctrlWrapper(createBook),
};
