import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostsByUser } from "../services/post.service";
import { followUser, unfollowUser, getFollowStatus } from "../services/social.service";
import AppNav from "../components/AppNav/AppNav";
import PostCard from "../components/PostCard/PostCard";
import { FiUserPlus, FiUserMinus, FiLoader } from "react-icons/fi";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const isOwnProfile =
    currentUser?._id === userId || currentUser?.id === userId;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPostsByUser(userId);
      const data = res.data?.posts || res.data || [];
      setPosts(data);
      
      try {
        const statusRes = await getFollowStatus(userId);
        if (statusRes.data?.data) {
          setFollowing(statusRes.data.data.isFollowing);
          setFollowersCount(statusRes.data.data.followerCount);
        }
      } catch (err) {
        // Non-critical, ignore if follow status fails
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleFollowToggle = async () => {
    setFollowLoading(true);
    try {
      if (following) {
        await unfollowUser(userId);
        setFollowing(false);
        setFollowersCount(c => Math.max(0, c - 1));
      } else {
        await followUser(userId);
        setFollowing(true);
        setFollowersCount(c => c + 1);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Action failed.");
    } finally {
      setFollowLoading(false);
    }
  };

  const handleDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const authorObj = posts[0]?.authorId;
  const displayName = authorObj?.Uniqueid || `user_${userId?.slice(-5)}`;
  const avatar = authorObj?.Avatar || "🎭";

  return (
    <div className="page">
      <AppNav />

      <main className="page__main">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header__info">
            <div className="profile-header__avatar" style={{ fontSize: '2rem', background: 'transparent' }}>
              {avatar}
            </div>
            <h2 className="profile-header__name" style={{ color: 'var(--emerald-400)' }}>
              {displayName}
            </h2>
            <p className="profile-header__stats">
              <span><b>{posts.length}</b> {posts.length === 1 ? "post" : "posts"}</span>
              <span style={{ margin: "0 0.5rem", opacity: 0.5 }}>•</span>
              <span><b>{followersCount}</b> {followersCount === 1 ? "follower" : "followers"}</span>
            </p>
          </div>

          {!isOwnProfile && currentUser && (
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className={`btn ${following ? "btn--unfollow" : "btn--primary"}`}
              style={{
                borderRadius: '50px',
                padding: '0.4rem 1.2rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: following ? '1px solid var(--neutral-600)' : 'none',
                backgroundColor: following ? 'transparent' : 'var(--emerald-500)',
                color: following ? 'var(--neutral-100)' : '#000',
                transition: 'all 0.2s ease',
                width: 'auto'
              }}
            >
              {followLoading ? (
                <FiLoader size={16} className="spin" />
              ) : following ? (
                <>
                  <FiUserMinus size={16} /> Unfollow
                </>
              ) : (
                <>
                  <FiUserPlus size={16} /> Follow
                </>
              )}
            </button>
          )}
        </div>

        {/* Posts Section */}
        <section className="profile-section">
          <h3 className="profile-section__title">Wispers</h3>

          {loading && (
            <div className="feed-list">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-line skeleton-line--quarter" />
                  <div className="skeleton-line skeleton-line--three-quarter" />
                  <div className="skeleton-line skeleton-line--half" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="error-banner">
              <p className="error-banner__text">{error}</p>
              <button onClick={fetchPosts} className="error-banner__retry">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="empty-state">
              <p className="empty-state__title">No posts yet.</p>
              {isOwnProfile && (
                <p className="empty-state__desc">
                  Head to your feed to create your first Wisper.
                </p>
              )}
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="feed-list">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDeleted={isOwnProfile ? handleDeleted : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
