import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppSidebarSkeleton() {
  return (
    <Sidebar className="text-white border-black">
      <SidebarHeader className="bg-[#161b22] p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#161b22] p-4 flex flex-col gap-6">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-5 w-1/3 rounded" />
          </SidebarGroupLabel>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-5 w-1/3 rounded" />
          </SidebarGroupLabel>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#161b22] p-4">
        <Skeleton className="h-10 w-full rounded" />
      </SidebarFooter>
    </Sidebar>
  );
}
