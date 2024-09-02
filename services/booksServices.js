import { Book } from "../models/Book.js";

export const getAllBooks = async (filter = {}, sort = null) => {
  let sortOptions = {};

  if (sort) {
    if (sort.byTitle) {
      sortOptions.title = sort.byTitle === "true" ? 1 : -1;
    }
    if (sort.byAuthor) {
      sortOptions.author = sort.byAuthor === "true" ? 1 : -1;
    }
    if (sort.byIsbn) {
      sortOptions.isbn = sort.byIsbn === "true" ? 1 : -1;
    }
  }

  const books = await Book.find(filter, "title author isbn isBorrowed")
    .sort(sortOptions)
    .exec();

  const totalBooks = await Book.countDocuments();

  return { books, totalBooks };
};
