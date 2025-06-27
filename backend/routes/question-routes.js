const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question-controller.js") 
router.post('/', questionController.getQuestions)

module.exports = router