import LucideIcons from "lucide-react";

import { ClientIcon } from "@/components/client-icon";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  icon: keyof typeof LucideIcons;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function PageButton({ name, icon, className, ...props }: Props) {
  return (
    <button
      className={cn(
        "flex items-center gap-3 cursor-pointer py-3 px-5 rounded text-white bg-primary hover:bg-black duration-200 focus:bg-gray-400 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <ClientIcon name={icon} />
      {name && <span>{name}</span>}
    </button>
  );
}
