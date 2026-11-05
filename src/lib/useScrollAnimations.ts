import type { RefObject } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from './gsap';

/**
 * Site-wide scroll animations, driven by class/data hooks in the markup:
 *  .reveal         fade + rise when scrolled into view
 *  [data-stagger]  children reveal one after another
 *  .draw svg       stroke icons are line-drawn
 *  [data-count]    numbers count up
 * With reduced motion, nothing runs and everything is simply visible.
 */
export function useScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
          gsap.from(group.children, {
            y: 32,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          });
        });

        gsap.utils.toArray<SVGElement>('.draw svg, svg.draw').forEach((svg) => {
          gsap.from(svg.querySelectorAll('path, circle, rect, ellipse'), {
            drawSVG: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            stagger: 0.05,
            scrollTrigger: { trigger: svg, start: 'top 90%', once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      });

      // Fonts change layout height: re-measure trigger positions once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope },
  );
}
