import { Request, Response } from "express";
import users_sh from "../models/users_sh";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, password, balance } = req.body;

    // Check if all required parameters are provided
    if (!name || !password) {
      return res.status(200).json({
        message: "Please provide all required parameters: name, password.",
      });
    }

    // Check if a user with the same name already exists
    const existingUser = await users_sh.findOne({ name });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User with this name already exists." });
    }

    // Create and save the new user
    const newUser = new users_sh({ name, password, balance });
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (err) {
    console.error(`Error creating user: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
      return res.status(200).json({
        message: "Please provide all required parameters: name, password.",
      });
    }

    // Find the user with the matching name and password
    const existingUser = await users_sh
      .findOne({ name, password })
      .select({ name: 1, balance: 1, purchased_vouchers: 1 });

    // If user is not found, return an error message
    if (!existingUser) {
      return res.status(200).json({ message: "Invalid username or password." });
    }

    // If user is found, return the user details
    return res.status(200).json(existingUser);
  } catch (err) {
    console.error(`Error during login: ${err}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Find the user by ID
    const user = await users_sh.findById(id);

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the found user
    return res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await users_sh.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(`Error fetching users: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateUserBalance = async (req: Request, res: Response) => {
  try {
    const { balance } = req.body;
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Validate the balance input
    if (typeof balance !== "number" || balance === 0) {
      return res
        .status(400)
        .json({ message: "Balance must be a non-zero number." });
    }

    // Update the user's balance
    const user = await users_sh.findByIdAndUpdate(
      id,
      { $inc: { balance: balance } },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (err) {
    console.error(`Error updating user balance: ${err}`);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export { createUser, login, getUserById, getAllUsers, updateUserBalance };
