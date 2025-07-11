import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-secondary text-white shadow-neo hover:shadow-neo-inset hover:scale-105",
        destructive: "bg-error text-white hover:bg-error/90 shadow-lg hover:shadow-xl",
        outline: "border border-primary/20 bg-transparent backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md",
        ghost: "bg-transparent hover:bg-primary/10 hover:text-primary text-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        vibework: "bg-gradient-to-r from-vibework-primary to-vibework-secondary text-white shadow-glow hover:shadow-glow-lg hover:scale-105",
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-foreground hover:bg-white/20 hover:border-white/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
