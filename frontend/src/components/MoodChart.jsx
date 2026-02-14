const MoodChart = ({ entries }) => {
  const counts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moods = Object.keys(counts);
  const total = entries.length;

  const moodConfig = {
    happy: { emoji: '😊', color: '#84fab0', gradient: 'from-green-400 to-emerald-500' },
    excited: { emoji: '🎉', color: '#a8edea', gradient: 'from-cyan-400 to-blue-500' },
    calm: { emoji: '😌', color: '#a1c4fd', gradient: 'from-blue-400 to-indigo-500' },
    sad: { emoji: '😢', color: '#667eea', gradient: 'from-indigo-400 to-purple-500' },
    anxious: { emoji: '😰', color: '#fbc2eb', gradient: 'from-pink-400 to-purple-500' },
    stressed: { emoji: '😓', color: '#ffa270', gradient: 'from-orange-400 to-red-500' },
    angry: { emoji: '😠', color: '#ff6b6b', gradient: 'from-red-500 to-pink-500' },
    tired: { emoji: '😴', color: '#cbd5f5', gradient: 'from-slate-400 to-indigo-400' },
  };

  const CircularProgress = ({ mood, count }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const config = moodConfig[mood] || { emoji: '🔵', color: '#84fab0', gradient: 'from-gray-400 to-gray-500' };

    return (
      <div className="group relative flex cursor-pointer flex-col items-center rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:bg-sand/50">
        <div className="relative h-32 w-32">
          {/* Background circle */}
          <svg className="h-32 w-32 -rotate-90 transform transition-all duration-300 group-hover:scale-110">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#f5f3ed"
              strokeWidth="8"
              fill="none"
            />
            {/* Animated progress circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={config.color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out group-hover:stroke-[10]"
              style={{ filter: 'drop-shadow(0 0 8px ' + config.color + ')' }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110">
            <span className="text-4xl transition-transform duration-300 group-hover:scale-125">{config.emoji}</span>
            <span className="mt-1 text-xl font-bold text-ink">{count}</span>
          </div>
        </div>
        {/* Label */}
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold capitalize text-ink transition-colors duration-300 group-hover:text-ink">{mood}</p>
          <p className="text-xs text-ink/60 transition-colors duration-300 group-hover:text-ink/80">{percentage.toFixed(0)}%</p>
        </div>
      </div>
    );
  };

  return (
    <div className="group rounded-3xl border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl">Mood Analytics</h3>
          <p className="mt-1 text-sm text-ink/60">
            {total} total check-ins tracked
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-purple text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          📊
        </div>
      </div>

      {moods.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink/10 py-12">
          <span className="text-5xl opacity-30">📈</span>
          <p className="mt-4 text-sm text-ink/60">No mood entries yet.</p>
          <p className="mt-1 text-xs text-ink/40">Start tracking to see beautiful analytics!</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {moods.map((mood) => (
            <CircularProgress key={mood} mood={mood} count={counts[mood]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodChart;
