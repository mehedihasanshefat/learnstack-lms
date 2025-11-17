import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Header({ className }: { className?: string }) {
  return (
    <header>
      <nav className={cn("", className)}></nav>
    </header>
  );
}

export default Header;
