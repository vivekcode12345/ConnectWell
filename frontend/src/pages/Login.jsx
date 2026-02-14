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

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-[32px] border border-ink/10 bg-white p-8 shadow">
        <div className="flex justify-center mb-6">
          <Logo className="h-16 w-16" />
        </div>
        <h2 className="font-display text-3xl text-center">Welcome back</h2>
        <p className="mt-2 text-sm text-ink/70 text-center">Sign in to your dashboard.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 px-4 py-3"
            />
          </div>
          {error && <p className="text-sm text-coral">{error}</p>}
          <button disabled={loading} className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand shadow disabled:opacity-50">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
