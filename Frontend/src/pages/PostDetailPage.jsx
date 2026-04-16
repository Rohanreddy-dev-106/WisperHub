import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById, deletePost } from "../services/post.service";
import { toggleLike } from "../services/social.service";
import AppNav from "../components/AppNav/AppNav";
import CommentSection from "../components/CommentSection/CommentSection";
import CreatePostModal from "../components/CreatePost/CreatePostModal";
import { FiHeart, FiArrowLeft, FiTrash2, FiEdit2 } from "react-icons/fi";

export default function PostDetailPage() {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getPostById(postId)
      .then((res) => {
        // Backend: { success, post: {...} }
        const found = res.data?.post;
        if (found) {
          setPost(found);
          setLikeCount(found.likeCount ?? 0);
        } else {
          setError(
            "Post not found or you don't have permission to view it."
          );
        }
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [postId, user]);

  const handleLike = async () => {
    setLiked((p) => !p);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    try {
      await toggleLike(postId);
    } catch {
      setLiked((p) => !p);
      setLikeCount((c) => (liked ? c + 1 : c - 1));
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deletePost(postId);
      navigate("/feed");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
      setDeleting(false);
    }
  };

  const authorObj = typeof post?.authorId === "object" ? post.authorId : null;
  const authorIdStr = authorObj ? authorObj._id : post?.authorId;
  const isOwner =
    user && post && (user._id === authorIdStr || user.id === authorIdStr);

  return (
    <div className="page">
      <AppNav />

      <main className="page__main">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="back-link">
          <FiArrowLeft size={16} /> Back
        </button>

        {/* Loading skeleton */}
        {loading && (
          <div
            className="skeleton-card"
            style={{ borderRadius: "1.25rem", padding: "1.5rem" }}
          >
            <div className="skeleton-line skeleton-line--quarter" />
            <div className="skeleton-line skeleton-line--full" />
            <div className="skeleton-line skeleton-line--three-quarter" />
            <div className="skeleton-line skeleton-line--half" />
          </div>
        )}

        {!loading && error && (
          <div className="error-banner">
            <p className="error-banner__text">{error}</p>
          </div>
        )}

        {!loading && !error && post && (
          <>
            {/* Post Card */}
            <article className="post-card post-card--detail">
              {/* Header */}
              <div className="post-card__header">
                <Link
                  to={`/profile/${authorIdStr}`}
                  className="post-card__author"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {authorObj?.Avatar && <span style={{fontSize:'1.2rem'}}>{authorObj.Avatar}</span>}
                  {authorObj?.Uniqueid ? (
                    <span style={{ fontWeight: 600, color: 'var(--emerald-400)' }}>
                      {authorObj.Uniqueid}
                    </span>
                  ) : isOwner && user?.Uniqueid ? (
                     <span style={{ fontWeight: 600, color: 'var(--emerald-400)' }}>
                      {user.Uniqueid}
                     </span>
                  ) : (
                     "🎭 anonymous"
                  )}
                </Link>
                <span className="post-card__date">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              {/* Content — backend uses "text" field */}
              <p className="post-card__content post-card__content--lg">
                {post.text}
              </p>

              {/* Actions */}
              <div className="post-card__actions post-card__actions--bordered">
                <button
                  onClick={handleLike}
                  className={`post-card__action-btn post-card__action-btn--like ${
                    liked ? "post-card__action-btn--liked" : ""
                  }`}
                >
                  <FiHeart
                    size={17}
                    className={liked ? "fill-current" : ""}
                  />
                  <span>
                    {likeCount} {likeCount === 1 ? "like" : "likes"}
                  </span>
                </button>

                {isOwner && (
                  <div className="post-card__owner-actions">
                    <button
                      onClick={() => setShowEdit(true)}
                      className="post-card__action-btn btn--warn-text"
                    >
                      <FiEdit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="post-card__action-btn btn--danger-text"
                    >
                      <FiTrash2 size={16} />{" "}
                      {deleting ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </article>

            {/* Comments */}
            <div className="comment-wrapper">
              <CommentSection postId={postId} />
            </div>
          </>
        )}
      </main>

      {showEdit && post && (
        <CreatePostModal
          existingPost={post}
          onClose={() => setShowEdit(false)}
          onSuccess={() => {
            setShowEdit(false);
            navigate("/feed");
          }}
        />
      )}
    </div>
  );
}
