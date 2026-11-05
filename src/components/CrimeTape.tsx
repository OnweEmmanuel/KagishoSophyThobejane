import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';

const TAPE_A = ['Legal notice', 'Attorney at work', 'Do not cross'];
const TAPE_B = ['Evidence', 'Exhibit A', 'Case no. KST/2026', 'Handle with care'];

function Tape({ words, variant }: { words: string[]; variant: 'a' | 'b' }) {
  const run = Array.from({ length: 6 }, () => words).flat();
  return (
    <div className={`ctape ctape--${variant}`}>
      <div className="ctape__inner">
        {run.map((w, i) => (
          <span key={i}>
            {w}
            <b aria-hidden="true">§</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function Marker({ label, tone }: { label: string; tone: 'scarlet' | 'stone' }) {
  return (
    <svg className={`marker marker--${tone}`} viewBox="0 0 64 60" aria-hidden="true">
      <path className="marker__side" d="M40 8h6l16 46h-6z" />
      <path className="marker__face" d="M4 54 22 8h18l16 46z" />
      <text x="30" y="42" textAnchor="middle">
        {label}
      </text>
    </svg>
  );
}

/** Crossed "crime-scene" tapes with evidence markers: pulled taut when they scroll into view. */
export function CrimeTape() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } });
        tl.from('.ctape--b', { scaleX: 0, transformOrigin: 'right center', duration: 0.7, ease: 'power4.out' })
          .from('.ctape--a', { scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power4.out' }, '-=0.45')
          .from('.ctape', { rotation: '+=4', duration: 1.4, ease: 'elastic.out(1, 0.3)' }, '-=0.35')
          .from('.marker', { y: -120, rotation: -25, autoAlpha: 0, duration: 0.9, ease: 'bounce.out', stagger: 0.18 }, '-=1.1');

        // tapes drift apart a little as you scroll (no looping)
        gsap.to('.ctape--a .ctape__inner', { xPercent: -6, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.to('.ctape--b .ctape__inner', { xPercent: 6, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: ref },
  );

  return (
    <div className="scene" ref={ref} aria-hidden="true">
      <Tape words={TAPE_B} variant="b" />
      <Tape words={TAPE_A} variant="a" />
      <div className="scene__markers">
        <Marker label="1" tone="scarlet" />
        <Marker label="A" tone="stone" />
      </div>
    </div>
  );
}
