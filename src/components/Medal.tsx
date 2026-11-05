import type { Award } from '../data/profile';

/** Hanging medal; design varies by the award's kind. */
export function Medal({ kind }: { kind: Award['kind'] }) {
  return (
    <svg className={`medal medal--${kind}`} viewBox="0 0 64 88" aria-hidden="true">
      <path className="medal__ribbon medal__ribbon--l" d="M14 0h14l10 34-11 4z" />
      <path className="medal__ribbon medal__ribbon--r" d="M36 0h14L37 38l-11-4z" />
      <circle className="medal__disc" cx="32" cy="58" r="25" />
      <circle className="medal__ring" cx="32" cy="58" r="19.5" />
      {kind === 'first' && (
        <text className="medal__text" x="32" y="59" textAnchor="middle" dominantBaseline="central">
          1
        </text>
      )}
      {kind === 'top3' && (
        <text className="medal__text" x="32" y="59" textAnchor="middle" dominantBaseline="central">
          3
        </text>
      )}
      {kind === 'scholarship' && (
        <g className="medal__icon" transform="translate(20 46)">
          <path d="M0 8l12-6 12 6-12 6z" />
          <path d="M5 10.5v6c4 2.5 10 2.5 14 0v-6" />
          <path d="M24 8v6" />
        </g>
      )}
      {kind === 'leadership' && (
        <path className="medal__icon" d="M32 45l3.8 7.8 8.5 1.2-6.2 6 1.5 8.5L32 64.5l-7.6 4 1.5-8.5-6.2-6 8.5-1.2z" />
      )}
    </svg>
  );
}
