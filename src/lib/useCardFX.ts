import { useEffect, type RefObject } from 'react';
import { gsap } from './gsap';

/**
 * Pointer effects for cards:
 *  .spot  a soft light follows the cursor (CSS reads --mx / --my)
 *  .tilt  the card tilts toward the cursor in 3D
 * Only on devices with a real hover pointer, and never with reduced motion.
 */
export function useCardFX(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      if (motionOK && card.classList.contains('tilt')) {
        gsap.to(card, {
          rotationY: ((x / r.width) - 0.5) * 10,
          rotationX: -((y / r.height) - 0.5) * 10,
          transformPerspective: 900,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };
    const onLeave = (e: PointerEvent) => {
      const card = e.target as HTMLElement;
      if (card.classList?.contains('tilt')) {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
      }
    };

    root.addEventListener('pointermove', onMove);
    const tilts = root.querySelectorAll<HTMLElement>('.tilt');
    tilts.forEach((t) => t.addEventListener('pointerleave', onLeave));
    return () => {
      root.removeEventListener('pointermove', onMove);
      tilts.forEach((t) => t.removeEventListener('pointerleave', onLeave));
    };
  }, [scope]);
}
