import jwt, { TokenExpiredError } from "jsonwebtoken";
import { notificationAccAuth } from "./handleErrors";
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notificationAccAuth("Required Login!", res);
  const access_token = token.split(" ")[1];
  jwt.verify(access_token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      const isChecked = err instanceof TokenExpiredError;
      if (!isChecked)
        return notificationAccAuth("Access Token Invalid!", res, isChecked);
      if (isChecked)
        return notificationAccAuth("Access Token expired!", res, isChecked);
    }
    req.user = user;
    next();
  });
};
export default verifyToken;
