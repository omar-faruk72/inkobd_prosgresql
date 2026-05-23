/// <reference types="node" />

import "dotenv/config";
import { defineConfig } from "prisma/config";
import fs from "fs";
import path from "path";
const prismaDir = path.resolve(process.cwd(), "prisma");
const mainSchemaPath = path.join(prismaDir, "schema.prisma");
let mainSchemaContent = fs.readFileSync(mainSchemaPath, "utf-8");
const otherFiles = fs.readdirSync(prismaDir).filter(
  (file) => file.endsWith(".prisma") && file !== "schema.prisma" && file !== "merged_schema.prisma"
);
let combinedContent = mainSchemaContent + "\n";
for (const file of otherFiles) {
  const fileContent = fs.readFileSync(path.join(prismaDir, file), "utf-8");
  combinedContent += `// --- Content from ${file} ---\n` + fileContent + "\n";
}
const mergedSchemaPath = path.join(prismaDir, "merged_schema.prisma");
fs.writeFileSync(mergedSchemaPath, combinedContent, "utf-8");
export default defineConfig({
  schema: "prisma/merged_schema.prisma", 
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});