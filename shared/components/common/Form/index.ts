import { cva, type VariantProps } from "class-variance-authority"

export { default as Form } from "./Form.vue"
export { default as FormButton } from "./FormButton.vue"
export { default as FormInputSelect } from "./FormInputSelect.vue"
export { default as FormInputText } from "./FormInputText.vue"

export const formVariants = cva(
  "flex w-full flex-col gap-4",
  {
    variants: {
      size: {
        sm: "sm:max-w-[20rem]",
        md: "sm:max-w-[25rem]",
        lg: "sm:max-w-[30rem]",
        full: "max-w-full"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export type FormVariants = VariantProps<typeof formVariants>
