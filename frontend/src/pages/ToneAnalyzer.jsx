import { useState } from "react";
import api from "../api/axiosClient.js";

const ToneAnalyzer = () => {
  const [text, setText] = useState("");
  const [analyzedText, setAnalyzedText] = useState(""); // Store the analyzed text
  const [result, setResult] = useState(null);
  const [rewrites, setRewrites] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rewriteLoading, setRewriteLoading] = useState({});

  const rewriteStyles = [
    { key: "professional", label: "Professional", icon: "👔", desc: "Formal and workplace-ready" },
    { key: "friendly", label: "Friendly", icon: "😊", desc: "Warm and approachable" },
    { key: "empathetic", label: "Empathetic", icon: "💙", desc: "Compassionate and supportive" },
    { key: "direct", label: "Direct", icon: "🎯", desc: "Clear and to the point" },
    { key: "apologetic", label: "Apologetic", icon: "🙏", desc: "Sorry and understanding" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setRewrites({});

    try {
      const res = await api.post("/api/ai/tone", { text });
      setResult(res.data);
      setAnalyzedText(text); // Save the analyzed text
      setText(""); // Clear the textarea after successful analysis
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRewrite = async (style) => {
    setRewriteLoading((prev) => ({ ...prev, [style]: true }));
    try {
      const res = await api.post("/api/ai/rewrite", { text: analyzedText, style });
      setRewrites((prev) => ({ ...prev, [style]: res.data.rewritten }));
    } catch (err) {
      setError(err.response?.data?.message || "Rewrite failed");
    } finally {
      setRewriteLoading((prev) => ({ ...prev, [style]: false }));
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="group rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-purple text-2xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            🤖
          </div>
          <div>
            <h2 className="font-display text-3xl">AI tone analyzer</h2>
            <p className="mt-1 text-sm text-ink/70">
              Check emotional tone and rewrite your message in different styles.
            </p>
          </div>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <textarea
            rows="6"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full rounded-2xl border-2 border-ink/10 px-4 py-3 transition-all duration-300 focus:border-mint focus:shadow-md focus:outline-none"
            placeholder="Paste a message you want to analyze..."
            required
          ></textarea>
          {error && <p className="text-sm text-coral">{error}</p>}
          <button disabled={loading} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100">
            {loading ? "Analyzing..." : "Analyze tone"}
          </button>
        </form>
      </section>

      {result && (
        <>
          <section className="rounded-3xl border-2 border-ink/10 bg-gradient-to-br from-sand/40 to-mint/10 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📝</span>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                Analyzed message
              </p>
            </div>
            <p className="text-sm text-ink/80 italic leading-relaxed">"{analyzedText}"</p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="group cursor-pointer rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-mint hover:shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🎯</span>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Detected tone
                </p>
              </div>
              <p className="mt-3 text-3xl font-bold capitalize transition-colors duration-300 group-hover:text-mint">
                {result.tone}
              </p>
            </div>
            <div className="group cursor-pointer rounded-3xl border-2 border-ink bg-gradient-to-br from-ink via-ink to-purple p-6 text-sand shadow-lg transition-all duration-300 hover:scale-105 hover:border-mint hover:shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125">✨</span>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand/60">
                  Original suggestion
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                {result.suggestion}
              </p>
            </div>
          </section>

          <section className="rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg">
            <h3 className="font-display text-2xl mb-4">Rewrite in different styles</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rewriteStyles.map((style) => (
                <button
                  key={style.key}
                  onClick={() => handleRewrite(style.key)}
                  disabled={rewriteLoading[style.key]}
                  className="group relative rounded-2xl border-2 border-ink/10 bg-gradient-to-br from-white to-sand/30 p-4 text-left shadow-md transition-all duration-300 hover:scale-105 hover:border-mint hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-125">{style.icon}</span>
                    <span className="font-semibold text-ink">{style.label}</span>
                  </div>
                  <p className="text-xs text-ink/60">{style.desc}</p>
                  {rewriteLoading[style.key] && (
                    <span className="absolute right-3 top-3 text-xs text-mint">Loading...</span>
                  )}
                </button>
              ))}
            </div>

            {Object.keys(rewrites).length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-ink/50">Results</h4>
                {Object.entries(rewrites).map(([style, text]) => (
                  <div key={style} className="group rounded-2xl border-2 border-ink/10 bg-gradient-to-br from-sand/30 to-mint/10 p-4 shadow-md transition-all duration-300 hover:border-mint hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{rewriteStyles.find((s) => s.key === style)?.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
                        {rewriteStyles.find((s) => s.key === style)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-ink/90 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ToneAnalyzer;
