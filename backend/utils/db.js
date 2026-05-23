//require("dotenv").config();
//const { PrismaClient } = require('../generated/prisma')
const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient({
//  datasourceUrl: process.env.DATABASE_URL,
//});

const prisma = new PrismaClient();

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("SQL database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDb };