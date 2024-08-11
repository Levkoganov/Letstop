import { Router } from "express";
import {
  purchase,
  getUserPurchasedVouchers,
} from "../controller/purchaseController";

const router = Router();

router.post("/", purchase);
router.get("/users/:id/vouchers", getUserPurchasedVouchers);

export default router;
