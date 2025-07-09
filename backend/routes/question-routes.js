const express = require("express");
const router = express.Router();
const  {authenticate} = require('../middleware/auth-middleware.js')
const questionController = require("../controllers/question-controller.js") 


router.post('/',authenticate,questionController.getQuestions)

module.exports = router