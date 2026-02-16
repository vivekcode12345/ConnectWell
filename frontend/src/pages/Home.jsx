import { NavLink } from "react-router-dom";
import Logo from "../components/Logo.jsx";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ink via-ink to-leaf px-4 py-16 text-sand dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-50 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <Logo className="h-12 w-12" />
            <div className="inline-block rounded-full border border-mint/30 bg-mint/10 px-4 py-2">
              <p className="text-xs uppercase tracking-widest text-mint">✨ Emotional Intelligence Platform</p>
            </div>
          </div>
          <h1 className="mb-4 font-display text-5xl leading-tight sm:text-6xl">
            Be Seen. Be Heard. <br /> Be Well.
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-sand/80 dark:text-slate-300">
            ConnectWell helps you understand your emotions, communicate with empathy, and build meaningful connections with supportive communities.
          </p>
          <div className="flex flex-wrap gap-4">
            <NavLink
              to="/register"
              className="group rounded-lg bg-mint px-8 py-4 font-semibold text-ink shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              <span className="inline-flex items-center gap-2">
                Get Started Free
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </NavLink>
            <NavLink
              to="/login"
              className="rounded-lg border-2 border-mint px-8 py-4 font-semibold text-sand dark:text-slate-50 transition-all duration-300 hover:scale-105 hover:border-mint hover:bg-mint/20 hover:shadow-lg"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-sand dark:bg-slate-900 px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-4xl dark:text-slate-50">Powerful Features for Your Wellbeing</h2>
            <p className="text-lg text-ink/70 dark:text-slate-400">Everything you need to track emotions, improve communication, and find community support</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📊",
                title: "Mood Tracking",
                copy: "Log daily emotions and discover patterns that guide healthier habits.",
              },
              {
                icon: "🤖",
                title: "AI Tone Coach",
                copy: "Get instant suggestions to rewrite messages with more empathy.",
              },
              {
                icon: "👥",
                title: "Safe Communities",
                copy: "Join interest-based groups and share with people who understand you.",
              },
              {
                icon: "📈",
                title: "Insights & Trends",
                copy: "See weekly trends, stress patterns, and personalized recommendations.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group cursor-pointer rounded-2xl border-2 border-ink/10 bg-white dark:bg-slate-800 dark:border-slate-700 p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:border-mint hover:shadow-xl"
              >
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{feature.icon}</div>
                <h3 className="mb-2 font-display text-xl dark:text-slate-50 transition-colors duration-300 group-hover:text-mint">{feature.title}</h3>
                <p className="text-sm text-ink/70 dark:text-slate-400">{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-white dark:bg-slate-900 px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group rounded-2xl border-2 border-ink/10 dark:border-slate-700 bg-gradient-to-br from-mint/10 to-sky/10 dark:from-mint/20 dark:to-slate-800 p-8 shadow-sm transition-all duration-300 hover:border-mint/50 hover:shadow-lg">
              <h3 className="mb-4 font-display text-2xl dark:text-slate-50 transition-colors duration-300 group-hover:text-mint">Your Safety Comes First</h3>
              <ul className="space-y-3 text-sm text-ink/80 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-mint">✓</span>
                  <span>Report concerning posts and users</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint">✓</span>
                  <span>Block users to protect your space</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint">✓</span>
                  <span>Content moderation by our team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint">✓</span>
                  <span>Post anonymously when you need privacy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint">✓</span>
                  <span>Encrypted data & secure authentication</span>
                </li>
              </ul>
            </div>
            <div className="group rounded-2xl border-2 border-ink/10 dark:border-slate-700 bg-gradient-to-br from-sky/10 to-leaf/10 dark:from-sky/20 dark:to-slate-800 p-8 shadow-sm transition-all duration-300 hover:border-sky/50 hover:shadow-lg">
              <h3 className="mb-4 font-display text-2xl dark:text-slate-50 transition-colors duration-300 group-hover:text-sky">How It Works</h3>
              <ol className="space-y-4 text-sm text-ink/80 dark:text-slate-400">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink dark:bg-mint text-sand dark:text-ink font-semibold">1</span>
                  <span>Create your account in seconds</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink dark:bg-mint text-sand dark:text-ink font-semibold">2</span>
                  <span>Start your daily mood check-ins</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink dark:bg-mint text-sand dark:text-ink font-semibold">3</span>
                  <span>Join communities that match your interests</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink dark:bg-mint text-sand dark:text-ink font-semibold">4</span>
                  <span>Get insights and improve your wellbeing</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ink dark:bg-slate-900 px-4 py-16 text-center text-sand dark:text-slate-50 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 font-display text-4xl">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-lg text-sand/80 dark:text-slate-300">Join thousands strengthening their emotional well-being.</p>
          <NavLink
            to="/register"
            className="group inline-block rounded-lg bg-mint px-8 py-4 font-semibold text-ink shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
          >
            <span className="inline-flex items-center gap-2">
              Create Free Account
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
