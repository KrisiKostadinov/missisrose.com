"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ClientIcon } from "@/components/client-icon";
import { NavbarItem } from "@/app/_components/navbar/_data";
import { Separator } from "@/components/ui/separator";
import { DeleteIcon, MenuIcon } from "lucide-react";

type Props = {
  categoriesItems: NavbarItem[];
  iconsItems: NavbarItem[];
};

export default function MobileNavbar({ categoriesItems, iconsItems }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <MenuIcon
        className="w-12 h-12 p-2 rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      />
      <div
        className={cn(
          "z-10 bg-black/20 fixed top-0 right-0 w-full min-h-screen duration-200",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(!open)}
      />
      <nav
        className={cn(
          "bg-white fixed top-0 right-0 w-3/4 min-h-screen border-l pt-5 px-5 space-y-5 z-20 duration-200",
          open
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        )}
      >
        <div className="relative flex flex-col gap-2">
          <div className="text-xl mb-3">Категории</div>
          <DeleteIcon
            className="absolute right-0 w-6 h-6 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <DisplayItems items={categoriesItems} setOpen={setOpen} />
        </div>
        <Separator className="my-3" />
        <div className="flex flex-col gap-2">
          <div className="text-xl mb-3">Други</div>
          <DisplayItems items={iconsItems} setOpen={setOpen} />
        </div>
      </nav>
    </>
  );
}

type DisplayProps = {
  items: NavbarItem[];
  setOpen: (open: boolean) => void;
};

const DisplayItems = ({ items, setOpen }: DisplayProps) => {
  const pathname = usePathname();

  return items.map((item, index) => (
    <Link
      className={cn(
        "flex items-center gap-2 rounded bg-gray-50 hover:text-white hover:bg-primary py-2 px-3",
        pathname === item.href && "text-white bg-primary"
      )}
      href={item.href}
      key={index}
      onClick={() => setOpen(!open)}
    >
      {item.icon && <ClientIcon name={item.icon} />}
      <span>{item.name}</span>
    </Link>
  ));
};