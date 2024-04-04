import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import User from "../../models/User.js";
import Verification from "../../models/Verification.js";

const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.params;

    const { user_id } = req.user;

    if (!code) throw new BadRequestError("No verification code provided");

    const verification = await Verification.findOne({ user_id });

    if (!verification) throw new BadRequestError("No record exists");

    const currTime = Date.now();
    if (currTime > verification.expires_at) {
      await Verification.findByIdAndDelete(verification._id);
      throw new BadRequestError("Code expired, request for another one");
    }

    if (verification.verification_code !== code)
      throw new BadRequestError("Invalid verification code");

    const user = await User.findById(user_id);

    user.verified = true;

    await user.save();

    await Verification.findByIdAndDelete(verification._id);

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

export default verifyEmail;
