// import { SidebarItem } from "../../components/SidebarItem";

// export default function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }){
//   return (
//     <div className="flex">
//         <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
//             <div>
//                 <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
//                 <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
//                 <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
//                 <SidebarItem href={"/p2p"} icon={<P2picon/>} title="P2P Transfer" />
//             </div>
//         </div>
//             {children}
//     </div>
//   );
// }

// // Icons Fetched from https://heroicons.com/
// function P2picon(){
//   return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
// </svg>

// }
// function HomeIcon() {
//     return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
//   <path fillRule="evenodd"strokeLinejoin="round" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
// </svg>

// }
// function TransferIcon() {
//     return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
//   </svg>
// }

// function TransactionsIcon() {
//     return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//   </svg>
  
// }import "@repo/ui/styles.css";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Geist } from "next/font/google";
// import { Providers } from "../../providers";
// import { AppbarClient } from "../../components/AppbarClient";

// const geist = Geist({ subsets: ["latin"] });


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
  
//           <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
//             {/* <AppbarClient /> */}
//             {children}
//           </div>
      
//   );
// }
import Path from "@/actions/link"
import { auth } from "@/auth"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { redirect } from "next/navigation"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if(!session){
    redirect("/register")
  }
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Paytm App
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage><Path></Path></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden overflow-y-auto gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
