import { useRef } from 'react';
import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
import { T } from '../components/Text';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/gsap';

const PHASES: Record<number, string> = { 0: 'Foundations', 2: 'Legal training', 5: 'Admission', 6: 'Practice' };

export function Path() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>('.path__step');
      // Mark steps as reached when the progress line passes them (works with or without motion).
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          onEnter: () => step.classList.add('is-reached'),
          onLeaveBack: () => step.classList.remove('is-reached'),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.path__progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.path__list', start: 'top 62%', end: 'bottom 62%', scrub: 0.4 },
          },
        );
        gsap.fromTo(
          '.path__head',
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: { trigger: '.path__list', start: 'top 62%', end: 'bottom 62%', scrub: 0.4 },
          },
        );
        steps.forEach((step) => {
          gsap.from(step.querySelector('.path__card'), {
            x: step.classList.contains('is-right') ? 40 : -40,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 80%', once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section className="section section--alt" id="path" ref={ref}>
      <div className="container">
        <SectionHeading
          num={3}
          eyebrow="The path to admission"
          title={<>From communication <em>to counsel</em></>}
          intro="A route that began in media and persuasion, ran through the law faculty and articles of clerkship, and arrived at the High Court roll."
        />

        <ol className="path__list">
          <span className="path__track" aria-hidden="true">
            <span className="path__progress" />
            <span className="path__head" />
          </span>
          {profile.path.map((s, i) => (
            <li key={s.label} className={`path__step ${i % 2 ? 'is-right' : 'is-left'} ${s.milestone ? 'is-milestone' : ''}`}>
              {PHASES[i] && <span className="path__phase">{PHASES[i]}</span>}
              <span className="path__node" aria-hidden="true">
                <Icon name={s.icon} size={22} />
              </span>
              <div className="path__card">
                <span className="path__when">
                  <T v={s.when} />
                </span>
                <h3>{s.label}</h3>
                <p>{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
