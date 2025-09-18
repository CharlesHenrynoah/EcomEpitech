import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"

    const variantStyles = {
      default: "bg-[#432ec6] text-white shadow hover:bg-[#432ec6]/90 focus-visible:ring-[#432ec6]",
      destructive: "bg-red-500 text-white shadow hover:bg-red-500/90 focus-visible:ring-red-500",
      outline: "border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:ring-gray-500",
      secondary: "bg-[#855ab4] text-white shadow hover:bg-[#855ab4]/80 focus-visible:ring-[#855ab4]",
      ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
      link: "text-[#432ec6] underline-offset-4 hover:underline focus-visible:ring-[#432ec6]",
    }

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3",
      lg: "h-10 rounded-md px-6",
      icon: "h-9 w-9",
    }

    return <Comp className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} ref={ref} {...props} />
  },
)

Button.displayName = "Button"

export { Button }
