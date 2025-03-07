import Link from "next/link";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DisplayItems from "@/app/dashboard/_components/navbar/display-items";

export type DashboardNavbarItem = {
  name: string;
  href: string;
};

const navbarItems: DashboardNavbarItem[] = [
  {
    name: "Табло",
    href: "/dashboard",
  },
  {
    name: "Категории",
    href: "/dashboard/categories",
  },
  {
    name: "Продукти",
    href: "/dashboard/products",
  },
  {
    name: "Поръчки",
    href: "/dashboard/orders",
  },
  {
    name: "Потребители",
    href: "/dashboard/users",
  },
  {
    name: "Имейл темплейти",
    href: "/dashboard/email-templates",
  },
  {
    name: "Настройки",
    href: "/dashboard/settings",
  },
  {
    name: "Поддръжка",
    href: "/dashboard/support",
  },
  {
    name: "Анализи",
    href: "/dashboard/analytics",
  },
  {
    name: "Купони",
    href: "/dashboard/coupons",
  },
];

export default function DashboardNavbar() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="w-full h-20 flex items-center justify-between gap-10 border-b px-5">
        <div className="text-2xl font-semibold">
          <Link href={"/dashboard"}>Администрация</Link>
        </div>
        <DisplayItems navbarItems={navbarItems} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
