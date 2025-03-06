"use client";

import { iconsItems, categoriesItems } from "@/app/_components/navbar/_data";
import Logo from "@/app/_components/logo";
import DesktopNavbarItems from "@/app/_components/navbar/_components/desktop-navbar-items";
import DesktopNavbarIcons from "@/app/_components/navbar/_components/desktop-navbar-icons";
import MobileNavbar from "@/app/_components/navbar/_components/mobile-navbar";

export default function Navbar() {
  return (
    <div className="h-24 border-b flex items-center">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <Logo />
        <div className="w-full hidden xl:flex justify-between">
          <DesktopNavbarItems categoriesItems={categoriesItems} />
          <DesktopNavbarIcons iconsItems={iconsItems} />
        </div>
        <div className="block xl:hidden">
          <MobileNavbar categoriesItems={categoriesItems} iconsItems={iconsItems} />
        </div>
      </div>
    </div>
  );
}