import { z } from "zod"

/**
* Client side validation for the bookmark form. Mirrors the domain input shape;
* server side validation still runs and its errors are merged into the same
* fields through applyServerErrors.
*/
export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  categoryId: z.number().nullable().default(null)
})
