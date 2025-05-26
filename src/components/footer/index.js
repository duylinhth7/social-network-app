import "./Footer.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {currentYear} DuyLinh Inc. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Giới thiệu</a></li>
          <li><a href="#">Chính sách</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
