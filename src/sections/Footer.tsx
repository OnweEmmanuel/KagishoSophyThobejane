import { profile } from '../data/profile';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark" aria-hidden="true">
        {profile.firstName}
        <span>.</span>
      </p>
      <div className="container footer__inner">
        <p>
          © {YEAR} {profile.name} · {profile.title}
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
