"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavbarItem } from "@/app/_components/navbar/_data";
import { ClientIcon } from "@/components/client-icon";

type Props = {
  iconsItems: NavbarItem[];
};

export default function DesktopNavbarIcons({ iconsItems }: Props) {
  const pathname = usePathname();

  return (
    <nav className="text-lg flex items-center gap-5">
      {iconsItems.map((navbarItem, index) => (
        <Link
          href={navbarItem.href}
          className={cn(
            "p-2 rounded-md outline-none border-4 border-white focus:border-gray-200 hover:bg-primary group",
            pathname === navbarItem.href && "bg-primary"
          )}
          key={index}
        >
          {navbarItem.icon && (
            <ClientIcon
              name={navbarItem.icon}
              className={cn(
                "w-10 h-10 group-hover:text-white text-black/70",
                pathname === navbarItem.href && "text-white"
              )}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
