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
    <nav className="text-lg flex items-center gap-2">
      {iconsItems.map((navbarItem, index) => (
        <Link
          href={"/cart"}
          className={cn(
            "flex flex-col items-center rounded py-2.5 px-5 hover:text-white hover:bg-primary duration-100",
            pathname === "/cart" && "text-white bg-primary"
          )}
          key={index}
        >
          {navbarItem.icon && <ClientIcon name={navbarItem.icon} />}
          <span>{navbarItem.name}</span>
        </Link>
      ))}
    </nav>
  );
}