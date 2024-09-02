import { model, Schema } from "mongoose";

import { isbnRegexp } from "../constants/index.js";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    author: {
      type: String,
      required: [true, "Author is required."],
    },
    isbn: {
      type: String,
      match: [isbnRegexp, "ISBN format is incorrect."],
      unique: true,
      required: [true, "isbn is required."],
    },
    isBorrowed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export const Book = model("book", bookSchema);
