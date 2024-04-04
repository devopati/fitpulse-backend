import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import UnAuthenticatedError from "../../errors/unauthenticated.js";
import User from "../../models/User.js";

const changePassword = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      throw new BadRequestError("Both current and new passwords are required");

    if (newPassword.length < 8)
      throw new BadRequestError("New password must be atleast 8 characters");

    const user = await User.findById(user_id).select("+password");

    if (!user) throw new UnAuthenticatedError("Ensure you are logged in");

    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) throw new BadRequestError("Invalid credentials");

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Password changed successful" });
  } catch (error) {
    next(error);
  }
};

export default changePassword;
