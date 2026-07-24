import { cva, type VariantProps } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-[var(--btn)] text-[var(--btn-fg)] shadow-sm hover:bg-[var(--btn)]/90",
        outline: "border border-[var(--btn)] text-[var(--btn)] shadow-sm hover:bg-[var(--btn)]/10",
        ghost: "text-[var(--btn)] hover:bg-[var(--btn)]/10",
        link: "text-[var(--btn)]"
      },
      color: {
        primary: "[--btn:var(--primary)] [--btn-fg:var(--primary-foreground)]",
        secondary: "[--btn:var(--secondary)] [--btn-fg:var(--secondary-foreground)]",
        destructive: "[--btn:var(--destructive)] [--btn-fg:var(--destructive-foreground)]",
        success: "[--btn:var(--success)] [--btn-fg:var(--success-foreground)]",
        warning: "[--btn:var(--warning)] [--btn-fg:var(--warning-foreground)]"
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md"
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
