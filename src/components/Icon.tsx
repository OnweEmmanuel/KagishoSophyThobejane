import type { IconName } from '../data/profile';

type UiIcon = 'headset' | 'check' | 'star' | 'arrow-up-right' | 'arrow-down' | 'pin' | 'mail' | 'phone' | 'linkedin' | 'download' | 'menu' | 'close' | 'lock';

const PATHS: Record<IconName | UiIcon, string[]> = {
  scales: ['M12 4v16', 'M8 20h8', 'M4 7h16', 'M10.5 4h3', 'M4 7 1.5 13.5', 'M4 7l2.5 6.5', 'M1.5 13.5a2.5 2 0 0 0 5 0z', 'M20 7l-2.5 6.5', 'M20 7l2.5 6.5', 'M17.5 13.5a2.5 2 0 0 0 5 0z'],
  gavel: ['M9.5 7.5l5-5 6 6-5 5z', 'M12.5 10.5 4 19', 'M3 21h9'],
  scroll: ['M6 3h9l4 4v14H6z', 'M15 3v4h4', 'M9 11h7', 'M9 14h7', 'M9 17h4'],
  shield: ['M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z', 'M9 12l2 2 4-4'],
  magnifier: ['M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13z', 'M15.5 15.5 21 21', 'M8 10.5h5'],
  columns: ['M12 3 3 8h18z', 'M5 10v8', 'M9.5 10v8', 'M14.5 10v8', 'M19 10v8', 'M3 18h18', 'M2 21h20'],
  quill: ['M20 4C13 5 8 10 6 18', 'M20 4c-1 6-5 10-11 11', 'M4 20l2-2', 'M11 20h9'],
  megaphone: ['M3 10v4h3l7 4V6l-7 4z', 'M16 9a3 3 0 0 1 0 6', 'M6 14l1 5h2l-1-4.5'],
  cap: ['M2 9l10-5 10 5-10 5z', 'M6 11v5c3 2 9 2 12 0v-5', 'M22 9v5'],
  briefcase: ['M3 8h18v11H3z', 'M8 8V5h8v3', 'M3 13h18', 'M11 12h2v2h-2z'],
  ledger: ['M4 4h16v16H4z', 'M4 9h16', 'M9 9v11', 'M12 13h5', 'M12 16h5', 'M6 6.5h4'],
  globe: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M3 12h18', 'M12 3c3 3 3 15 0 18', 'M12 3c-3 3-3 15 0 18'],
  seal: ['M12 3a6 6 0 1 0 0 12a6 6 0 1 0 0-12z', 'M9 14l-2 7 5-3 5 3-2-7', 'M12 6.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z'],
  headset: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M4 14h3v6H5a1 1 0 0 1-1-1z', 'M20 14h-3v6h2a1 1 0 0 0 1-1z', 'M17 20c0 1.5-2 2-5 2'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
  'arrow-up-right': ['M7 17 17 7', 'M8 7h9v9'],
  'arrow-down': ['M12 4v16', 'M6 14l6 6 6-6'],
  pin: ['M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.5-6 11-6 11z', 'M12 8a2 2 0 1 0 0 4a2 2 0 1 0 0-4z'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'],
  linkedin: ['M4 4h16v16H4z', 'M8 10v6', 'M8 7.5v.01', 'M12 16v-6', 'M12 12.5a2.5 2.5 0 0 1 5 0V16'],
  download: ['M12 4v11', 'M7 10l5 5 5-5', 'M5 20h14'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h10'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  lock: ['M6 11h12v9H6z', 'M8.5 11V8a3.5 3.5 0 0 1 7 0v3'],
};

export type AnyIcon = keyof typeof PATHS;

export function Icon({ name, size = 24, className = '', strokeWidth = 1.5 }: { name: AnyIcon; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
