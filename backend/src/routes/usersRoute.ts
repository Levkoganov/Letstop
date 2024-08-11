import { Router } from "express";
import {
  createUser,
  login,
  getAllUsers,
  getUserById,
  updateUserBalance,
} from "../controller/usersContoller";

const router = Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.put("/:id/balance", updateUserBalance);

export default router;
