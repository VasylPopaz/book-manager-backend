import Joi from "joi";

import { isbnRegexp } from "../constants/index.js";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required().pattern(isbnRegexp).length(17),
  isBorrowed: Joi.boolean(),
});
export const updateStatusBookSchema = Joi.object({
  isBorrowed: Joi.boolean().required(),
});
