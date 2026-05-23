import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export interface IAuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

const auth = () => {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized! Token is missing.",
        });
      }

      const mainToken = token.split(" ")[1];
      if (!mainToken) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format!",
        });
      }
      const secretKey = (config.nextauth_secret || "") as jwt.Secret;
      const decoded = jwt.verify(mainToken, secretKey) as any;

      req.user = {
        userId: decoded.id || decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      next(); 
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! Invalid or expired token.",
      });
    }
  };
};

export default auth;