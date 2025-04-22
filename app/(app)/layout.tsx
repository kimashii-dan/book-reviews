import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarWrapper from "@/components/AppSidebarWrapper";
import { Suspense } from "react";
import SkeletonSidebar from "@/components/loadingUI/SkeletonSidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<SkeletonSidebar />}>
        <AppSidebarWrapper />
      </Suspense>

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
