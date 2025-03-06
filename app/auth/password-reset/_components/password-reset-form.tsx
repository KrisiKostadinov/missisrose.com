"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

import { FormSchema, formSchema } from "@/app/auth/password-reset/_schema";
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

export default function PasswordResetForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/password-reset", values);
      toast.success("Паролата беше променена.");
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
      <h1 className="text-2xl font-semibold">Смяна на паролата</h1>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Нова парола</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Въведете нова сигурна парола"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Потвърдете на паролата</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Потвърдете паролата си тук"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <PageButton
              name="Смяна на паролата"
              icon="SaveIcon"
              disabled={loading}
            />
            <Separator className="my-5" />
            <PageLink
              name="Влизане в профила"
              href="/auth/login"
              target="_self"
            />
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
}