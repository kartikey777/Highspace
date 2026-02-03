import './Footer.css';

const PHONE = '+91 9529087305';
const EMAIL = 'contact@highspacefurniture.com';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">© Highspace Furniture</div>
        <div className="footer__contact">
          <a href={`mailto:${EMAIL}`} className="footer__link">Email: {EMAIL}</a>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="footer__link">Mobile: {PHONE}</a>
        </div>
      </div>
    </footer>
  );
}
