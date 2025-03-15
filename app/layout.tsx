"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  Navbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
  HeroUIProvider,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import Head from "next/head";
import "react-material-symbols/rounded";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <HeroUIProvider>
          {pathName.startsWith("/admin-area") ? null : <LayoutNavbar />}
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}

function LayoutNavbar() {
  const pathName = usePathname();
  const isMenuOpen = useState(false);

  return (
    <Navbar position="sticky">
      <NavbarContent>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand className="font-bold">
          <Link
            href="/"
            color={pathName == "/" ? "primary" : "foreground"}
            className="text-lg"
          >
            Sól Życia
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem isActive={pathName == "/o-nas"}>
          <Link
            color={pathName == "/o-nas" ? "primary" : "foreground"}
            href="/o-nas"
          >
            O NAS
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathName == "/off-road"}>
          <Link
            color={pathName == "/off-road" ? "primary" : "foreground"}
            href="/off-road"
          >
            OFF-ROAD
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathName == "/oferta"}>
          <Link
            color={pathName == "/oferta" ? "primary" : "foreground"}
            href="/oferta"
          >
            OFERTA
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathName == "/galeria"}>
          <Link
            color={pathName == "/galeria" ? "primary" : "foreground"}
            href="/galeria"
          >
            GALERIA
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathName == "/kontakt"}>
          <Link
            color={pathName == "/kontakt" ? "primary" : "foreground"}
            href="kontakt"
          >
            KONTAKT
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathName == "/o-nas"}>
          <Link
            color={pathName == "/o-nas" ? "primary" : "foreground"}
            href="/o-nas"
          >
            O NAS
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName == "/off-road"}>
          <Link
            color={pathName == "/off-road" ? "primary" : "foreground"}
            href="/off-road"
          >
            OFF-ROAD
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName == "/oferta"}>
          <Link
            color={pathName == "/oferta" ? "primary" : "foreground"}
            href="/oferta"
          >
            OFERTA
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName == "/galeria"}>
          <Link
            color={pathName == "/galeria" ? "primary" : "foreground"}
            href="/galeria"
          >
            GALERIA
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName == "/kontakt"}>
          <Link
            color={pathName == "/kontakt" ? "primary" : "foreground"}
            href="kontakt"
          >
            KONTAKT
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
