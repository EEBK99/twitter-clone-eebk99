import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user";
import { verifyToken } from "../helpers/verifyToken";

const router = express.Router();

// Get user
router.get("/find/:id", getUser);

// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

export default router;
