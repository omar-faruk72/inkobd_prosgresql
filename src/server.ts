import app from "./app.js";
import config from "./app/config/index.js";
import prisma from "./app/utils/prisma.js";

const port = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    const shutdown = async () => {
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
