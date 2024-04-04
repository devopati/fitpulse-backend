import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import UnAuthenticatedError from "../../errors/unauthenticated.js";
import User from "../../models/User.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new BadRequestError("Please provide all values");

    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new UnAuthenticatedError("Invalid login credentials");

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect)
      throw new UnAuthenticatedError("Invalid login credentials");

    const token = await user.createJWT();

    user.password = undefined;

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default login;
