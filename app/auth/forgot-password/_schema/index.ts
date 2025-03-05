import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Моля, въведете валиден имейл адрес!",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
