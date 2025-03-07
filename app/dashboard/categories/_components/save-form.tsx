"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  formSchema,
  FormSchema,
  statuses,
} from "@/app/dashboard/categories/_schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateSlug } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SaveForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      title: "",
      description: "",
      places: "HOME_HEADER",
      status: "DRAFT",
    },
  });
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: FormSchema) {
    try {
      setLoading(true);
      await axios.post("/api/categories", values);
      router.push("/dashboard/categories");
      toast.success("Категорията беше запазена.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Възникна грешка!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="text-2xl">Добавяне на нова категория</div>
      <p className="text-muted-foreground">
        Всички полета, който са означени със звездичка са задължителни!
      </p>
      <Separator className="my-5" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="name"
          disabled={loading}
          render={({ field }) => (
            <FormItem
              onChange={(event) =>
                setName((event.target as HTMLInputElement)?.value)
              }
            >
              <FormLabel>
                Име <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Име на категорията" />
              </FormControl>
              <FormDescription>
                Въведете името на категорията, което да се визуализира на
                потребителите на сайта. Името не е задължително да бъде
                уникално.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL адрес <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="URL адрес на категорията" {...field} />
              </FormControl>
              <FormDescription>
                URL адресът на категорията трябва да бъде уникална стойност.
                Можете да имате две или повече еднакви стойности, ако те са в
                различни родителски категории.
              </FormDescription>
              <FormMessage />
              <Button
                type="button"
                className="w-fit"
                variant={"outline"}
                disabled={name.length === 0}
                onClick={() =>
                  form.setValue("slug", generateSlug(form.getValues("name")))
                }
              >
                Генериране на URL адрес
              </Button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание на категорията..."
                  {...field}
                  rows={10}
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Статус <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statuses).map(([key, value], index) => (
                      <SelectItem value={key} key={index}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Ако приложите статусът на (Публикувано), ще можете да виждате
                тази категория в зоната за клиенти на магазина.
              </FormDescription>
            </FormItem>
          )}
        />

        <div>
          <Button disabled={loading} variant={"outline"}>
            Запазване
          </Button>
        </div>
      </form>
    </Form>
  );
}