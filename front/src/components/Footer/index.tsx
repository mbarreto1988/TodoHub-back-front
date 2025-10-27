export const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-container__text">
        © {new Date().getFullYear()} <span>TodoHub</span> — Hecho con ❤️ por
        Mati
      </p>
      <div className="footer-container__links">
        <a href="https://github.com/mbarreto1988/TodoHub-back-front" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/matias-gabriel-barreto-061685108/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
