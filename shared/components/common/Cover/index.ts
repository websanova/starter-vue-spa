import { cva, type VariantProps } from "class-variance-authority"

export { default as Cover } from "./Cover.vue"
export { default as CoverContent } from "./CoverContent.vue"

export const coverContentVariants = cva(
  "w-full p-gutter",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export type CoverContentVariants = VariantProps<typeof coverContentVariants>
