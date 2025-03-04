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

export const iconsItems: NavbarItem[] = [
  {
    name: "Количка",
    href: "/cart",
    icon: "ShoppingBagIcon",
  },
  {
    name: "Акаунт",
    href: "/account",
    icon: "UserIcon",
  }
];
