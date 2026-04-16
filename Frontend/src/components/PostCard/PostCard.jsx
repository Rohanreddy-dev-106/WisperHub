import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiTrash2, FiEdit2 } from "react-icons/fi";
import { toggleLike } from "../../services/social.service";
import { deletePost } from "../../services/post.service";
import { useAuth } from "../../context/AuthContext";

export default function PostCard({ post, onDeleted, onEdit }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);
  const [loading, setLoading] = useState(false);

  // authorId might be populated as an object
  const authorObj = typeof post.authorId === "object" ? post.authorId : null;
  const authorIdStr = authorObj ? authorObj._id : post.authorId;

  // The logged-in user object has: _id, Uniqueid, Username, Avatar, etc.
  const isOwner =
    user && (user._id === authorIdStr || user.id === authorIdStr);

  const handleLike = async () => {
    try {
      setLiked((p) => !p);
      setLikeCount((c) => (liked ? c - 1 : c + 1));
      await toggleLike(post._id);
    } catch {
      setLiked((p) => !p);
      setLikeCount((c) => (liked ? c + 1 : c - 1));
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    setLoading(true);
    try {
      await deletePost(post._id);
      onDeleted?.(post._id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <article className="post-card">
      {/* Header */}
      <div className="post-card__header">
        <Link to={`/profile/${authorIdStr}`} className="post-card__author" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
        <span className="post-card__date">{formatDate(post.createdAt)}</span>
      </div>

      {/* Content — backend field is "text", not "content" */}
      <p className="post-card__content">{post.text}</p>

      {/* Actions */}
      <div className="post-card__actions">
        <button
          onClick={handleLike}
          className={`post-card__action-btn post-card__action-btn--like ${
            liked ? "post-card__action-btn--liked" : ""
          }`}
        >
          <FiHeart size={16} className={liked ? "fill-current" : ""} />
          <span>{likeCount}</span>
        </button>

        <Link
          to={`/post/${post._id}`}
          className="post-card__action-btn post-card__action-btn--comment"
        >
          <FiMessageCircle size={16} />
          <span>{post.commentCount ?? 0}</span>
        </Link>

        {isOwner && (
          <div className="post-card__owner-actions">
            <button
              onClick={() => onEdit?.(post)}
              className="post-card__action-btn btn--warn-text"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="post-card__action-btn btn--danger-text"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
