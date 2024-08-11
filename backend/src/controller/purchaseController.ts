import { Request, Response } from "express";
import users_sh from "../models/users_sh";
import voucher_sh from "../models/voucher_sh";
import mongoose from "mongoose";

const purchase = async (req: Request, res: Response) => {
  try {
    const { userId, voucherId } = req.body;

    // Fetch user and voucher concurrently
    const [user, voucher] = await Promise.all([
      users_sh.findById(userId),
      voucher_sh.findById(voucherId),
    ]);

    // Check if user or voucher was not found
    if (!user || !voucher) {
      return res.status(200).json({ message: "User or Voucher not found" });
    }

    // Check if the user has enough balance
    if (user.balance < voucher.cost) {
      return res.status(200).json({ message: "Not enough balance" });
    }

    // Check if the voucher is still available
    if (voucher.amount < 1) {
      return res
        .status(200)
        .json({ message: "Voucher is no longer available" });
    }

    // Deduct cost and update voucher
    user.balance -= voucher.cost;
    user.purchased_vouchers.push(voucherId);
    voucher.amount -= 1;

    // Save user and voucher concurrently
    await Promise.all([user.save(), voucher.save()]);

    return res.status(200).json({ user, voucher });
  } catch (err) {
    console.error(`Error processing purchase: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserPurchasedVouchers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ message: "Invalid user ID" });
    }

    // Find the user and populate purchased vouchers
    const user = await users_sh.findById(id).populate("purchased_vouchers");
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Return the user data along with purchased vouchers
    return res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user vouchers: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { purchase, getUserPurchasedVouchers };
