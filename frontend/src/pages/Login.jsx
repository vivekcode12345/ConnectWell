import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient.js";
import useAuth from "../hooks/useAuth.js";
import Logo from "../components/Logo.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyForm, setVerifyForm] = useState({ email: "", otp: "" });
  const [verifyError, setVerifyError] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleVerifyChange = (event) => {
    setVerifyForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    setVerifyError("");
    setVerifyMessage("");
    setVerifyLoading(true);

    try {
      const res = await api.post("/api/auth/verify-otp", {
        email: verifyForm.email,
        otp: verifyForm.otp,
      });
      setVerifyMessage(res.data.message || "Email verified.");
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setVerifyError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setVerifyError("");
    setVerifyMessage("");
    setVerifyLoading(true);

    try {
      const res = await api.post("/api/auth/resend-otp", {
        email: verifyForm.email,
      });
      setVerifyMessage(res.data.message || "OTP resent.");
    } catch (err) {
      setVerifyError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-[32px] border border-ink/10 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow">
        <div className="flex justify-center mb-6">
          <Logo className="h-16 w-16" />
        </div>
        <h2 className="font-display text-3xl text-center dark:text-slate-50">Welcome back</h2>
        <p className="mt-2 text-sm text-ink/70 dark:text-slate-400 text-center">Sign in to your dashboard.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold dark:text-slate-200">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-semibold dark:text-slate-200">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3"
            />
          </div>
          {error && (
            <p className="text-sm text-coral dark:text-red-400">
              {error}
              {error.toLowerCase().includes("verify") && (
                <span className="ml-2 text-ink/70 dark:text-slate-400">
                  Verify your email on the register page.
                </span>
              )}
            </p>
          )}
          <button disabled={loading} className="w-full rounded-full bg-ink dark:bg-mint dark:text-ink px-6 py-3 text-sm font-semibold text-sand shadow disabled:opacity-50">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="mt-8 border-t border-ink/10 dark:border-slate-700 pt-6">
          <h3 className="text-sm font-semibold text-ink/80 dark:text-slate-200">
            Verify your email
          </h3>
          <p className="mt-1 text-xs text-ink/60 dark:text-slate-400">
            Already registered but not verified? Enter your email and OTP.
          </p>
          <form className="mt-4 space-y-3" onSubmit={handleVerifySubmit}>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={verifyForm.email}
                onChange={handleVerifyChange}
                className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                OTP
              </label>
              <input
                name="otp"
                value={verifyForm.otp}
                onChange={handleVerifyChange}
                maxLength={6}
                inputMode="numeric"
                pattern="\d{6}"
                className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 px-4 py-3 text-center tracking-[0.5em]"
                placeholder="123456"
                required
              />
            </div>
            {verifyError && (
              <p className="text-sm text-coral dark:text-red-400">
                {verifyError}
              </p>
            )}
            {verifyMessage && (
              <p className="text-sm text-leaf dark:text-green-400">
                {verifyMessage}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={verifyLoading}
                className="rounded-full bg-ink dark:bg-mint dark:text-ink px-6 py-2 text-xs font-semibold text-sand shadow disabled:opacity-50"
              >
                {verifyLoading ? "Verifying..." : "Verify"}
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={verifyLoading || !verifyForm.email}
                className="text-xs font-semibold text-ink/70 hover:text-ink dark:text-slate-400 dark:hover:text-slate-200"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
