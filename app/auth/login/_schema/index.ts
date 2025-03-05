import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Моля, въведете валиден имейл адрес!",
  }),
  password: z
    .string()
    .min(6, { message: "Моля, въведете парола с 6 или повече синвили." }),
});

export type FormSchema = z.infer<typeof formSchema>;