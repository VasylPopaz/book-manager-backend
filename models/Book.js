import { model, Schema } from "mongoose";

import { isbnRegexp } from "../constants/index.js";

const isbnValidator = {
  validator: function (value) {
    if (value.length !== 17) {
      return false;
    }

    return isbnRegexp.test(value);
  },
  message: function (props) {
    if (props.value.length !== 17) {
      return "The ISBN must be exactly 17 characters long.";
    }
    if (!isbnRegexp.test(props.value)) {
      return "The ISBN format is incorrect.";
    }
    return "Invalid ISBN.";
  },
};

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
      validate: isbnValidator,
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
