import { cva, type VariantProps } from "class-variance-authority"
import type { InjectionKey, Ref } from "vue"

export { default as Navbar } from "./Navbar.vue"
export { default as NavItem } from "./NavItem.vue"
export { default as NavDivider } from "./NavDivider.vue"
export { default as NavDropdown } from "./NavDropdown.vue"

export type NavOrientation = "horizontal" | "vertical"

/**
 * Injection key for the navbar orientation.
 *
 * Navbar provides it so NavItem, NavDivider, and NavDropdown can pick
 * their own per-orientation styling without prop drilling.
 */
export const navOrientationKey = Symbol("navOrientation") as InjectionKey<Ref<NavOrientation>>

export const navbarVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-center h-full gap-3",
        vertical: "flex-col items-stretch my-3"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

export const navItemVariants = cva(
  "flex items-center gap-2 cursor-pointer transition-colors [&_svg]:shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "h-full [&_svg]:size-7",
        vertical: "w-full px-2 py-1 rounded-sm hover:bg-accent [&.router-link-exact-active]:text-active [&_svg]:size-4"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

export const navDividerVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "mx-1 h-5 w-px",
        vertical: "my-1 h-px w-full"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

export type NavbarVariants = VariantProps<typeof navbarVariants>
