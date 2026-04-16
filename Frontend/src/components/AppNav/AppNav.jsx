import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut, FiUser, FiHome, FiGlobe } from "react-icons/fi";

export default function AppNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="app-nav">
      <div className="app-nav__inner">
        <Link to="/feed" className="app-nav__brand">
          WisperHub
        </Link>
        <div className="app-nav__actions">
          <Link to="/feed" className="app-nav__icon-btn" title="Feed">
            <FiHome size={20} />
          </Link>
          <Link to="/explore" className="app-nav__icon-btn" title="Explore">
            <FiGlobe size={20} />
          </Link>
          {user && (
            <Link
              to={`/profile/${user._id || user.id}`}
              className="app-nav__icon-btn"
              title="Profile"
            >
              <FiUser size={20} />
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="app-nav__icon-btn app-nav__icon-btn--danger"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
