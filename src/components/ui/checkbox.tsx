"use client"

import * as React from "react"

export interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, id, disabled, ...props }, ref) => {
    const baseClasses =
      "h-4 w-4 rounded border-2 border-gray-300 text-[#f5d949] focus:ring-[#f5d949] focus:ring-2 cursor-pointer"
    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses

    return (
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className={combinedClasses}
        {...props}
      />
    )
  },
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
