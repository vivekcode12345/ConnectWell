import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient.js";
import useAuth from "../hooks/useAuth.js";
import Logo from "../components/Logo.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pendingEmail = localStorage.getItem("cw_pending_email");
    if (pendingEmail) {
      setEmailForOtp(pendingEmail);
      setForm((prev) => ({ ...prev, email: pendingEmail }));
      setStep("verify");
    }
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/register", form);
      setSuccess(res.data.message);
      setEmailForOtp(form.email);
      localStorage.setItem("cw_pending_email", form.email);
      setStep("verify");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/verify-otp", {
        email: emailForOtp || form.email,
        otp,
      });
      setSuccess(res.data.message || "Email verified.");
      login(res.data);
      localStorage.removeItem("cw_pending_email");
      setTimeout(() => navigate("/dashboard"), 300);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/resend-otp", {
        email: emailForOtp || form.email,
      });
      setSuccess(res.data.message || "OTP resent.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-[32px] border border-ink/10 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow">
        <>
          <div className="flex justify-center mb-6">
            <Logo className="h-16 w-16" />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/50 dark:text-slate-400">
            <span className={step === "form" ? "font-semibold text-ink dark:text-slate-200" : ""}>
              Step 1
            </span>
            <span>•</span>
            <span className={step === "verify" ? "font-semibold text-ink dark:text-slate-200" : ""}>
              Step 2
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-center dark:text-slate-50">
            {step === "verify" ? "Verify your email" : "Create your space"}
          </h2>
          <p className="mt-2 text-sm text-ink/70 dark:text-slate-400 text-center">
            {step === "verify"
              ? "Enter the 6-digit code sent to your email address."
              : "Start with your name, email, and a strong password."}
          </p>
          {step === "verify" ? (
            <form className="mt-6 space-y-4" onSubmit={handleVerifySubmit}>
              <div className="rounded-2xl border border-ink/10 dark:border-slate-700 bg-sand/40 dark:bg-slate-700/40 px-4 py-3 text-sm text-ink/70 dark:text-slate-300">
                Verifying: <span className="font-semibold text-ink dark:text-slate-100">{emailForOtp || form.email}</span>
              </div>
              <div>
                <label className="text-sm font-semibold dark:text-slate-200">
                  Verification code
                </label>
                <input
                  name="otp"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  required
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d{6}"
                  className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3 text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-ink/30 dark:focus:ring-mint/30"
                  placeholder="123456"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-ink/60 dark:text-slate-400">
                <span>Did not get the code?</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-semibold text-ink hover:underline dark:text-mint"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs font-semibold text-ink/70 hover:text-ink dark:text-slate-400 dark:hover:text-slate-200"
              >
                Use a different email
              </button>
              {error && (
                <div className="rounded-lg bg-coral/10 dark:bg-red-900/20 p-3 text-sm text-coral dark:text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg bg-leaf/10 dark:bg-green-900/20 p-3 text-sm text-leaf dark:text-green-400">
                  {success}
                </div>
              )}
              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-full bg-ink dark:bg-mint dark:text-ink px-6 py-3 text-sm font-semibold text-sand shadow disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & continue"}
              </button>
            </form>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="text-sm font-semibold dark:text-slate-200">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30 dark:focus:ring-mint/30"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold dark:text-slate-200">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30 dark:focus:ring-mint/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold dark:text-slate-200">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30 dark:focus:ring-mint/30"
                  placeholder="At least 6 characters"
                />
              </div>
            {error && (
              <div className="rounded-lg bg-coral/10 dark:bg-red-900/20 p-3 text-sm text-coral dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-lg bg-leaf/10 dark:bg-green-900/20 p-3 text-sm text-leaf dark:text-green-400">
                {success}
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-full bg-ink dark:bg-mint dark:text-ink px-6 py-3 text-sm font-semibold text-sand shadow disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
            </form>
          )}
          <p className="mt-4 text-center text-sm text-ink/60">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-ink hover:underline">
              Log in
            </a>
          </p>
        </>
      </div>
    </div>
  );
};

export default Register;
