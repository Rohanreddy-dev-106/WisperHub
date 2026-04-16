import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: "",
    bio: "",
    password: "",
    avatar: "🎭",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const avatarOptions = ["🎭", "👤", "🐱", "🦊", "🐸", "🌙", "⚡", "🔥", "💀", "🤖"];

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const age = Number(form.age);
    if (age < 18 || age > 60) {
      setError("Age must be between 18 and 60.");
      return;
    }
    if (form.bio.length < 20 || form.bio.length > 60) {
      setError("Bio must be between 20 and 60 characters.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        age: age,
        bio: form.bio,
        password: form.password,
        avatar: form.avatar,
      });
      // Registration successful — backend returns user data but no auto-login token.
      // Redirect to login so user can authenticate with their Uniqueid.
      if (res.data?.success) {
        navigate("/login", {
          state: {
            message: "Account created! Your anonymous ID is shown below. Save it — you'll need it to log in.",
            uniqueid: res.data.data?.Uniqueid,
          },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-header__title">Join WisperHub</h1>
          <p className="auth-header__subtitle">
            Stay anonymous. Speak freely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Avatar picker */}
          <div className="form-group">
            <label className="form-label">Choose Avatar</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, avatar: emoji }))}
                  style={{
                    fontSize: "1.5rem",
                    padding: "0.5rem",
                    borderRadius: "var(--radius-lg)",
                    border:
                      form.avatar === emoji
                        ? "2px solid var(--emerald-500)"
                        : "2px solid var(--neutral-700)",
                    background:
                      form.avatar === emoji
                        ? "var(--emerald-500-20)"
                        : "var(--neutral-900)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              min={18}
              max={60}
              placeholder="18–60"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio (20–60 characters)</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={60}
              placeholder="Tell us about yourself…"
              rows={2}
              className="form-textarea"
            />
            <span
              style={{
                fontSize: "0.7rem",
                color:
                  form.bio.length >= 20 && form.bio.length <= 60
                    ? "var(--emerald-400)"
                    : "var(--neutral-500)",
                marginTop: "0.25rem",
              }}
            >
              {form.bio.length}/60
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="at least 8 characters"
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
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
        <p className="auth-back">
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
