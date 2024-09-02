import { getAllBooks } from "../services/index.js";
import { ctrlWrapper } from "../helpers/index.js";

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

export default {
  getBooks: ctrlWrapper(getBooks),
};
