import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined")
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "Invalid request details" });

  const bearer = bearerHeader.split(" ");

  const bearerToken = bearer[1];

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
    if (err)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Invalid request details" });

    req.user = authData;

    next();
  });
};

export default verifyToken;
