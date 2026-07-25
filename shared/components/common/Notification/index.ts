import { cva, type VariantProps } from "class-variance-authority"

export { default as Notification } from "./Notification.vue"

export const notificationVariants = cva(
  "flex items-start gap-3 cursor-pointer rounded-md p-3 shadow-sm transition-colors",
  {
    variants: {
      variant: {
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      }
    },
    defaultVariants: {
      variant: "secondary"
    }
  }
)

export type NotificationVariants = VariantProps<typeof notificationVariants>
