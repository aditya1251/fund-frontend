import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const baseClasses =
    "flex h-10 w-full text-black rounded-md px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none focus:ring focus:ring-[#F7C430] disabled:cursor-not-allowed disabled:opacity-50"

  return <input type={type} className={`${baseClasses} ${className || ""}`} ref={ref} {...props} />
})
Input.displayName = "Input"

export { Input }
