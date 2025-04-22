import { getServerSession } from "@/app/actions";
import React from "react";
import AppSidebar from "./AppSidebar";

export default async function AppSidebarWrapper() {
  const session = await getServerSession();
  return <AppSidebar session={session} />;
}
