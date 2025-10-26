/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
  "PORT",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRES_IN",
  "REFRESH_TOKEN_EXPIRES_DAYS"
];

requiredEnvVars.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Environment variable not found: ${key}`);
  }
});

export const config = {
  app: {
    port: parseInt(process.env.PORT, 10)
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10)
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshExpiresDays: parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS, 10)
  }
};
