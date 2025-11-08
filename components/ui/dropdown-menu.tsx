import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative">{children}</div>;
}

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement>;

export function DropdownMenuContent({ className, children, ...props }: DropdownMenuContentProps) {
  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type DropdownMenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-sm px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}







