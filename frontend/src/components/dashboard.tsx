import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LogOut, Menu, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/themetoggle";
import { APP_NAME, BRAND_COLOR } from "@/lib/brand";

const ITEMS = [{ label: "All blogs" }, { label: "My blogs" }, { label: "New post" }];
const ROUTES = ["/blogs", "/blogs?view=mine", "/publish"];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const active = pathname === "/publish" ? 2 : pathname === "/blogs" && params.get("view") === "mine" ? 1 : 0;

  function go(index: number) {
    navigate(ROUTES[index]);
    onNavigate?.();
  }

  function signOut() {
    localStorage.removeItem("token");
    onNavigate?.();
    navigate("/signin");
  }

  return (
    <div className="flex h-full flex-col">
      <Link to="/blogs" onClick={onNavigate} className="flex items-center gap-2 px-4 py-4 font-semibold">
        <Logo className="size-7" />
        {APP_NAME}
      </Link>

      <div className="flex-1 px-4 pt-2">
        <HookSidebar  label="Workspace" items={ITEMS} value={active} onChange={go} color={BRAND_COLOR} />
      </div>

      <div className="flex items-center justify-between gap-1 border-t p-3">
        <Button variant="ghost" className="justify-start gap-3 cursor-pointer text-muted-foreground" onClick={signOut}>
          <LogOut className="size-4" />
          Sign out
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <Link to="/blogs" className="flex items-center gap-2 font-semibold">
          <Logo className="size-6" />
          <span className="text-sm">{APP_NAME}</span>
        </Link>

        <div className="flex items-center">
          <ThemeToggle />
          <Button asChild size="icon" variant="ghost" aria-label="New post">
            <Link to="/publish">
              <PenSquare className="size-5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col lg:min-h-dvh lg:pl-64">{children}</main>
    </div>
  );
}

export default DashboardLayout;