const generateQuestions = require('../utils/aiService.js');

const getQuestions = async (req, res) => {
  const { topic,count,level } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }
  if (!count) {
    return res.status(400).json({ error: "Count is required" });
  }
  if (!level) {
    return res.status(400).json({ error: "level is required" });
  }

  try {
    const questions = await generateQuestions(topic,count,level);
    res.json({ questions });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error generating questions" });
  }
};

module.exports = {getQuestions}