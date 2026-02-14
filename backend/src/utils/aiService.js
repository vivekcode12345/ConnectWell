const Groq = require("groq-sdk");
const { analyzeTone, suggestEmpathy } = require("./aiMock");

const apiKey = process.env.GROQ_API_KEY;
const model = "llama-3.3-70b-versatile"; // Latest Groq model (Feb 2024+)

if (!apiKey) {
  console.warn(
    "[AI] Groq API key not found. Using mock analyzer. Add GROQ_API_KEY to .env to enable real AI."
  );
} else {
  console.log("[AI] Groq API connected successfully! 🚀");
}

const allowedTones = new Set(["positive", "negative", "neutral"]);

const parseToneResponse = (content) => {
  try {
    const parsed = JSON.parse(content);
    const tone = String(parsed.tone || "").toLowerCase();
    const suggestion = String(parsed.suggestion || "").trim();
    if (!allowedTones.has(tone) || !suggestion) {
      return null;
    }
    return { tone, suggestion };
  } catch (err) {
    return null;
  }
};

const analyzeToneWithAI = async (text) => {
  if (!apiKey) {
    return { tone: analyzeTone(text), suggestion: suggestEmpathy(text) };
  }

  const client = new Groq({ apiKey });

  try {
    const response = await client.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a tone analyzer for mental health communication. Analyze the user's message and return ONLY a JSON object with: {\"tone\": \"positive|negative|neutral\", \"suggestion\": \"an empathetic rewrite of the message\"}. Be supportive and compassionate.",
        },
        { role: "user", content: text },
      ],
    });

    const content = response.choices?.[0]?.message?.content || "";
    const parsed = parseToneResponse(content);
    if (parsed) {
      return parsed;
    }

    return { tone: analyzeTone(text), suggestion: suggestEmpathy(text) };
  } catch (err) {
    console.error("[AI] Groq error:", err.message);
    return { tone: analyzeTone(text), suggestion: suggestEmpathy(text) };
  }
};

const rewriteTextWithAI = async (text, style) => {
  if (!apiKey) {
    return suggestEmpathy(text); // Fallback to mock
  }

  const client = new Groq({ apiKey });

  const stylePrompts = {
    professional: "Rewrite this message in a professional, formal tone suitable for workplace communication. Keep it respectful and clear.",
    friendly: "Rewrite this message in a warm, friendly, and casual tone. Make it feel more approachable and personable.",
    empathetic: "Rewrite this message with empathy and compassion. Show understanding and emotional support.",
    direct: "Rewrite this message to be concise and direct. Get straight to the point while remaining polite.",
    apologetic: "Rewrite this message with an apologetic tone, acknowledging any issues and showing willingness to make things right."
  };

  const prompt = stylePrompts[style] || stylePrompts.empathetic;

  try {
    const response = await client.chat.completions.create({
      model,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a communication assistant. ${prompt} Return ONLY the rewritten message, nothing else.`,
        },
        { role: "user", content: text },
      ],
    });

    const rewritten = response.choices?.[0]?.message?.content?.trim() || text;
    return rewritten;
  } catch (err) {
    console.error("[AI] Groq rewrite error:", err.message);
    return text;
  }
};

module.exports = { analyzeToneWithAI, rewriteTextWithAI };
