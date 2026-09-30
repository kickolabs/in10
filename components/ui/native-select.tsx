import * as React from "react";
import { cn } from "@/lib/utils";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full appearance-none rounded-2xl border border-line bg-white px-3.5 text-sm text-foreground outline-none transition focus:border-brand-blue/50",
        className,
      )}
      {...props}
    />
  );
}

export { NativeSelect };
