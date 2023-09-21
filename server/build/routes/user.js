"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const verifyToken_1 = require("../helpers/verifyToken");
const router = express_1.default.Router();
// Get user
router.get("/find/:id", user_1.getUser);
// Update user
router.put("/:id", verifyToken_1.verifyToken, user_1.updateUser);
// Delete user
router.delete("/:id", verifyToken_1.verifyToken, user_1.deleteUser);
// Follow
router.put("/follow/:id", verifyToken_1.verifyToken, user_1.followUser);
// Un-Follow
router.put("/unfollow/:id", verifyToken_1.verifyToken, user_1.unFollowUser);
exports.default = router;
