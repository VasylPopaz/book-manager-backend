import { isValidObjectId } from "mongoose";

import { httpError } from "../helpers/index.js";

export const isValidId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not valid id`));
  }
  next();
};
