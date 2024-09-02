import { isbnRegexp } from "../constants/isbnRegexp.js";
import { httpError } from "../helpers/index.js";

export const isValidIsbn = (req, res, next) => {
  const { isbn } = req.params;
  if (!isbnRegexp.test(isbn)) {
    return next(httpError(400, `${isbn} is not a valid ISBN`));
  }

  next();
};
