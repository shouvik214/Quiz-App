const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt-middleware.js")
const questionController = require("../controllers/question-controller.js") 


router.post('/', jwtMiddleware,questionController.getQuestions)

module.exports = router