"use client";

import { categoriesItems, getIconsItems } from "@/app/_components/navbar/_data";
import Logo from "@/app/_components/logo";
import DesktopNavbarItems from "@/app/_components/navbar/_components/desktop-navbar-items";
import DesktopNavbarIcons from "@/app/_components/navbar/_components/desktop-navbar-icons";
import MobileNavbar from "@/app/_components/navbar/_components/mobile-navbar";
import { AuthSession } from "@/types";

type Props = {
  session: AuthSession | null;
};

export default function Navbar({ session }: Props) {
  const iconsItems = getIconsItems(session);

  return (
    <div className="h-20 border-b flex items-center">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <Logo />
        <div className="w-full hidden xl:flex items-center justify-between">
          <DesktopNavbarItems />
          <DesktopNavbarIcons iconsItems={iconsItems} />
        </div>
        <div className="block xl:hidden">
          <MobileNavbar
            categoriesItems={categoriesItems}
            iconsItems={iconsItems}
          />
        </div>
      </div>
    </div>
  );
}