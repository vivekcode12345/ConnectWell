import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MoodCheckIn from "./pages/MoodCheckIn.jsx";
import Communities from "./pages/Communities.jsx";
import ToneAnalyzer from "./pages/ToneAnalyzer.jsx";
import StaticPage from "./pages/StaticPage.jsx";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 px-4 pb-12 pt-6 sm:px-8 lg:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/features"
              element={
                <StaticPage
                  title="Features"
                  subtitle="A quick tour of the core ConnectWell capabilities."
                  items={[
                    {
                      title: "Mood Tracking",
                      body: "Log daily emotions and discover patterns over time.",
                    },
                    {
                      title: "AI Tone Coach",
                      body: "Rewrite messages with empathy and clarity.",
                    },
                    {
                      title: "Community Support",
                      body: "Share in supportive circles that match your needs.",
                    },
                    {
                      title: "Insights",
                      body: "See weekly trends and personalized recommendations.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/pricing"
              element={
                <StaticPage
                  title="Pricing"
                  subtitle="ConnectWell is free during the demo phase."
                  items={[
                    {
                      title: "Starter",
                      body: "Free access to mood tracking, communities, and AI tone coaching.",
                    },
                    {
                      title: "Pro",
                      body: "Advanced insights and team wellness tools (coming soon).",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/security"
              element={
                <StaticPage
                  title="Security"
                  subtitle="We prioritize safety and privacy across the platform."
                  items={[
                    {
                      title: "Account Protection",
                      body: "OTP verification and secure authentication.",
                    },
                    {
                      title: "Community Safety",
                      body: "Report or block content to keep spaces supportive.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/about"
              element={
                <StaticPage
                  title="About"
                  subtitle="ConnectWell helps people feel seen and heard."
                  items={[
                    {
                      title: "Mission",
                      body: "Build healthier communication and emotional well-being.",
                    },
                    {
                      title: "Vision",
                      body: "A world where emotional support is accessible to everyone.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/blog"
              element={
                <StaticPage
                  title="Blog"
                  subtitle="Stories and tips for emotional well-being."
                  items={[
                    {
                      title: "Building calm routines",
                      body: "Small daily practices that support mental wellness.",
                    },
                    {
                      title: "Empathetic messaging",
                      body: "How to express needs without escalating conflict.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <StaticPage
                  title="Contact"
                  subtitle="We would love to hear from you."
                  items={[
                    {
                      title: "Email",
                      body: "support@connectwell.app",
                    },
                    {
                      title: "Response time",
                      body: "We typically reply within 24-48 hours.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <StaticPage
                  title="Privacy"
                  subtitle="Your data is handled with care and respect."
                  items={[
                    {
                      title: "Data usage",
                      body: "We use your data to personalize insights and improve the product.",
                    },
                    {
                      title: "Control",
                      body: "You can request deletion of your account at any time.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/terms"
              element={
                <StaticPage
                  title="Terms"
                  subtitle="Clear guidelines for using ConnectWell."
                  items={[
                    {
                      title: "Respectful use",
                      body: "We do not allow harassment or hateful content.",
                    },
                    {
                      title: "Community standards",
                      body: "Keep conversations supportive and constructive.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/help"
              element={
                <StaticPage
                  title="Help"
                  subtitle="Quick answers to common questions."
                  items={[
                    {
                      title: "Email verification",
                      body: "Use the OTP code sent after registration to activate your account.",
                    },
                    {
                      title: "Trouble logging in",
                      body: "Double-check credentials or reset your password if needed.",
                    },
                  ]}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodCheckIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/communities"
              element={
                <ProtectedRoute>
                  <Communities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tone"
              element={
                <ProtectedRoute>
                  <ToneAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
