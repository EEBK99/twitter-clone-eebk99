"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../helpers/verifyToken");
const tweet_1 = require("../controllers/tweet");
const router = express_1.default.Router();
// Create a Tweet
router.post("/", verifyToken_1.verifyToken, tweet_1.createTweet);
// Delete a Tweet
router.delete("/:id", verifyToken_1.verifyToken, tweet_1.deleteTweet);
// Like or Dislike a Tweet
router.put("/:id/like", tweet_1.likeOrDislike);
// Get all timeline tweets
router.get("/timeline/:id", tweet_1.getAllTweets);
// Get user Tweets only
router.get("/user/all/:id", tweet_1.getUserTweets);
// Explore Tweets
router.get("/explore", tweet_1.getExploreTweets);
exports.default = router;
