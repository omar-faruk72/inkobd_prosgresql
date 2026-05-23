import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";
import type { IUserLoginInput, IUserRegisterInput } from "./user.interface.js";

// resister api
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

// login api 
const loginUserFromDB = async (payload: IUserLoginInput) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (!isUserExist) {
    throw new Error("User does not exist with this email!");
  }
  const isPasswordMatched = await bcrypt.compare(payload.password, isUserExist.password);

  if (!isPasswordMatched) {
    throw new Error("Password does not match!");
  }
  const { password, ...userData } = isUserExist;
  return userData;
};

// update-user profile 
const updateProfileInDB = async (userId: string, updateData: Record<string, any>) => {
  if (updateData.password) delete updateData.password;
  if (updateData.role) delete updateData.role;
  if (updateData.age) {
    updateData.age = Number(updateData.age);
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      photoUrl: true,   
      age: true,        
      phone: true,      
      address: true,   
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
};