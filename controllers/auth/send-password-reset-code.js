import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import User from "../../models/User.js";

const sendPasswordResetCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new BadRequestError("An email address is required");

    const user = await User.findOne({ email });

    if (!user) throw new BadRequestError("Invalid email address");

    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

export default sendPasswordResetCode;
