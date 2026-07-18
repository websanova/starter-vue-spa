import { cva, type VariantProps } from "class-variance-authority"

export { default as Inline } from "./Inline.vue"

export const inlineVariants = cva(
  "flex flex-row flex-wrap items-center",
  {
    variants: {
      gap: {
        sm: "gap-1",
        md: "gap-2",
        lg: "gap-3"
      }
    },
    defaultVariants: {
      gap: "md"
    }
  }
)

export type InlineVariants = VariantProps<typeof inlineVariants>
