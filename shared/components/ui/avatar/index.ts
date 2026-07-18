import { cva, type VariantProps } from "class-variance-authority"

export { default as Avatar } from "./Avatar.vue"
export { default as AvatarFallback } from "./AvatarFallback.vue"
export { default as AvatarImage } from "./AvatarImage.vue"

export const avatarVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-secondary font-normal text-foreground",
  {
    variants: {
      size: {
        sm: "size-4 text-xs",
        md: "size-6",
        lg: "size-8 text-xl"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md"
      }
    },
    defaultVariants: {
      size: "md",
      shape: "circle"
    }
  }
)

export type AvatarVariants = VariantProps<typeof avatarVariants>
