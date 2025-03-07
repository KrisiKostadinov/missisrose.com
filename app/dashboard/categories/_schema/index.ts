import { z } from "zod";

import { Status } from "@prisma/client";

export const places = {
  HOME_HEADER: "Навигационна лента",
  ALL: "На всички места"
};

export const statuses = {
  PUBLISHED: "Публикувано",
  DRAFT: "Чернова"
}

export const getStatusLabel = (status: Status) => {
  return statuses[status];
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "Името на категорията е задължително." }),
  slug: z.string().min(1, { message: "URL адресът на категорията е задължтелен." }),
  title: z.string().optional(),  
  description: z.string().optional(),
  status: z.nativeEnum(Status),
  places: z.array(z.enum(Object.keys(places) as [keyof typeof places])),
});

export type FormSchema = z.infer<typeof formSchema>;
