import { Status } from "@prisma/client";
import { z } from "zod";

// name schema
export const categoryNameFormSchema = z
  .object({
    name: z.string().min(1, { message: "Моля, въведете име на категория." }),
    slug: z.string().optional(),
    create_slug: z.boolean(),
    id: z.coerce.number(),
  });

export type CategoryNameFormSchema = z.infer<typeof categoryNameFormSchema>;

// status schema
export const categoryStatusFormSchema = z.object({
  id: z.coerce.number({ message: "Невалиден 'id' на категория" }),
  status: z.nativeEnum(Status),
});

export type CategoryStatusFormSchema = z.infer<typeof categoryStatusFormSchema>;

// description schema
export const categoryDescriptionFormSchema = z.object({
  id: z.coerce.number({ message: "Невалиден 'id' на категория" }),
  description: z.string().optional(),
});

export type CategoryDescriptionFormSchema = z.infer<typeof categoryDescriptionFormSchema>;

// title schema
export const categoryTitleFormSchema = z.object({
  id: z.coerce.number({ message: "Невалиден 'id' на категория" }),
  title: z.string().optional(),
});

export type CategoryTitleFormSchema = z.infer<typeof categoryTitleFormSchema>;

// places schema
export const allowedPlaces = {
  HOME_HEADER: "Навигационна лента",
  ALL: "На всички места",
  SIDEBAR: "Странична лента",
  FOOTER: "Долна част"
};

export const categoryPlaceFormSchema = z.object({
  id: z.coerce.number({ message: "Невалиден 'id' на категория" }),
  places: z.array(z.enum(Object.keys(allowedPlaces) as [keyof typeof allowedPlaces])),
});

export type CategoryPlaceFormSchema = z.infer<typeof categoryPlaceFormSchema>;

// parent schema
export const categoryParentFormSchema = z.object({
  id: z.coerce.number({ message: "Невалиден 'id' на категория" }),
  parent_id: z.coerce.number({ message: "Моля, добавете 'id' на родителска категория." }),
});

export type CategoryParentFormSchema = z.infer<typeof categoryParentFormSchema>;