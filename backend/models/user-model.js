const { prisma } = require("../utils/db");

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username }
  });
};

const findUserByEmailOrUsername = async (email, username) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserByEmailOrUsername,
  createUser
};