import { useState } from 'react';
import { profile } from '../data/profile';
import { DRAFT } from '../lib/config';
import { Icon } from './Icon';

/** Small floating notice shown only in the draft preview. */
export function DraftNotice() {
  const [hidden, setHidden] = useState(false);
  if (!DRAFT || hidden) return null;
  return (
    <aside className="draft" role="note">
      <span className="draft__label">Draft preview</span>
      <span className="draft__text">
        Prepared for {profile.name}. Items shown like <span className="ph">this</span> are placeholders.
      </span>
      <span className="draft__short">
        <span className="ph">Dashed</span> items are placeholders.
      </span>
      <button type="button" onClick={() => setHidden(true)} aria-label="Dismiss draft notice">
        <Icon name="close" size={16} />
      </button>
    </aside>
  );
}
