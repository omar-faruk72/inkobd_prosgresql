import type { Request, Response } from "express";
import { UserServices } from "./user.service.js";

// register api
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

// login api
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required fields!",
      });
    }
    const result = await UserServices.loginUserFromDB({ email, password });
    res.status(200).json({
      success: true,
      message: "User validated successfully for NextAuth!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed!",
    });
  }
};

export const UserControllers = {
  registerUser,
  loginUser,
};