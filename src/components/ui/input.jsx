import React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-full flex items-center pointer-events-none z-10">
          {React.cloneElement(icon, { className: cn(icon.props.className, "text-bizzwiz-text-secondary opacity-70") })}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-transparent py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "form-input", 
          icon ? "pl-10 pr-3" : "px-4", 
          className
        )}
        ref={ref}
        {...props} />
    </div>
  );
});
Input.displayName = "Input"

export { Input }