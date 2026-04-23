import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";

const geist = Geist({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en">
      <Providers>
        <body >
          <div >
            {/* <AppbarClient /> */}
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
