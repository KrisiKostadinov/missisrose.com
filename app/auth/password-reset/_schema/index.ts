import { z } from "zod";

export const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Паролата трябва да съдържа поне 6 синволи." }),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Паролите не съвпадат.",
    path: ["cpassword"],
  });

export type FormSchema = z.infer<typeof formSchema>;
