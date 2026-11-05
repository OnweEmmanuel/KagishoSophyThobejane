import { isPlaceholder, type Text } from '../data/profile';

/** Renders content, or a clearly marked placeholder chip for unknown details. */
export function T({ v }: { v: Text }) {
  if (isPlaceholder(v)) {
    return (
      <span className="ph" title="Placeholder: to be confirmed">
        {v.placeholder}
      </span>
    );
  }
  return <>{v}</>;
}
