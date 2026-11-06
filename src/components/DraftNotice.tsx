import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { DRAFT } from '../lib/config';
import { Icon } from './Icon';

/**
 * Notice shown only in the draft preview. It opens in full, folds into a small
 * pill once the visitor scrolls past the hero, and can be reopened from the pill.
 * Kept to the bottom-left so it never sits under Netlify's bottom-right badge.
 */
export function DraftNotice() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!DRAFT) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setOpen(false);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!DRAFT) return null;

  if (!open) {
    return (
      <button type="button" className="draft-pill" onClick={() => setOpen(true)} aria-label="Show draft preview notice">
        <span className="dot" /> Draft
      </button>
    );
  }

  return (
    <aside className="draft" role="note">
      <span className="draft__label">Draft preview</span>
      <span className="draft__text">
        Prepared for {profile.name}. Items shown like <span className="ph">this</span> are placeholders.
      </span>
      <span className="draft__short">
        <span className="ph">Dashed</span> items are placeholders.
      </span>
      <button type="button" className="draft__close" onClick={() => setOpen(false)} aria-label="Minimise draft notice">
        <Icon name="close" size={18} />
      </button>
    </aside>
  );
}
