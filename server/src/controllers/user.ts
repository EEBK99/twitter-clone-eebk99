import { handleError } from "../helpers/error";
import User from "../models/user";
import Tweet from "../models/tweet";

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
      await Tweet.deleteMany({
        userId: req.params.id,
      });

      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError("403", "You can only delete your own account"));
  }
};

/**
 * follow user
 * @param req
 * @param res
 * @param next
 */
export const followUser = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    // user
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);

    if (!user?.followers.includes(req.body.id)) {
      await user?.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser?.updateOne({
        $push: { followings: req.params.id },
      });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("Following this user");
  } catch (err) {
    next(err);
  }
};

/**
 * un-follow user
 * @param req
 * @param res
 * @param next
 */
export const unFollowUser = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    // user
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser?.followings.includes(req.params.id)) {
      await currentUser?.updateOne({
        $pull: { followings: req.params.id },
      });

      await user?.updateOne({
        $pull: { followers: req.body.id },
      });
    } else {
      res.status(403).json("You are not following this user");
    }
    res.status(200).json("Unfollow this user");
  } catch (err) {
    next(err);
  }
};
