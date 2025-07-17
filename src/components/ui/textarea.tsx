import * as React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const baseClasses =
    "flex min-h-[80px] w-full bg-[#f1f1f1] rounded-md px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none focus:ring focus:ring-[#F7C430] disabled:cursor-not-allowed disabled:opacity-50"

  return <textarea className={`${baseClasses} ${className || ""}`} ref={ref} {...props} />
})
Textarea.displayName = "Textarea"

export { Textarea }
