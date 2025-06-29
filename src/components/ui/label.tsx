"use client"

import * as React from "react"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  const baseClasses = "text-sm font-medium leading-none"

  return <label ref={ref} className={`${baseClasses} ${className || ""}`} {...props} />
})
Label.displayName = "Label"

export { Label }
