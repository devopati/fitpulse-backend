import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import User from "../../models/User.js";

const register = async (req, res, next) => {
  const { email, password, full_name } = req.body;

  try {
    if (!email || !password || !full_name)
      throw new BadRequestError("Please provide all values");

    const userExists = await User.findOne({ email });

    if (userExists) throw new BadRequestError("Email already in use");

    const user = await User.create(req.body);

    const token = await user.createJWT();

    user.password = undefined;

    res.status(StatusCodes.CREATED).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export default register;
