import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || 5000;

export default {
  node_env: process.env.NODE_ENV ?? "development",
  port,
  database_url: process.env.DATABASE_URL,
};
