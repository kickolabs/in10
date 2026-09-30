import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-line bg-white px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-blue/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
