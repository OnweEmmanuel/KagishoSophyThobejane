import { useRef } from 'react';
import { profile } from '../data/profile';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';

/** A large sentence that lights up word by word as you scroll; key phrases turn scarlet. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { text, highlight } = profile.statement;
  const hl = new Set(highlight.flatMap((p) => p.split(' ')));
  const words = text.split(' ');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.statement__w',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '.statement__text', start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
          },
        );
        gsap.from('.statement__quote', {
          scale: 0.4,
          rotation: -20,
          autoAlpha: 0,
          duration: 1,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section className="statement" ref={ref} aria-label="Statement">
      <div className="container">
        <span className="statement__quote" aria-hidden="true">
          “
        </span>
        <p className="statement__text">
          {words.map((w, i) => (
            <span key={i} className={`statement__w ${hl.has(w) ? 'is-hl' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </p>
        <p className="statement__by">
          <span /> In her words
        </p>
      </div>
    </section>
  );
}
