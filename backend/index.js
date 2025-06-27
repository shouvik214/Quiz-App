const express = require('express');
const cors = require('cors');
const questionRoute = require('./routes/question-routes.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json

app.use("/api/v1/questions", questionRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
