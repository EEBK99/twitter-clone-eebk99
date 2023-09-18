import { handleError } from "../helpers/error";
import User from "../models/user";

/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
export const getUser = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * update user
 * @param req
 * @param res
 * @param next
 */
export const updateUser = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError("403", "You can only update your own account"));
  }
};

/**
 * delete user
 * @param req
 * @param res
 * @param next
 */
export const deleteUser = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError("403", "You can only update your own account"));
  }
};
