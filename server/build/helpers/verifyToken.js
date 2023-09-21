"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next((0, error_1.handleError)("401", "You are not authenticated"));
    jsonwebtoken_1.default.verify(token, process.env.JWT || "", (err, user) => {
        if (err)
            return next((0, error_1.handleError)("403", "Token is invalid"));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
