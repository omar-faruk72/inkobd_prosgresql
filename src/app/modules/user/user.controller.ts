import type { Request, Response } from "express";
import { UserServices } from "./user.service.js";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required fields!",
      });
    }
    const result = await UserServices.createUserIntoDB({ name, email, password });
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed!",
    });
  }
};

export const UserControllers = {
  registerUser,
};