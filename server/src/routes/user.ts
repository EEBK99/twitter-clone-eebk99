import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
} from "../controllers/user";
import { verifyToken } from "../helpers/verifyToken";

const router = express.Router();

// Get user
router.get("/find/:id", getUser);

// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

// Follow
router.put("/follow/:id", verifyToken, followUser);

// Un-Follow
router.put("/unfollow/:id", verifyToken, unFollowUser);

export default router;
