"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DashboardNavbarItem } from "@/app/dashboard/_components/navbar";

type Props = {
  navbarItems: DashboardNavbarItem[];
};

export default function DisplayItems({ navbarItems }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {navbarItems.map((navbarItem, index) => (
        <Link
          className={cn(
            "py-2 px-4 hover:text-white hover:bg-primary rounded duration-100",
            pathname === navbarItem.href && "text-white bg-primary"
          )}
          href={navbarItem.href}
          key={index}
        >
          {navbarItem.name}
        </Link>
      ))}
    </nav>
  );
}