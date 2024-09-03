import { httpError } from "../helpers/httpError.js";
import { Book } from "../models/Book.js";

export const getAllBooks = async (query = {}, sort = {}) => {
  const filter = query
    ? {
        $or: [
          { title: new RegExp(query, "i") },
          { author: new RegExp(query, "i") },
          { isbn: new RegExp(query, "i") },
        ],
      }
    : {};
  const sortOptions = Object.entries(sort).reduce((acc, [key, value]) => {
    if (key === "byTitle" || key === "byAuthor" || key === "byIsbn") {
      acc[key.replace("by", "").toLowerCase()] = value === "true" ? 1 : -1;
    }
    return acc;
  }, {});

  const [books, totalBooks] = await Promise.all([
    Book.find(filter, "title author isbn isBorrowed").sort(sortOptions).exec(),
    Book.countDocuments(filter),
  ]);

  return { books, totalBooks };
};

export const addBook = async (data) => {
  const newBook = await Book.create(data);

  return newBook;
};

export const updateBookByIsbn = async (filter, data) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(filter, data, {
      new: true,
    });

    return updatedBook;
  } catch (error) {
    if (error.codeName === "DuplicateKey") {
      throw httpError(
        409,
        "A book with the ISBN you have entered already exists in the database. Please check the ISBN number and try again."
      );
    }
    throw httpError(409);
  }
};

export const removeBook = async (filter) => {
  const deletedBook = await Book.findOneAndDelete(filter);

  return deletedBook;
};
