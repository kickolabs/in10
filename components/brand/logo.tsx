import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="IN10"
      width={800}
      height={388}
      priority={!inverted}
      className={cn(inverted ? "h-12 w-auto" : "h-11 w-auto shrink-0", className)}
    />
  );
}
