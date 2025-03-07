import Link from "next/link";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function SubNavbar() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <nav className="flex w-max space-x-4 p-4 text-lg">
        <Link
          href={"/"}
          className="min-w-fit py-3 px-4 rounded hover:text-white hover:bg-primary"
        >
          Категория 1
        </Link>
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
