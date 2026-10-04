import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface NewspaperIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NewspaperIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  /** Fill the sheets with the current text color. Default: true */
  filled?: boolean;
  /** Any CSS color. When set, the sheet is solid paper and the print (square + lines) is drawn in this color. */
  ink?: string;
}

const SQUARE_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [0, 1],
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const CREATE_LINE_VARIANTS = (delay: number): Variants => ({
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.2,
      delay,
      ease: "easeOut",
      opacity: { duration: 0.1, delay },
    },
  },
});

const NewspaperIcon = forwardRef<NewspaperIconHandle, NewspaperIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, filled = true, ink, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    const inkStyle = ink ? { stroke: ink } : undefined;

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {filled && (
            <>
              {/* front sheet */}
              <path
                d="M3 4.875C3 4.254 3.504 3.75 4.125 3.75h11.25c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V4.875Z"
                className={ink ? "fill-current" : "fill-current/20 dark:fill-current/30"}
                stroke="none"
              />
              {/* folded back sheet */}
              <path
                d="M16.5 7.5h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25A2.25 2.25 0 0 1 16.5 18V7.5Z"
                className={ink ? "fill-current/55" : "fill-current/40 dark:fill-current/55"}
                stroke="none"
              />
            </>
          )}

          <path d="M16.5 7.5h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />

          <motion.path
            animate={controls}
            d="M6 7.5h3v3H6v-3Z"
            fill={filled ? "currentColor" : "none"}
            initial="normal"
            style={ink ? { stroke: ink, fill: ink } : undefined}
            variants={SQUARE_VARIANTS}
          />
          <motion.path animate={controls} d="M12 7.5h1.5" initial="normal" style={inkStyle} variants={CREATE_LINE_VARIANTS(0.2)} />
          <motion.path animate={controls} d="M12 10.5h1.5" initial="normal" style={inkStyle} variants={CREATE_LINE_VARIANTS(0.3)} />
          <motion.path animate={controls} d="M6 13.5h7.5" initial="normal" style={inkStyle} variants={CREATE_LINE_VARIANTS(0.4)} />
          <motion.path animate={controls} d="M6 16.5h7.5" initial="normal" style={inkStyle} variants={CREATE_LINE_VARIANTS(0.5)} />
        </svg>
      </div>
    );
  },
);

NewspaperIcon.displayName = "NewspaperIcon";

export { NewspaperIcon };