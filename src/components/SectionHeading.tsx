import type { ReactNode } from 'react';

export function SectionHeading({ num, eyebrow, title, intro }: { num: number; eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  const n = String(num).padStart(2, '0');
  return (
    <header className="sh">
      <span className="sh__bignum" aria-hidden="true">
        {n}
      </span>
      <p className="sh__eyebrow reveal">
        <span className="sh__num">§ {n}</span>
        <span className="sh__rule" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="sh__title reveal">{title}</h2>
      {intro && <p className="sh__intro reveal">{intro}</p>}
    </header>
  );
}
