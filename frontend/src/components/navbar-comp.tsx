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

// Pass `backTo` on inner pages to show a Back button instead of the site name.
const Navbar = ({ backTo }: { backTo?: string }) => {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        {backTo ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(backTo)}
            className="-ml-2 cursor-pointer gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        ) : (
          <Link to="/blogs" className="text-lg font-semibold tracking-tight">
            The Note App
          </Link>
        )}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/publish")}
            className="cursor-pointer gap-2"
          >
            <PenLine className="size-4" />
            Write
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Account menu"
                className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
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