"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

import { FormSchema, formSchema } from "@/app/auth/login/_schema";
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

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/login", values);
      router.push("/");
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
      <h1 className="text-2xl font-semibold">Влизане в профила</h1>
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
                  Въведете имейл адресът, с който сте създали профила си в този
                  онлайн магазин.
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
                    placeholder="Въведете паролата си"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Въведете паролата за сигурност, с която сте създали профила си
                  в този онлайн магазин. Ако сте забравили паролата си, можете
                  да я смените от линкът за смяна на паролата в долната част на
                  тази секция.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <PageButton
              name="Влизане в профила"
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