import { getServerSession } from "@/app/actions";
import dynamic from "next/dynamic";
import React from "react";

const AppSidebar = dynamic(() => import("@/components/AppSidebar"), {
  loading: () => <div>Loading sidebar...</div>,
});

export default async function AppSidebarWrapper() {
  const session = await getServerSession();
  return <AppSidebar session={session} />;
}
