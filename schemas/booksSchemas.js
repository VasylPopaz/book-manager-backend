import Joi from "joi";

import { isbnRegexp } from "../constants/index.js";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required().pattern(isbnRegexp).length(17).messages({
    "string.pattern.base": "The ISBN format is incorrect.",
    "string.length": "The ISBN must be exactly 17 characters long.",
    "string.base": "ISBN must be a string.",
    "string.empty": "ISBN is required.",
  }),
  isBorrowed: Joi.boolean(),
});
export const updateStatusBookSchema = Joi.object({
  isBorrowed: Joi.boolean().required(),
});
