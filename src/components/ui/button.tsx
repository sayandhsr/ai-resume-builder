import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 transition-all duration-200 ease-out cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background shadow-sm rounded-full hover:opacity-90 hover:scale-[1.03] active:scale-[0.97]",
        destructive:
          "bg-destructive text-white shadow-sm rounded-full hover:bg-destructive/90 hover:scale-[1.03] active:scale-[0.97]",
        outline:
          "border border-border bg-transparent rounded-full hover:bg-secondary hover:text-foreground active:scale-[0.97]",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 hover:scale-[1.03] active:scale-[0.97]",
        ghost:
          "rounded-xl hover:bg-secondary hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        accent: "bg-[#FF5623] text-white shadow-sm rounded-full hover:opacity-90 hover:scale-[1.03] active:scale-[0.97]",
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-3",
        xs: "h-7 gap-1 rounded-full px-3 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-full px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-full px-8 text-base has-[>svg]:px-5",
        icon: "size-10 rounded-full",
        "icon-xs": "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
