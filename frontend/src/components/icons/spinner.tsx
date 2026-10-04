import { cn } from "@/lib/utils";

const SPOKES = [
  { x1: 9, y1: 1.75, x2: 9, y2: 4.25, opacity: 1 },
  { x1: 14.127, y1: 3.873, x2: 12.359, y2: 5.641, opacity: 0.88 },
  { x1: 16.25, y1: 9, x2: 13.75, y2: 9, opacity: 0.75 },
  { x1: 14.127, y1: 14.127, x2: 12.359, y2: 12.359, opacity: 0.63 },
  { x1: 9, y1: 16.25, x2: 9, y2: 13.75, opacity: 0.5 },
  { x1: 3.873, y1: 14.127, x2: 5.641, y2: 12.359, opacity: 0.38 },
  { x1: 1.75, y1: 9, x2: 4.25, y2: 9, opacity: 0.25 },
  { x1: 3.873, y1: 3.873, x2: 5.641, y2: 5.641, opacity: 0.13 },
];

/** Uses currentColor, so it matches the button text in light and dark mode. */
export function Spinner({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      className={cn("animate-[spin_0.8s_steps(8,end)_infinite] motion-reduce:animate-none", className)}
    >
      {SPOKES.map((s, i) => (
        <line
          key={i}
          {...s}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}