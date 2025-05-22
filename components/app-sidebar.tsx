"use client"

import * as React from "react"
import { Cpu, Settings, BookOpen, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const mainNavItems = [
  {
    title: "Algorithms",
    icon: Cpu,
    items: [
      { title: "First Come First Serve", href: "/" },
      { title: "Shortest Job First", href: "/algorithms/sjf" },
      { title: "Round Robin", href: "/algorithms/rr" },
      { title: "Shortest Remaining Time First", href: "/algorithms/srtf" },
    ],
  },
  // {
  //   title: "Resources",
  //   icon: BookOpen,
  //   items: [
  //     { title: "Documentation", href: "/docs" },
  //     { title: "Examples", href: "/examples" },
  //   ],
  // },
  {
    title: "More",
    icon: Settings,
    items: [
      { title: "About", href: "/about" },
      { title: "Source Code", href: "https://github.com/sahaj162" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar 
      variant="floating" 
      className="mt-16 h-[calc(100vh-4rem)] overflow-hidden" 
      {...props}
    >
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {mainNavItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <section.icon className="h-4 w-4" />
                {section.title}
              </div>
            </SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
} 