import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarWrapper from "@/components/AppSidebarWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebarWrapper />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
