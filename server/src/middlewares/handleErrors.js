import httpError from "http-errors";

export const badRequest = (err, res) => {
  const error = httpError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

export const internalError = (res) => {
  const error = httpError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

export const notFound = (req, res) => {
  const error = httpError.NotFound("Not found 404!");
  return res.status(error.status).json({
    err: 1,
    msg: error.message,
  });
};

export const notificationAccAuth = (err, res, isExpired) => {
  const error = httpError.Unauthorized(err);
  return res.status(error.status).json({
    err: isExpired ? 2 : 1,
    msg: error.message,
  });
};
