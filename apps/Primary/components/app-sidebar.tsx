"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  icons,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  ArrowDownRight,
  ArrowUpRight,Download,History
  
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { title } from "process"
import { useSession } from "next-auth/react"

const data = {
  user: {
    name: "Rudra",
    email: "m@example.com",
    avatar: ""
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Wallet",
          url: "/dashboard",
        },
        {
          title: "This Month",
          url: "/dashboard",
        },
        {
          title: "Pending",
          url: "/dashboard",
        },
      ],
    },
    {
      title: " Transactions",
      url: "/transactions",
      icon: History,
      items: [
        {
          title: "History",
          url: "/transactions",
        },
       
      ],
    },
    {
      title: "Transfer",
      url: "/transfer",
      icon: ArrowDownRight,
      items: [
        {
          title: "Add Money",
          url: "/transfer",
        },
        {
          title: "Balance",
          url: "/transfer",
        },
        {
          title: "Recent",
          url: "/transfer",
        },
       
      ],
    },
    {
      title: "P2P Transaction",
      url: "/p2p",
      icon: ArrowUpRight,
     
    }, 
    { title: "My Requests",
      url: "/requests",
      icon : Download
    },
      {
      title: "Service",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Electricity Bill",
          url: "#",
        },
        {
          title: "Mobile Recharge",
          url: "#",
        },
        {
          title: "DTH Recharge",
          url: "#",
        },
        {
          title: "FasTag Recharge",
          url: "#",
        },
      ],
    },
  
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const userEmail = session.data?.user?.email;
const a = {
  name: session.data?.user?.name || "",
    email: session.data?.user?.email || "",
    avatar: `${session.data?.user?.name}`|| ""
}
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">PayTM</span>
                  <span className="truncate text-xs">Clone</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={a} />
      </SidebarFooter>
    </Sidebar>
  )
}
