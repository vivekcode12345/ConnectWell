const getWeeklyTrend = (logs) => {
  const counts = logs.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {});

  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return {
    totalEntries: logs.length,
    topMood: topMood ? topMood[0] : null,
    counts,
  };
};

const tipsByMood = {
  happy: "Celebrate small wins and share your joy with someone you trust.",
  sad: "Consider a short walk or a call with a supportive friend.",
  stressed: "Try a 4-7-8 breathing exercise for two minutes.",
  anxious: "Ground yourself by naming five things you can see.",
  calm: "Notice what helped you feel calm and repeat it tomorrow.",
  angry: "Pause and write down what you need before responding.",
  tired: "Aim for a short rest and hydrate if possible.",
};

module.exports = { getWeeklyTrend, tipsByMood };
