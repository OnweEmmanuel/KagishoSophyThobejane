import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { Seal } from './Seal';
import { Icon } from './Icon';

const LINKS = [
  ['about', 'About'],
  ['focus', 'Focus'],
  ['path', 'Path'],
  ['experience', 'Experience'],
  ['credentials', 'Credentials'],
  ['skills', 'Skills'],
  ['honours', 'Honours'],
  ['service', 'Pro bono'],
  ['contact', 'Contact'],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
          <Seal monogram={profile.monogram} flat className="nav__seal" />
          <span>
            {profile.firstName} <span className="nav__brand-rest">Thobejane</span>
          </span>
        </a>
        <nav aria-label="Sections">
          <ul className="nav__links" id="nav-links">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="nav__toggle" type="button" aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
