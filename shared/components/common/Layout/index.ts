import { cva, type VariantProps } from "class-variance-authority"

export { default as Layout } from "./Layout.vue"
export { default as LayoutHeader } from "./LayoutHeader.vue"
export { default as LayoutBody } from "./LayoutBody.vue"
export { default as LayoutBodyAside } from "./LayoutBodyAside.vue"
export { default as LayoutBodyContent } from "./LayoutBodyContent.vue"
export { default as LayoutFooter } from "./LayoutFooter.vue"

export const layoutContainerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        xs: "max-w-(--breakpoint-xs)",
        sm: "max-w-(--breakpoint-sm)",
        md: "max-w-(--breakpoint-md)",
        lg: "max-w-(--breakpoint-lg)",
        xl: "max-w-(--breakpoint-xl)",
        full: ""
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
)

export type LayoutContainerVariants = VariantProps<typeof layoutContainerVariants>
