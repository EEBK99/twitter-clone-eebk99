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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../helpers/error");
/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = new user_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT || "");
        const _a = newUser.toJSON(), { password } = _a, otherData = __rest(_a, ["password"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(otherData);
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
/**
 * signin user
 * @param req
 * @param res
 * @param next
 */
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ username: req.body.username });
        if (!user)
            return next((0, error_1.handleError)("404", "User not found"));
        const isMatch = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isMatch)
            return next((0, error_1.handleError)("400", "Wrong Password"));
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT || "");
        const _b = user.toJSON(), { password } = _b, othersData = __rest(_b, ["password"]);
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(othersData);
    }
    catch (err) {
        next(err);
    }
});
exports.signin = signin;
