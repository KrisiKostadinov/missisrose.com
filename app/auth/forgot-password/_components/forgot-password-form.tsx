"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

import { FormSchema, formSchema } from "@/app/auth/forgot-password/_schema";
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

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/forgot-password", values);
      toast.success("Линкът беше изпратен.");
      setSubmitted(true);
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
      <h1 className="text-2xl font-semibold">Забравена парола</h1>
      <Separator className="my-5" />
      {submitted && (
        <>
          <div className="bg-green-100 p-5 rounded">
            Линкът беше изпратен. Моля, проверете пощата си, за да смените
            паролата.
          </div>
          <Separator className="my-5" />
        </>
      )}
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
          <div>
            <PageButton
              name="Изпращане на линк"
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
