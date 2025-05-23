import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(" animate-pulse rounded-md bg-[#272b35]", className)}
      {...props}
    />
  );
}

export { Skeleton };
