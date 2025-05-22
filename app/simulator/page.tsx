"use client";

import MainForm from "@/components/MainForm";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import HyperText from "@/components/ui/hyper-text";
import Particles from "@/components/ui/particles";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
            <main className="flex flex-col justify-center items-center p-4 md:p-5">
              <div className="w-full flex justify-center pb-5">
                <HyperText
                  className="md:text-4xl text-2xl text-center font-bold text-black dark:text-white"
                  text="Scheduling Algorithm Simulator"
                />
              </div>

              <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
              />
              <MainForm />
            </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
