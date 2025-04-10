import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Session } from "../types";
import { getServerSession } from "../actions";
import dynamic from "next/dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession();

  const AppSidebar = dynamic(() => import("@/components/AppSidebar"), {
    loading: () => <div>Loading sidebar...</div>,
  });

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
