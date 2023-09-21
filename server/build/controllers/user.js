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
exports.unFollowUser = exports.followUser = exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const error_1 = require("../helpers/error");
const user_1 = __importDefault(require("../models/user"));
const tweet_1 = __importDefault(require("../models/tweet"));
/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
/**
 * update user
 * @param req
 * @param res
 * @param next
 */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = yield user_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true,
            });
            res.status(200).json(updatedUser);
        }
        catch (err) {
            next(err);
        }
    }
    else {
        return next((0, error_1.handleError)("403", "You can only update your own account"));
    }
});
exports.updateUser = updateUser;
/**
 * delete user
 * @param req
 * @param res
 * @param next
 */
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            yield user_1.default.findByIdAndDelete(req.params.id);
            yield tweet_1.default.deleteMany({
                userId: req.params.id,
            });
            res.status(200).json("User deleted");
        }
        catch (err) {
            next(err);
        }
    }
    else {
        return next((0, error_1.handleError)("403", "You can only delete your own account"));
    }
});
exports.deleteUser = deleteUser;
/**
 * follow user
 * @param req
 * @param res
 * @param next
 */
const followUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // user
        const user = yield user_1.default.findById(req.params.id);
        // current user
        const currentUser = yield user_1.default.findById(req.body.id);
        if (!(user === null || user === void 0 ? void 0 : user.followers.includes(req.body.id))) {
            yield (user === null || user === void 0 ? void 0 : user.updateOne({
                $push: { followers: req.body.id },
            }));
            yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({
                $push: { followings: req.params.id },
            }));
        }
        else {
            res.status(403).json("You already follow this user");
        }
        res.status(200).json("Following this user");
    }
    catch (err) {
        next(err);
    }
});
exports.followUser = followUser;
/**
 * un-follow user
 * @param req
 * @param res
 * @param next
 */
const unFollowUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // user
        const user = yield user_1.default.findById(req.params.id);
        // current user
        const currentUser = yield user_1.default.findById(req.body.id);
        if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.followings.includes(req.params.id)) {
            yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({
                $pull: { followings: req.params.id },
            }));
            yield (user === null || user === void 0 ? void 0 : user.updateOne({
                $pull: { followers: req.body.id },
            }));
        }
        else {
            res.status(403).json("You are not following this user");
        }
        res.status(200).json("Unfollow this user");
    }
    catch (err) {
        next(err);
    }
});
exports.unFollowUser = unFollowUser;
