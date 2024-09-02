import { Book } from "../models/Book.js";

export const getAllBooks = async (filter = {}, sort = {}) => {
  const sortOptions = Object.entries(sort).reduce((acc, [key, value]) => {
    if (key === "byTitle" || key === "byAuthor" || key === "byIsbn") {
      acc[key.replace("by", "").toLowerCase()] = value === "true" ? 1 : -1;
    }
    return acc;
  }, {});

  Object.keys(filter).forEach((key) => {
    if (["title", "author"].includes(key)) {
      filter[key] = new RegExp(filter[key], "i");
    }
  });

  const [books, totalBooks] = await Promise.all([
    Book.find(filter, "title author isbn isBorrowed").sort(sortOptions).exec(),
    Book.countDocuments(filter),
  ]);

  return { books, totalBooks };
};
