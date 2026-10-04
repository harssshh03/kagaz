import { NewspaperIcon } from "@/components/icons/newspaper";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
      <div
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-lg bg-(--ink) text-white shadow-sm [--ink:#18181b] dark:[--ink:#2a2a2e]",
        className,
      )}
    >
      {/* white paper, printed in the tile's own color */}
      <NewspaperIcon size="100%" className="size-[68%]" ink="var(--ink)" />
    </div>
  );
}