/** @format */

export default function ApiDocsPage() {
  return (
    <div style={styles.page}>
      <div style={styles.glow} />

      <div style={styles.card}>
        <span style={styles.badge}>API</span>

        <h1 style={styles.title}>WisperHub API</h1>
        <p style={styles.subtitle}>Official REST API Documentation</p>

        <div style={styles.divider} />

        <p style={styles.desc}>
          A privacy-first REST API powering anonymous conversations. Explore
          endpoints, authentication, and real-time interactions built for modern
          developers.
        </p>

        <a
          href='http://localhost:4506/api-doc-wisperhub'
          target='_blank'
          rel='noopener noreferrer'
          style={styles.button}>
          Open API Docs →
        </a>

        <p style={styles.footer}>© 2026 WisperHub • Built for developers</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f172a 0%, #000 45%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: "420px",
    height: "420px",
    background:
      "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
    top: "-120px",
    right: "-120px",
    filter: "blur(80px)",
  },

  card: {
    maxWidth: "540px",
    padding: "56px 52px",
    textAlign: "center",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.12)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
    backdropFilter: "blur(10px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.65)",
    position: "relative",
    zIndex: 1,
  },

  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "0.7rem",
    letterSpacing: "1px",
    background: "rgba(16,185,129,0.15)",
    color: "#34d399",
    border: "1px solid rgba(52,211,153,0.4)",
    marginBottom: "18px",
  },

  title: {
    fontSize: "2.4rem",
    fontWeight: 600,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: "0.95rem",
    opacity: 0.65,
    marginTop: "6px",
  },

  divider: {
    width: "80px",
    height: "1px",
    background: "linear-gradient(to right, transparent, #fff, transparent)",
    opacity: 0.25,
    margin: "30px auto",
  },

  desc: {
    fontSize: "0.98rem",
    lineHeight: 1.7,
    opacity: 0.85,
    marginBottom: "36px",
  },

  button: {
    display: "inline-block",
    padding: "14px 42px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    textDecoration: "none",
    fontSize: "0.95rem",
    letterSpacing: "0.4px",
    background:
      "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))",
    boxShadow: "0 10px 40px rgba(16,185,129,0.35)",
    transition: "all 0.25s ease",
  },

  footer: {
    marginTop: "48px",
    fontSize: "0.72rem",
    opacity: 0.45,
  },
};
