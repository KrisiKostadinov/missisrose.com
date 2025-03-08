"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PageButton from "@/app/_components/page-button";
import SaveForm from "@/app/dashboard/categories/_components/save-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const message =
  "Важно! Промените няма да бъдат запазени. Сигурни ли сте, че искате да затворите този формуляр?";

export default function SavePopover() {
  const [open, setOpen] = useState(false);

  const onHide = () => {
    if (open && confirm(message)) {
      setOpen(!open);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onHide}>
      <DialogTrigger asChild>
        <PageButton
          name="Създаване"
          icon="PlusIcon"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="w-full min-w-full h-full p-0">
        <ScrollArea className="w-full max-h-screen">
          <div className="p-5 space-y-2">
            <DialogTitle>Създаване на нова категория</DialogTitle>
            <DialogDescription>
              Всички полета, който са означени със звездичка са задължителни!
            </DialogDescription>
          </div>
          <Separator />
          <div className="py-5">
            <SaveForm />
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
