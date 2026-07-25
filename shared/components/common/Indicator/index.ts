import { cva, type VariantProps } from "class-variance-authority"

export { default as Indicator } from "./Indicator.vue"

export const indicatorVariants = cva(
  "absolute size-2 rounded-full bg-destructive ring-2 ring-background pointer-events-none",
  {
    variants: {
      position: {
        "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
        "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
        "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
        "bottom-left": "bottom-0 left-0 -translate-x-1/3 translate-y-1/3"
      }
    },
    defaultVariants: {
      position: "top-right"
    }
  }
)

export type IndicatorVariants = VariantProps<typeof indicatorVariants>
