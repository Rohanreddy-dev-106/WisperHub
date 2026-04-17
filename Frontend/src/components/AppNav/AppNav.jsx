/** @format */

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
    <nav className='app-nav'>
      <div className='app-nav__inner container'>
        {" "}
        {/* Added container for alignment */}
        <Link to='/feed' className='brand-logo'>
          WisperHub
        </Link>
        <div className='app-nav__actions'>
          <Link to='/feed' className='nav-icon-link nav-icon-home' title='Feed'>
            <FiHome size={22} />
          </Link>

          <Link
            to='/explore'
            className='nav-icon-link nav-icon-globe'
            title='Explore'>
            <FiGlobe size={22} />
          </Link>

          {user && (
            <Link
              to={`/profile/${user._id || user.id}`}
              className='nav-icon-link nav-icon-user'
              title='Profile'>
              <FiUser size={22} />
            </Link>
          )}

          <button
            onClick={handleLogout}
            className='nav-icon-link nav-icon-logout'
            title='Logout'>
            <FiLogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
