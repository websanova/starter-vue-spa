import { cva, type VariantProps } from "class-variance-authority"

export { default as Stack } from "./Stack.vue"

export const stackVariants = cva(
  "flex flex-col",
  {
    variants: {
      gap: {
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8"
      }
    },
    defaultVariants: {
      gap: "md"
    }
  }
)

export type StackVariants = VariantProps<typeof stackVariants>
