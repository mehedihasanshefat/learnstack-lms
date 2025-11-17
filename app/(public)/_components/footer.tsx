import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Footer({ className }: { className?: string }) {
  return (
    <footer>
      <div className={cn("", className)}></div>
    </footer>
  );
}

export default Footer;
