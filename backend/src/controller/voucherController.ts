import { Request, Response } from "express";
import voucher_sh from "../models/voucher_sh";
import mongoose from "mongoose";
import { IUpdateFields } from "../../types";

const createVoucher = async (req: Request, res: Response) => {
  try {
    const { amount, cost, company } = req.body;

    // Validate input
    if (!amount || !cost || !company) {
      return res.status(400).json({
        message:
          "Please provide all required parameters: amount, cost, company.",
      });
    }

    // Check if a voucher for this company already exists
    const existingVoucher = await voucher_sh.findOne({ company });
    if (existingVoucher) {
      return res
        .status(409)
        .json({ message: "Voucher already exists for this company." });
    }

    // Create and save the new voucher
    const newVoucher = new voucher_sh({ amount, cost, company });
    await newVoucher.save();

    return res.status(201).json(newVoucher);
  } catch (err) {
    console.error(`Error creating voucher: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
const getVoucherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Voucher ID." });
    }

    // Find the voucher by ID
    const voucher = await voucher_sh.findById(id);

    // Check if voucher exists
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found." });
    }

    // Return the found voucher
    return res.status(200).json(voucher);
  } catch (err) {
    console.error(`Error fetching voucher: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await voucher_sh.find();

    // Return the list of vouchers
    return res.status(200).json(vouchers);
  } catch (err) {
    console.error(`Error fetching vouchers: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateVoucher = async (req: Request, res: Response) => {
  try {
    const { amount, cost, company } = req.body;
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "Invalid voucher ID" });
    }

    const updateFields: IUpdateFields = {};
    if (amount) updateFields.$set = { ...updateFields.$set, amount };
    if (cost) updateFields.$set = { ...updateFields.$set, cost };
    if (company) updateFields.$set = { ...updateFields.$set, company };

    // If no fields to update, return a message
    if (!Object.keys(updateFields).length) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Update the voucher
    const voucher = await voucher_sh.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    // Return the updated voucher
    return res.status(200).json(voucher);
  } catch (err) {
    console.error(`Error updating voucher: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const deleteVoucher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "Invalid Voucher ID" });
    }

    const voucher = await voucher_sh.findByIdAndDelete(id);

    // Return a success message with the deleted voucher information
    return res.status(200).json(voucher);
  } catch (err) {
    console.error(`Error deleting voucher: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export {
  createVoucher,
  getVoucherById,
  getAllVouchers,
  updateVoucher,
  deleteVoucher,
};
