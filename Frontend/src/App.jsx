import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__content">
          <h1 className="landing__logo">WisperHub</h1>
          <p className="landing__tagline">
            Speak freely. Stay anonymous. Your thoughts, unfiltered.
          </p>
          <div className="landing__cta-group">
            {isAuthenticated ? (
              <Link to="/feed" className="btn btn--primary btn--lg">
                Go to Feed
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn--primary btn--lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn--outline btn--lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing__features">
        <div className="feature-card">
          <div className="feature-card__icon">🎭</div>
          <h3 className="feature-card__title">Stay Anonymous</h3>
          <p className="feature-card__desc">
            Post and interact without revealing your identity. Your privacy is our
            priority.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-card__icon">💬</div>
          <h3 className="feature-card__title">Speak Freely</h3>
          <p className="feature-card__desc">
            Share your thoughts, ideas, and confessions openly with the community.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-card__icon">🤝</div>
          <h3 className="feature-card__title">Connect</h3>
          <p className="feature-card__desc">
            Follow others, like posts, and comment — build connections anonymously.
          </p>
        </div>
      </section>
    </div>
  );
}
