"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

import { FormSchema, formSchema } from "@/app/auth/register/_schema";
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
import AuthWrapper from "@/app/auth/_components/auth-wrapper";
import { Separator } from "@/components/ui/separator";
import PageLink from "@/app/_components/page-link";
import PageButton from "@/app/_components/page-button";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/register", values);
      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Възникна грешка!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <h1 className="text-2xl font-semibold">Създаване на нов профил</h1>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имейл</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Въведете валиден имейл адрес"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  След като потвърдите регистрацията си, ще получите имейл
                  съобщение на посочения имейл адрес, за да потвърдите профила
                  си.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Парола</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Въведете сигурна парола"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Препоръчително е да създадете сигурна парола, за да
                  предотвратите неоторизирана активност в профила си.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Име</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="Въведете името и фамилията си"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Можете да промените това поле от профила си, след като
                  завършите регистрацията и потвърдите профила си.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            Ако натиснете бутона за създаване на нов потребител, Вие се
            съгласявате с нашите{" "}
            <PageLink name="Общи условия" href="/terms" target="_blank" /> и{" "}
            <PageLink
              name="Политика на поверителност"
              href="/privacy-policy"
              target="_blank"
            />
            .
          </div>
          <div>
            <PageButton
              name="Създаване на профила"
              icon="SaveIcon"
              disabled={loading}
            />
            <Separator className="my-5" />
            <PageLink
              name="Забравена парола"
              href="/auth/forgot-password"
              target="_self"
            />
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
}
