import { useRef, type PointerEvent } from 'react';
import { profile } from '../data/profile';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import { ScalesArt } from '../components/ScalesArt';
import { Courthouse } from '../components/Courthouse';
import { Seal } from '../components/Seal';
import { Icon } from '../components/Icon';

const BEAM_ARM = 130; // distance from pivot to each pan's hook, in SVG units

const GLYPHS = [
  { ch: '§', x: 8, y: 18, s: 3.2 },
  { ch: '¶', x: 46, y: 82, s: 2.4 },
  { ch: '§', x: 88, y: 70, s: 4.4 },
  { ch: '¶', x: 64, y: 12, s: 2 },
  { ch: '§', x: 30, y: 55, s: 1.6 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { a: -10 };
        const apply = () => {
          const d = BEAM_ARM * Math.sin((state.a * Math.PI) / 180);
          gsap.set('.scales__beam', { rotation: state.a, svgOrigin: '200 112' });
          gsap.set('.scales__pan--l', { y: -d });
          gsap.set('.scales__pan--r', { y: d });
        };
        apply();

        // courthouse facade sketches itself in behind everything
        gsap.from('.courthouse path, .courthouse circle', { drawSVG: 0, duration: 2.4, stagger: 0.012, ease: 'power1.inOut' });
        gsap.from('.courthouse__frieze', { autoAlpha: 0, duration: 1.2, delay: 1.8 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero__eyebrow', { y: 16, autoAlpha: 0, duration: 0.6 })
          .from('.hero__name .word', { yPercent: 115, rotation: 4, duration: 1.1, stagger: 0.09 }, '-=0.25')
          .from('.hero__underline path', { drawSVG: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.4')
          .from('.hero__lead > *', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.09 }, '-=0.6')
          .from('.scales .stroke', { drawSVG: 0, duration: 1.5, stagger: 0.03, ease: 'power2.inOut' }, 0.2)
          .from('.scales .fill-in', { autoAlpha: 0, duration: 0.7 }, '-=0.5')
          .to(state, { a: 0, duration: 2.6, ease: 'elastic.out(1, 0.28)', onUpdate: apply }, '-=0.6')
          .from('.hero__seal', { scale: 2.6, autoAlpha: 0, rotation: -30, duration: 0.5, ease: 'power4.in' }, '-=2.1')
          .fromTo('.hero__seal-ring', { scale: 0.7, autoAlpha: 0.8 }, { scale: 1.8, autoAlpha: 0, duration: 0.9, ease: 'power2.out' }, '<0.45')
          .fromTo('.hero__flash', { autoAlpha: 0.35 }, { autoAlpha: 0, duration: 0.6 }, '<')
          .add(() => {
            gsap.to(state, { a: 1.4, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate: apply });
          });

        // "Focused on …" word rotator
        // The strip holds every word plus a repeat of the first, so the loop is seamless.
        const slots = profile.focusWords.length + 1;
        const rot = gsap.timeline({ repeat: -1, delay: 3 });
        for (let i = 1; i < slots; i++) {
          rot.to('.rotator__stack', { yPercent: (-100 * i) / slots, duration: 0.7, ease: 'expo.inOut' }, '+=1.8');
        }
        rot.set('.rotator__stack', { yPercent: 0 });

        // drifting legal glyphs
        gsap.utils.toArray<HTMLElement>('.hero__glyph').forEach((g, i) => {
          gsap.to(g, { y: i % 2 ? 30 : -30, rotation: i % 2 ? 8 : -8, duration: 6 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });

        // the art leans gently away as you scroll past
        gsap.to('.courthouse', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hero__art', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
      });
    },
    { scope: ref },
  );

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--hx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--hy', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const [first, middle, last] = profile.name.split(' ');

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onPointerMove}>
      <div className="hero__bg" aria-hidden="true">
        <Courthouse />
        <span className="hero__glow" />
        {GLYPHS.map((g, i) => (
          <span key={i} className="hero__glyph" style={{ left: `${g.x}%`, top: `${g.y}%`, fontSize: `${g.s}rem` }}>
            {g.ch}
          </span>
        ))}
        <span className="hero__flash" />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="dot" /> Curriculum Vitae · {profile.location.split(',')[0]}
          </p>
          <h1 className="hero__name">
            <span className="line">
              <span className="word">{first}</span> <span className="word">{middle}</span>
            </span>
            <span className="line line--last">
              <span className="word accent">{last}</span>
              <svg className="hero__underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 14C60 6 140 4 296 10" />
              </svg>
            </span>
          </h1>
          <div className="hero__lead">
            <p className="hero__title">{profile.title}</p>
            <p className="hero__focus">
              <span className="hero__focus-label">Focused on</span>
              <span className="sr-only">{profile.focusWords.join(', ')}</span>
              <span className="rotator">
                <span className="rotator__stack" aria-hidden="true">
                  {[...profile.focusWords, profile.focusWords[0]].map((w, i) => (
                    <span key={i} className="rotator__word">
                      {w}.
                    </span>
                  ))}
                </span>
              </span>
            </p>
            <ul className="hero__creds" aria-label="Credentials">
              {profile.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="hero__actions">
              <a className="btn btn--scarlet" href="#experience">
                View the record <Icon name="arrow-down" size={18} />
              </a>
              <a className="btn btn--ghost" href="#contact">
                Request a consultation
              </a>
            </div>
          </div>
        </div>

        <div className="hero__art">
          <ScalesArt />
          <div className="hero__seal-wrap">
            <span className="hero__seal-ring" aria-hidden="true" />
            <Seal className="hero__seal" monogram={profile.monogram} title={`${profile.name} seal`} />
          </div>
          <p className="hero__art-caption">
            <em>Law</em> &amp; <em>tax</em>, in balance.
          </p>
        </div>
      </div>
    </section>
  );
}
