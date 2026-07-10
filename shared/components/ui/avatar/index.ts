import { cva, type VariantProps } from "class-variance-authority"

export { default as Avatar } from "./Avatar.vue"
export { default as AvatarFallback } from "./AvatarFallback.vue"
export { default as AvatarImage } from "./AvatarImage.vue"

export const avatarVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-secondary font-normal text-foreground",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        base: "h-10 w-10 text-sm",
        lg: "h-16 w-16 text-xl"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md"
      }
    },
    defaultVariants: {
      size: "base",
      shape: "circle"
    }
  }
)

export type AvatarVariants = VariantProps<typeof avatarVariants>
