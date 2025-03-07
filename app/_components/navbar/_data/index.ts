import { AuthSession } from "@/types";
import LucideIcons from "lucide-react";

export type NavbarItem = {
  name: string;
  href: string;
  icon?: keyof typeof LucideIcons;
};

export const categoriesItems: NavbarItem[] = [
  {
    name: "Сватба",
    href: "/svatba",
  },
  {
    name: "Кръщене",
    href: "/krustene",
  },
  {
    name: "Коледа",
    href: "/koleda",
  },
  {
    name: "Св. Валентин",
    href: "/sveti-valentin",
  },
];

export function getIconsItems(session: AuthSession | null) {
  const iconsItems: NavbarItem[] = [
    {
      name: "Количка",
      href: "/cart",
      icon: "ShoppingBagIcon",
    },
  ];

  if (session) {
    iconsItems.push({
      name: "Акаунт",
      href: "/account",
      icon: "UserIcon",
    });
  } else {
    iconsItems.push({
      name: "Вход",
      href: "/auth/login",
      icon: "LogInIcon",
    });
  }

  return iconsItems;
}
