const positiveWords = ["appreciate", "thank", "glad", "happy", "love", "support", "proud", "amazing", "wonderful", "excellent", "great", "fantastic"];
const negativeWords = ["hate", "angry", "upset", "stressed", "sad", "annoyed", "ignored", "hurt", "disappointed", "terrible", "awful", "disgusted"];

const analyzeTone = (text) => {
  const lower = text.toLowerCase();
  let score = 0;

  positiveWords.forEach((word) => {
    if (lower.includes(word)) score += 2;
  });
  negativeWords.forEach((word) => {
    if (lower.includes(word)) score -= 2;
  });

  if (score > 1) return "positive";
  if (score < -1) return "negative";
  return "neutral";
};

const suggestEmpathy = (text) => {
  return `I hear you. ${text} If you want, I can help brainstorm next steps.`;
};

module.exports = { analyzeTone, suggestEmpathy };
