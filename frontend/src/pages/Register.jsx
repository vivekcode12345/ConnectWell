import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient.js";
import useAuth from "../hooks/useAuth.js";
import Logo from "../components/Logo.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      login(res.data);
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-[32px] border border-ink/10 bg-white p-8 shadow">
        <>
          <div className="flex justify-center mb-6">
            <Logo className="h-16 w-16" />
          </div>
          <h2 className="font-display text-3xl text-center">Create your space</h2>
          <p className="mt-2 text-sm text-ink/70 text-center">
            Start with your name, email, and a strong password.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-ink/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-ink/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-ink/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ink/30"
                placeholder="At least 6 characters"
              />
            </div>
            {error && (
              <div className="rounded-lg bg-coral/10 p-3 text-sm text-coral">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-lg bg-leaf/10 p-3 text-sm text-leaf">
                {success}
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand shadow disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>
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
