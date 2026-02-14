const { analyzeToneWithAI, rewriteTextWithAI } = require("../utils/aiService");

const analyzeMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text required" });
    }

    const { tone, suggestion } = await analyzeToneWithAI(text);

    return res.json({ tone, suggestion });
  } catch (err) {
    return next(err);
  }
};

const rewriteMessage = async (req, res, next) => {
  try {
    const { text, style } = req.body;
    if (!text || !style) {
      return res.status(400).json({ message: "Text and style required" });
    }

    const rewritten = await rewriteTextWithAI(text, style);

    return res.json({ rewritten });
  } catch (err) {
    return next(err);
  }
};

module.exports = { analyzeMessage, rewriteMessage };
