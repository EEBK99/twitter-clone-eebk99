import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../helpers/error";

/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
export const signup = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT || "");

    const { password, ...otherData } = newUser.toJSON();

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  } catch (err) {
    next(err);
  }
};

/**
 * signin user
 * @param req
 * @param res
 * @param next
 */
export const signin = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError("404", "User not found"));

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return next(handleError("400", "Wrong Password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT || "");

    const { password, ...othersData } = user.toJSON();

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
};
