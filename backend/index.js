require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb, prisma } = require("./utils/db");
const questionRoute = require('./routes/question-routes.js');
const authRoutes = require("./routes/auth-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/auth", authRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});


