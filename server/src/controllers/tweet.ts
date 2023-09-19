import { handleError } from "../helpers/error";
import Tweet from "../models/tweet";
import User from "../models/user";

/**
 * create new tweet
 * @param req
 * @param res
 * @param next
 */
export const createTweet = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  const newTweet = new Tweet(req.body);

  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError("500", err as string);
  }
};

/**
 * delete tweet
 * @param req
 * @param res
 * @param next
 */
export const deleteTweet = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (tweet?.userId === req.body.id) {
      await tweet?.deleteOne();
      res.status(200).json("Tweet has been deleted");
    } else {
      return next(handleError("403", "You can only delete your own tweet"));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * like or dislike tweet
 * @param req
 * @param res
 * @param next
 */
export const likeOrDislike = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet?.likes?.includes(req.body.id)) {
      await tweet?.updateOne({
        $push: { likes: req.body.id },
      });

      res.status(200).json("Tweet has been liked");
    } else {
      await tweet.updateOne({
        $pull: { likes: req.body.id },
      });

      res.status(200).json("Tweet has been disliked");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Timeline tweets
 * @param req
 * @param res
 * @param next
 */
export const getAllTweets = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const userTweets = await Tweet.find({
      userId: currentUser?._id,
    });

    const followersTweets = await Promise.all(
      (currentUser?.followings || []).map((followerId: any) => {
        return Tweet?.find({ userId: followerId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    next(err);
  }
};

/**
 * Get user tweets only
 * @param req
 * @param res
 * @param next
 */
export const getUserTweets = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const userTweets = await Tweet.find({
      userId: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(userTweets);
  } catch (err) {
    next(err);
  }
};

/**
 * Get explore tweets
 * @param req
 * @param res
 * @param next
 */
export const getExploreTweets = async (
  req: any,
  res: any,
  next: (arg0: unknown) => void
) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: {
        $exists: true,
      },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    next(err);
  }
};
