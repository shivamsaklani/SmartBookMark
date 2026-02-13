"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Appsidebar";
import { Toaster } from "react-hot-toast";
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
      <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1">{children}</main>
            </div>
          </SidebarProvider>
        <Toaster />
      </TooltipProvider>
  );
}