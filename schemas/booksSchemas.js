import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required().length(17),
  isBorrowed: Joi.boolean(),
});
export const updateStatusBookSchema = Joi.object({
  isBorrowed: Joi.boolean().required(),
});
