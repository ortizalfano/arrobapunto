import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent2/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-ink hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        gold: "bg-gold-ribbon text-accent-ink hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 font-semibold",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border border/50 bg-bg-elev-1 hover:border-accent hover:bg-bg-elev-2",
        secondary: "bg-bg-elev-2 text-content hover:bg-bg-elev-1",
        ghost:
          "hover:bg-bg-elev-1 hover:text-accent text-content/70 border-transparent",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2.5",
        sm: "h-10 px-4",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    // Remove asChild from props if it's false/undefined to prevent React warning
    if (!asChild) {
      return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    }
    // If asChild is true, we'd use Slot but since we're not using it, just return the button
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

