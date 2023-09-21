"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExploreTweets = exports.getUserTweets = exports.getAllTweets = exports.likeOrDislike = exports.deleteTweet = exports.createTweet = void 0;
const error_1 = require("../helpers/error");
const tweet_1 = __importDefault(require("../models/tweet"));
const user_1 = __importDefault(require("../models/user"));
/**
 * create new tweet
 * @param req
 * @param res
 * @param next
 */
const createTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTweet = new tweet_1.default(req.body);
    try {
        const savedTweet = yield newTweet.save();
        res.status(200).json(savedTweet);
    }
    catch (err) {
        (0, error_1.handleError)("500", err);
    }
});
exports.createTweet = createTweet;
/**
 * delete tweet
 * @param req
 * @param res
 * @param next
 */
const deleteTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_1.default.findById(req.params.id);
        if ((tweet === null || tweet === void 0 ? void 0 : tweet.userId) === req.body.id) {
            yield (tweet === null || tweet === void 0 ? void 0 : tweet.deleteOne());
            res.status(200).json("Tweet has been deleted");
        }
        else {
            return next((0, error_1.handleError)("403", "You can only delete your own tweet"));
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTweet = deleteTweet;
/**
 * like or dislike tweet
 * @param req
 * @param res
 * @param next
 */
const likeOrDislike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tweet = yield tweet_1.default.findById(req.params.id);
        if (!((_a = tweet === null || tweet === void 0 ? void 0 : tweet.likes) === null || _a === void 0 ? void 0 : _a.includes(req.body.id))) {
            yield (tweet === null || tweet === void 0 ? void 0 : tweet.updateOne({
                $push: { likes: req.body.id },
            }));
            res.status(200).json("Tweet has been liked");
        }
        else {
            yield tweet.updateOne({
                $pull: { likes: req.body.id },
            });
            res.status(200).json("Tweet has been disliked");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.likeOrDislike = likeOrDislike;
/**
 * Timeline tweets
 * @param req
 * @param res
 * @param next
 */
const getAllTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findById(req.params.id);
        const userTweets = yield tweet_1.default.find({
            userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
        });
        const followersTweets = yield Promise.all(((currentUser === null || currentUser === void 0 ? void 0 : currentUser.followings) || []).map((followerId) => {
            return tweet_1.default === null || tweet_1.default === void 0 ? void 0 : tweet_1.default.find({ userId: followerId });
        }));
        res.status(200).json(userTweets.concat(...followersTweets));
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTweets = getAllTweets;
/**
 * Get user tweets only
 * @param req
 * @param res
 * @param next
 */
const getUserTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTweets = yield tweet_1.default.find({
            userId: req.params.id,
        }).sort({
            createdAt: -1,
        });
        res.status(200).json(userTweets);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserTweets = getUserTweets;
/**
 * Get explore tweets
 * @param req
 * @param res
 * @param next
 */
const getExploreTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getExploreTweets = yield tweet_1.default.find({
            likes: {
                $exists: true,
            },
        }).sort({ likes: -1 });
        res.status(200).json(getExploreTweets);
    }
    catch (err) {
        next(err);
    }
});
exports.getExploreTweets = getExploreTweets;
