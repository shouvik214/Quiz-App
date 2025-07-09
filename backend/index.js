require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require("./utils/db.js");
const questionRoute = require('./routes/question-routes.js');
const authRoutes = require("./routes/auth-routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json

app.use("/api/v1/questions", questionRoute)
app.use("/api/v1/auth", authRoutes)

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
})
})


