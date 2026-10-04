import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, PenLine, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Pass `backTo` on inner pages to show a Back button instead of the site name.
const Navbar = ({ backTo }: { backTo?: string }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function signOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-20 bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
     
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="-ml-2 cursor-pointer gap-2 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => navigate("/publish")}
            className="cursor-pointer gap-2 rounded-full px-4"
          >
            <PenLine className="size-4" />
            Write
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Account menu"
                className="cursor-pointer rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="size-8">
                  <AvatarFallback>
                    <User className="size-4" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={signOut} className="cursor-pointer gap-2">
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;