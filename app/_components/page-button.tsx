import LucideIcons from "lucide-react";

import { ClientIcon } from "@/components/client-icon";

type Props = {
  name: string;
  icon: keyof typeof LucideIcons;
} & React.ComponentPropsWithoutRef<"button">;

export default function PageButton({ name, icon, ...props }: Props) {
  return (
    <button
      className="flex items-center gap-3 cursor-pointer py-3 px-5 rounded text-white bg-primary hover:bg-black duration-200 focus:bg-gray-400"
      {...props}
    >
      <ClientIcon name={icon} />
      <span>{name}</span>
    </button>
  );
}