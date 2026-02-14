import { useEffect, useState } from "react";
import api from "../api/axiosClient.js";
import useAuth from "../hooks/useAuth.js";
import MoodChart from "../components/MoodChart.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [moods, setMoods] = useState([]);
  const [trend, setTrend] = useState(null);

  const recentMoods = moods.filter((entry) => {
    const created = new Date(entry.createdAt).getTime();
    const since = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return created >= since;
  });
  const stressMoods = new Set(["stressed", "anxious", "angry"]);
  const stressCount = recentMoods.filter((entry) =>
    stressMoods.has(entry.mood)
  ).length;
  const stressRatio = recentMoods.length
    ? Math.round((stressCount / recentMoods.length) * 100)
    : 0;
  const stressLevel =
    stressRatio >= 60 ? "High" : stressRatio >= 30 ? "Moderate" : "Low";
  const recommendation =
    stressLevel === "High"
      ? "Consider scheduling a quiet break and message a trusted friend."
      : stressLevel === "Moderate"
      ? "Try a short breathing reset after your next task."
      : "Keep reinforcing the routines that are working for you.";

  useEffect(() => {
    const load = async () => {
      const [moodRes, trendRes] = await Promise.all([
        api.get("/api/moods"),
        api.get("/api/moods/weekly"),
      ]);
      setMoods(moodRes.data);
      setTrend(trendRes.data);
    };

    load().catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-ink via-ink to-purple p-8 text-sand shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-mint shadow-lg shadow-mint/50"></div>
            <p className="text-sm uppercase tracking-[0.3em] text-sand/60">
              Well-being dashboard
            </p>
          </div>
          <h2 className="mt-3 font-display text-4xl">
            Welcome back, {user?.name || "friend"}.
          </h2>
          <p className="mt-3 text-base text-sand/80">
            Here is your emotional snapshot and a few grounding insights.
          </p>
        </div>
        {/* Animated gradient orbs */}
        <div className="absolute -right-10 -top-10 h-40 w-40 animate-pulse rounded-full bg-mint/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse rounded-full bg-purple/20 blur-3xl" style={{ animationDelay: '1s' }}></div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <MoodChart entries={moods} />
        <div className="group rounded-3xl border-2 border-ink/10 bg-gradient-to-br from-white to-sand/30 p-6 shadow-lg transition-all duration-300 hover:border-purple/50 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-purple text-xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              📈
            </div>
            <h3 className="font-display text-xl">Weekly Insights</h3>
          </div>
          {trend ? (
            <div className="mt-6 space-y-4">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="cursor-pointer rounded-2xl border-2 border-mint/20 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-mint hover:shadow-md">
                  <p className="text-xs uppercase tracking-wider text-ink/50">Check-ins</p>
                  <p className="mt-2 text-3xl font-bold text-ink">{trend.totalEntries}</p>
                  <p className="mt-1 text-xs text-mint">This week</p>
                </div>
                <div className="cursor-pointer rounded-2xl border-2 border-purple/20 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-purple hover:shadow-md">
                  <p className="text-xs uppercase tracking-wider text-ink/50">Top Mood</p>
                  <p className="mt-2 text-2xl font-bold capitalize text-ink">
                    {trend.topMood || "N/A"}
                  </p>
                  <p className="mt-1 text-xs text-purple">Most frequent</p>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="group/rec relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-mint/20 to-purple/20 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-mint/30 hover:to-purple/30 hover:shadow-md">
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-lg transition-transform duration-300 group-hover/rec:scale-125">✨</span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                      Smart Recommendation
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    Try a 10-minute reset walk to keep the momentum.
                  </p>
                </div>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-mint/30 blur-2xl transition-all duration-500 group-hover/rec:scale-150"></div>
              </div>

              {/* Engagement indicator */}
              <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 transition-all duration-300 hover:bg-sand/50 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm font-medium text-ink/70">Active tracking</span>
                </div>
                <span className="text-xs text-ink/50">🔥 {trend.totalEntries} day streak</span>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink/10 py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-mint border-t-transparent"></div>
              <p className="mt-4 text-sm text-ink/60">Loading insights...</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-lg transition-all duration-300 hover:border-ink/30 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Stress Pattern</h3>
            <span className={`rounded-full px-4 py-1.5 text-xs font-bold shadow-md ${
              stressLevel === 'High' 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                : stressLevel === 'Moderate'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
            }`}>
              {stressLevel}
            </span>
          </div>
          <p className="mt-2 text-xs text-ink/60">Last 7 days analysis</p>
          
          {/* Animated Wave Progress */}
          <div className="mt-6 space-y-2">
            <div className="flex items-end justify-between text-xs font-semibold">
              <span className="text-ink/70">Stress Level</span>
              <span className={`text-xl ${
                stressLevel === 'High' ? 'text-red-500' : 
                stressLevel === 'Moderate' ? 'text-orange-500' : 'text-green-500'
              }`}>{stressRatio}%</span>
            </div>
            
            {/* Modern gradient progress bar */}
            <div className="relative h-6 overflow-hidden rounded-full bg-sand">
              <div
                className={`h-full rounded-full shadow-lg transition-all duration-1000 ease-out ${
                  stressLevel === 'High' 
                    ? 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500' 
                    : stressLevel === 'Moderate'
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400'
                    : 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-400'
                }`}
                style={{ width: `${stressRatio}%` }}
              >
                <div className="h-full w-full animate-pulse opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="cursor-pointer rounded-2xl bg-sand p-4 transition-all duration-300 hover:bg-mint/30 hover:shadow-md">
              <p className="text-xs uppercase tracking-wider text-ink/50">Check-ins</p>
              <p className="mt-1 text-2xl font-bold text-ink">{recentMoods.length}</p>
            </div>
            <div className="cursor-pointer rounded-2xl bg-sand p-4 transition-all duration-300 hover:bg-coral/20 hover:shadow-md">
              <p className="text-xs uppercase tracking-wider text-ink/50">Stress Events</p>
              <p className="mt-1 text-2xl font-bold text-coral">{stressCount}</p>
            </div>
          </div>

          {/* Decorative gradient overlay on hover */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple/10 to-mint/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border-2 border-ink bg-gradient-to-br from-ink via-ink to-purple p-6 text-sand shadow-lg transition-all duration-300 hover:border-mint hover:shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand/10 text-2xl backdrop-blur-sm transition-all duration-300 group-hover:bg-sand/20 group-hover:scale-110">
                💡
              </div>
              <h3 className="font-display text-xl">Personalized Focus</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-sand/90">{recommendation}</p>
          </div>
          
          {/* Animated background pattern */}
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-mint/20 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-purple/20 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
