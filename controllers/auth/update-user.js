import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request.js";
import User from "../../models/User.js";

const updateUserDetails = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    if (Object.keys(req.body).length === 0)
      throw new BadRequestError("Nothing to update here");

    const user = await User.findById(user_id);

    if (!user) throw new BadRequestError("Ensure you are loggen in");

    // user.address = req.body.address;
    // user.full_name = req.body.full_name;
    user.phone_number = req.body.phone_number;

    const token = await user.createJWT();

    await user.save();

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default updateUserDetails;
