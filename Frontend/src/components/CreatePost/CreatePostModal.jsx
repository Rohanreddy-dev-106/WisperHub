import { useState } from "react";
import { createPost, updatePost } from "../../services/post.service";
import { FiX } from "react-icons/fi";

export default function CreatePostModal({ onClose, onSuccess, existingPost }) {
  // Backend field is "text", not "content"
  const [text, setText] = useState(existingPost?.text ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!existingPost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Text is required");
      return;
    }
    if (text.length > 280) {
      setError("Maximum 280 characters allowed");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Backend expects JSON { text } — NOT FormData
      const payload = { text: text.trim() };

      const res = isEdit
        ? await updatePost(existingPost._id, payload)
        : await createPost(payload);

      onSuccess?.(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-box__header">
          <h2 className="modal-box__title">
            {isEdit ? "Edit Post" : "New Wisper"}
          </h2>
          <button onClick={onClose} className="modal-box__close">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind? (max 280 chars)"
            rows={4}
            maxLength={280}
            className="form-textarea"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color:
                  text.length > 260
                    ? "var(--red-400)"
                    : "var(--neutral-500)",
              }}
            >
              {text.length}/280
            </span>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-form__footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--outline btn--sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? "Posting…" : isEdit ? "Update" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
