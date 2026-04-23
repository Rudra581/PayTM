"use client";

import { usePathname } from "next/navigation";

export default function Path() {
  let pathname = usePathname();
    if(pathname == "/dashboard"){
        pathname = "Dashboard"
    }
      if(pathname == "/p2p"){
        pathname = "P2P"
    }
      if(pathname == "/transactions"){
        pathname = "Transactions"
    }
      if(pathname == "/transfer"){
        pathname = "Transfer"
    }


  return <span>{pathname}</span>;
}
