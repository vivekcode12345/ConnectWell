import { useEffect, useState } from "react";
import api from "../api/axiosClient.js";

const moods = [
  "happy",
  "sad",
  "stressed",
  "anxious",
  "calm",
  "angry",
  "tired",
];

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  stressed: "😰",
  anxious: "😟",
  calm: "😌",
  angry: "😠",
  tired: "😴",
};

const moodColors = {
  happy: {
    bg: "bg-yellow-400",
    border: "border-yellow-500",
    label: "text-yellow-700",
    tint: "hover:bg-yellow-50",
    text: "text-white",
    gradient: "from-yellow-400 to-orange-400",
  },
  sad: {
    bg: "bg-blue-400",
    border: "border-blue-500",
    label: "text-blue-700",
    tint: "hover:bg-blue-50",
    text: "text-white",
    gradient: "from-blue-400 to-blue-600",
  },
  stressed: {
    bg: "bg-red-400",
    border: "border-red-500",
    label: "text-red-700",
    tint: "hover:bg-red-50",
    text: "text-white",
    gradient: "from-red-400 to-orange-500",
  },
  anxious: {
    bg: "bg-purple-400",
    border: "border-purple-500",
    label: "text-purple-700",
    tint: "hover:bg-purple-50",
    text: "text-white",
    gradient: "from-purple-400 to-pink-500",
  },
  calm: {
    bg: "bg-green-400",
    border: "border-green-500",
    label: "text-green-700",
    tint: "hover:bg-green-50",
    text: "text-white",
    gradient: "from-green-400 to-teal-400",
  },
  angry: {
    bg: "bg-red-600",
    border: "border-red-700",
    label: "text-red-700",
    tint: "hover:bg-red-50",
    text: "text-white",
    gradient: "from-red-600 to-red-800",
  },
  tired: {
    bg: "bg-gray-400",
    border: "border-gray-500",
    label: "text-gray-700",
    tint: "hover:bg-gray-50",
    text: "text-white",
    gradient: "from-gray-400 to-gray-600",
  },
};

const moodExamples = {
  happy: "Felt energized today after finishing my tasks early and taking a walk.",
  sad: "Feeling a bit low after a tough conversation, trying to be gentle with myself.",
  stressed: "Deadlines are piling up and I feel stretched thin. Need to pause and reset.",
  anxious: "Worried about an upcoming meeting, practicing slow breathing to settle down.",
  calm: "Had a peaceful morning routine and stayed present during work.",
  angry: "Got frustrated by repeated delays, taking space before responding.",
  tired: "Low energy today, planning an early night and lighter tasks.",
};

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState("happy");
  const [note, setNote] = useState("");
  const [tip, setTip] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    const res = await api.get("/api/moods");
    setHistory(res.data);
  };

  useEffect(() => {
    loadHistory().catch(() => {});
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/moods", {
        mood: selectedMood,
        note,
      });
      setTip(res.data.tip);
      setNote("");
      await loadHistory();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save mood");
    } finally {
      setLoading(false);
    }
  };

  const handleUseSample = () => {
    setNote(moodExamples[selectedMood] || "");
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
      <section className="group rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${moodColors[selectedMood].gradient} text-3xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
            {moodEmojis[selectedMood]}
          </div>
          <div>
            <h2 className="font-display text-3xl">Daily check-in</h2>
            <p className="mt-1 text-sm text-ink/70">
              Name your mood and add context so you can spot trends later.
            </p>
          </div>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => {
              const colors = moodColors[mood];
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition-all duration-300 ${
                    selectedMood === mood
                      ? `scale-110 ${colors.bg} ${colors.text} shadow-lg`
                      : `border-2 ${colors.border} ${colors.label} hover:scale-105 ${colors.tint}`
                  }`}
                >
                  <span className="text-lg">{moodEmojis[mood]}</span>
                  {mood}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/70">
              Example note for {selectedMood}
            </p>
            <button
              type="button"
              onClick={handleUseSample}
              className="rounded-full border-2 border-ink/10 px-4 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:border-mint hover:bg-mint/10"
            >
              Use sample
            </button>
          </div>
          <textarea
            rows="4"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add a short note about your mood..."
            className="w-full rounded-2xl border-2 border-ink/10 px-4 py-3 transition-all duration-300 focus:border-mint focus:shadow-md focus:outline-none"
          ></textarea>
          <p className="text-xs text-ink/50">
            Sample: {moodExamples[selectedMood]}
          </p>
          {error && <p className="text-sm text-coral">{error}</p>}
          <button disabled={loading} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100">
            {loading ? "Saving..." : "Save check-in"}
          </button>
        </form>
        {tip && (
          <div className="mt-6 rounded-2xl border-2 border-mint/30 bg-gradient-to-br from-mint/10 to-sand p-4 text-sm shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                Wellness tip
              </p>
            </div>
            <p className="mt-2">{tip}</p>
          </div>
        )}
      </section>
      <section className="group rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-purple/50 hover:shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-purple text-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            📊
          </div>
          <h3 className="font-display text-xl">Recent entries</h3>
        </div>
        <div className="mt-4 space-y-3">
          {history.length === 0 ? (
            <p className="text-sm text-ink/60">No check-ins yet.</p>
          ) : (
            history.slice(0, 6).map((entry) => {
              const entryColors = moodColors[entry.mood] || moodColors.calm;
              const entryEmoji = moodEmojis[entry.mood] || "😌";
              return (
                <div
                  key={entry._id}
                  className={`group cursor-pointer rounded-2xl border-2 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${entryColors.border} ${entryColors.tint}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${entryColors.bg} ${entryColors.text}`}>
                      <span className="text-base">{entryEmoji}</span>
                      {entry.mood}
                    </span>
                    <p className="text-xs text-ink/60">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {entry.note && (
                    <p className="mt-2 text-sm text-ink/70">{entry.note}</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default MoodCheckIn;
