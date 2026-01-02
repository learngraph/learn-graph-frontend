export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">LearnGraph</span>
          <span className="footer-meta">© {new Date().getFullYear()}</span>
        </div>

        <div className="footer-right">
          <a href="/imprint">Imprint</a>
          <a href="/privacy">Privacy</a>
          <a href="https://github.com/learngraph" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
