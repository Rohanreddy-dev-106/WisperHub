import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // After registration, we pass the new Uniqueid via router state
  const registrationMsg = location.state?.message || "";
  const registrationId = location.state?.uniqueid || "";

  const [form, setForm] = useState({
    Uniqueid: registrationId,
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Backend expects { Uniqueid, password }
      const res = await login({
        Uniqueid: form.Uniqueid.trim(),
        password: form.password,
      });
      // Response: { success: true, data: userObject }
      // JWT is set as httpOnly cookie automatically
      signIn(res.data.data);
      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-header__title">Welcome back</h1>
          <p className="auth-header__subtitle">Sign in to WisperHub</p>
        </div>

        {/* Show registration success message */}
        {registrationMsg && (
          <div
            style={{
              background: "var(--emerald-500-20)",
              border: "1px solid var(--emerald-500-30)",
              borderRadius: "var(--radius-lg)",
              padding: "0.75rem 1rem",
              fontSize: "0.8rem",
              color: "var(--emerald-300)",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            <p>{registrationMsg}</p>
            {registrationId && (
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginTop: "0.4rem",
                  color: "var(--emerald-400)",
                  letterSpacing: "0.02em",
                  userSelect: "all",
                }}
              >
                {registrationId}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Anonymous ID</label>
            <input
              type="text"
              name="Uniqueid"
              value={form.Uniqueid}
              onChange={handleChange}
              required
              placeholder="@YourAnonymousId"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary"
            style={{ width: "100%", padding: "0.625rem" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
        <p className="auth-back">
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
