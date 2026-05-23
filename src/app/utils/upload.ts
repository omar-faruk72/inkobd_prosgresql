import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ক্লাউডিনারি কনফিগ
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// মুল্টার মেমোরি স্টোরেজ (ফাইলটি ডিস্কে সেভ না করে সরাসরি র‍্যামে থাকবে)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ক্লাউডিনারিতে ইমেজ আপলোড করার হেল্পার ফাংশন
export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "inkobd_profiles" }, // ক্লাউডিনারিতে ফোল্ডারের নাম
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );
    uploadStream.end(fileBuffer);
  });
};