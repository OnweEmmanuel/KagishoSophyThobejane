import { useId } from 'react';

/** Scalloped wax-seal outline, generated once. */
const SCALLOP = (() => {
  const pts: string[] = [];
  const n = 240;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 92 + 4.5 * Math.cos(t * 22) + 1.2 * Math.sin(t * 7);
    pts.push(`${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join(' L')}Z`;
})();

interface SealProps {
  monogram: string;
  ring?: string;
  className?: string;
  /** Flat = small UI use (nav, favicon-like), no ring text. */
  flat?: boolean;
  title?: string;
}

export function Seal({ monogram, ring = 'ADMITTED ATTORNEY ✦ HIGH COURT OF SOUTH AFRICA ✦ ', className = '', flat = false, title }: SealProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg className={`seal ${className}`} viewBox="0 0 200 200" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <radialGradient id={`wax${id}`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#F2575A" />
          <stop offset="55%" stopColor="#EB2F33" />
          <stop offset="100%" stopColor="#A9181C" />
        </radialGradient>
        <path id={`ring${id}`} d="M100 100 m-64 0 a64 64 0 1 1 128 0 a64 64 0 1 1 -128 0" />
      </defs>
      <path d={SCALLOP} fill={`url(#wax${id})`} />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#7E1014" strokeOpacity=".35" strokeWidth="3" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="#FFE3E0" strokeOpacity=".35" strokeWidth="1" />
      {!flat && (
        <>
          <circle cx="100" cy="100" r="50" fill="none" stroke="#FFE3E0" strokeOpacity=".45" strokeWidth="1" />
          <text className="seal__ring" fill="#FFF1EE" fillOpacity=".9" fontSize="11.5" letterSpacing="1.5">
            <textPath href={`#ring${id}`} textLength="398" lengthAdjust="spacing">
              {ring}
            </textPath>
          </text>
        </>
      )}
      <text
        x="100"
        y="101"
        textAnchor="middle"
        dominantBaseline="central"
        className="seal__mono"
        fill="#FFF6F4"
        fontSize={flat ? 64 : 40}
      >
        {monogram}
      </text>
    </svg>
  );
}
