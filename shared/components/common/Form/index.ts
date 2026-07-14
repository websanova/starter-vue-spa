import { cva, type VariantProps } from "class-variance-authority"

export { default as Form } from "./Form.vue"

export const formVariants = cva(
  "flex w-full flex-col gap-4",
  {
    variants: {
      size: {
        sm: "max-w-[10rem]",
        md: "max-w-[20rem]",
        lg: "max-w-[30rem]",
        full: "max-w-full"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export type FormVariants = VariantProps<typeof formVariants>
