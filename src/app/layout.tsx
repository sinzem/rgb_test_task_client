import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { Message } from "@/components/message/Message";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RGB | Test Task",
  description: "Test task on Full Stack developer in RGB-company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-[100vh]`}
      >
        <NavigationMenu className="py-5 px-10">
          <NavigationMenuList>
            <NavigationMenuItem >
              <NavigationMenuLink asChild  >
                <Link className="px-6 border border-gray-300 rounded-sm" href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link  className="px-6 border border-gray-300 rounded-sm" href="/clients">Clients</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link  className="px-6 border border-gray-300 rounded-sm" href="/deals">Deals</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {children}
        <Loader />
        <Message />
      </body>
    </html>
  );
}
