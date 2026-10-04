import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NewspaperIcon } from "@/components/icons/newspaper";
import { ThemeToggle } from "@/components/themetoggle";
import { APP_NAME } from "@/lib/brand";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex h-14 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Logo className="size-7" />
          <span className="text-sm sm:text-base">{APP_NAME}</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16 text-center">
        {/* 4 [newspaper] 4 */}
        <div
          className="flex items-center justify-center gap-1 text-8xl font-semibold tracking-tighter sm:gap-3 sm:text-9xl"
          aria-label="404"
        >
          <span aria-hidden>4</span>
          <NewspaperIcon size="0.85em" className="text-[1em] leading-none" />
          <span aria-hidden>4</span>
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
        <p className="mt-2 max-w-sm text-balance text-muted-foreground">
          This page doesn&apos;t exist or has been moved. Check the link, or head back to the blogs.
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/blogs">Browse blogs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}