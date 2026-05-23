import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";
import type { IUserRegisterInput } from "./user.interface.js";

const createUserIntoDB = async (payload: IUserRegisterInput) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isUserExist) {
    throw new Error("This email is already registered!");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: "user",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return result;
};

export const UserServices = {
  createUserIntoDB,
};