import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import UnAuthenticatedError from "../../errors/unauthenticated.js";
import User from "../../models/User.js";

const resetPassword = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const { newPassword } = req.body;

    const user = await User.findById(user_id);

    if (!user) throw new UnAuthenticatedError("This user is not authorized");

    if (!newPassword) throw new BadRequestError("A new password is required");

    if (newPassword.length < 8)
      throw new BadRequestError("New password must be atleast 8 characters");

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    // res.status(StatusCodes.OK).json({ msg: "Password reset successful" });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
