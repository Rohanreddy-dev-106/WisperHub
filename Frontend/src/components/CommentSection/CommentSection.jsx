import { useState, useEffect } from "react";
import {
  getComments,
  createComment,
  deleteComment,
} from "../../services/comment.service";
import { useAuth } from "../../context/AuthContext";
import { FiSend, FiTrash2 } from "react-icons/fi";

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getComments(postId)
      .then((res) => {
        // Backend returns { success, data: comments[] }
        setComments(res.data?.data || []);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      // Backend expects { postId, comment } — NOT { postId, content }
      await createComment({ postId, comment: text.trim() });
      // Backend returns { data: { commentCount } } — not the comment object
      // So we re-fetch to get updated comments
      const res = await getComments(postId);
      setComments(res.data?.data || []);
      setText("");
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      // Backend expects postId in body for decrement
      await deleteComment(commentId, postId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch {
      /* silent */
    }
  };

  return (
    <section className="comments">
      <h3 className="comments__title">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="comments__form">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment (5-50 chars)…"
            minLength={5}
            maxLength={50}
            className="form-input form-input--rounded"
          />
          <button
            type="submit"
            disabled={loading || text.trim().length < 5}
            className="btn btn--primary btn--icon"
          >
            <FiSend size={16} />
          </button>
        </form>
      )}

      {fetching ? (
        <p className="comments__empty">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="comments__empty">No comments yet. Be the first!</p>
      ) : (
        <ul className="comments__list">
          {comments.map((c) => {
            const authorObj = typeof c.Auther === "object" ? c.Auther : null;
            const authorIdStr = authorObj ? authorObj._id : c.Auther;
            const isOwner = user && (user._id === authorIdStr || user.id === authorIdStr);

            return (
            <li key={c._id} className="comment-item">
              <div className="comment-item__body">
                <span className="comment-item__author" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {authorObj?.Avatar && <span style={{fontSize:'1rem'}}>{authorObj.Avatar}</span>}
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
                </span>
                {/* Backend field is "Comment", not "content" */}
                <p className="comment-item__text">{c.Comment}</p>
              </div>
              {/* Ownership check */}
              {isOwner && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="comment-item__delete"
                  >
                    <FiTrash2 size={14} />
                  </button>
              )}
            </li>
          )})}
        </ul>
      )}
    </section>
  );
}
