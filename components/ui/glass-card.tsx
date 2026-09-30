import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/70 bg-white/75 shadow-[0_24px_70px_-36px_rgba(12,27,77,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
