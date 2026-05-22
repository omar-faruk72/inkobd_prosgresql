import app from "./app.js";
import config from "./app/config/index.js";
import prisma from "./app/utils/prisma.js";

const port = config.port;

async function main() {
  try {
    // ১. প্রিজমা দিয়ে পোস্টগ্রেস কানেক্ট
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // ৩. সার্ভার স্টার্ট
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Database connection failed");
    console.log(error);
  }
}

main();
