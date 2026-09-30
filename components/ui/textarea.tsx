import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-2xl border border-line bg-white px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-blue/50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
