import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  database: {
    url: process.env.DATABASE_URL || "",
  },
};

if (!config.database.url) {
  throw new Error("DATABASE_URL environment variable is required");
}

