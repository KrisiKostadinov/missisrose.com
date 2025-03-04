"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavbarItem } from "@/app/_components/navbar/_data";
import { cn } from "@/lib/utils";

type Props = {
  categoriesItems: NavbarItem[];
};

export default function DesktopNavbarItems({ categoriesItems }: Props) {
  const pathname = usePathname();

  return (
    <nav className="text-lg flex items-center gap-2">
      {categoriesItems.map((categoryItem, index) => (
        <Link
          href={`/categories${categoryItem.href}`}
          className={cn(
            "rounded py-2.5 px-5 hover:text-white hover:bg-primary duration-100",
            pathname === categoryItem.href && "text-white bg-primary"
          )}
          key={index}
        >
          {categoryItem.name}
        </Link>
      ))}
    </nav>
  );
}