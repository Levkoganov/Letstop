import { Router } from "express";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
} from "../controller/voucherController";

const router = Router();

router.post("/", createVoucher);
router.get("/:id", getVoucherById);
router.get("/", getAllVouchers);
router.put("/:id", updateVoucher);
router.delete("/:id", deleteVoucher);

export default router;
