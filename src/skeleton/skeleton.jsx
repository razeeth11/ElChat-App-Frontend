import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <Skeleton className="h-6 w-8 rounded-none" />
      <Skeleton className="h-4 w-15" />
      <Skeleton className="h-4 w-15" />
    </div>
  );
}
