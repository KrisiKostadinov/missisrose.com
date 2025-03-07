"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SaveForm from "@/app/dashboard/categories/_components/save-form";
import PageButton from "@/app/_components/page-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function SavePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <PageButton
          className="max-sm:w-full max-sm:mt-5"
          name="Създаване"
          icon="PlusIcon"
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full max-w-xl" align="end">
        <ScrollArea className="h-[400px] whitespace-wrap">
          <div className="p-5">
            <SaveForm />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}