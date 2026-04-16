import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllPosts } from "../services/post.service";
import AppNav from "../components/AppNav/AppNav";
import PostCard from "../components/PostCard/PostCard";
import CreatePostModal from "../components/CreatePost/CreatePostModal";
import { FiRefreshCw, FiGlobe } from "react-icons/fi";

export default function ExplorePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllPosts();
      setPosts(res.data?.posts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load global posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSuccess = () => {
    setEditingPost(null);
    fetchPosts();
  };

  const handleDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  return (
    <div className="page">
      <AppNav />

      <main className="page__main">
        {/* Header */}
        <div className="feed-header">
          <div className="feed-header__info">
            <h1 className="feed-header__title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiGlobe /> Explore
            </h1>
            <p className="feed-header__sub">
              See what everyone is whispering about.
            </p>
          </div>
          <div className="feed-header__actions">
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="btn btn--ghost"
              title="Refresh"
            >
              <FiRefreshCw size={18} className={loading ? "spin" : ""} />
            </button>
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="feed-list">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-line skeleton-line--quarter" />
                <div className="skeleton-line skeleton-line--three-quarter" />
                <div className="skeleton-line skeleton-line--half" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-banner">
            <p className="error-banner__text">{error}</p>
            <button onClick={fetchPosts} className="error-banner__retry">
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <div className="empty-state">
            <p className="empty-state__title">It&apos;s quiet... too quiet.</p>
            <p className="empty-state__desc">
              Nobody has posted anything yet.
            </p>
          </div>
        )}

        {/* Post list */}
        {!loading && !error && posts.length > 0 && (
          <div className="feed-list">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDeleted={handleDeleted}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreatePostModal
          onClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }}
          onSuccess={handlePostSuccess}
          existingPost={editingPost}
        />
      )}
    </div>
  );
}
