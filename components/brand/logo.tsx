import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  if (inverted) {
    return (
      <span className={cn("inline-flex rounded-2xl bg-white px-3 py-2.5", className)}>
        <Image
          src="/brand/logo-full.png"
          alt="IN10. International Internship, Training, Global Careers"
          width={823}
          height={486}
          className="h-auto w-52"
        />
      </span>
    );
  }

  return (
    <Image
      src="/brand/logo-mark.png"
      alt=""
      width={800}
      height={388}
      priority
      className={cn("h-11 w-auto shrink-0", className)}
    />
  );
}
