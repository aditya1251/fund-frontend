import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  className?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode
  value: string
}

interface SelectValueProps {
  placeholder?: string
}

export function Select({ children, defaultValue, onValueChange, className = '', ...props }: SelectProps) {
  return (
    <select 
      className={`flex border-none h-10 w-full text-black rounded-md border border-input bg-[#f1f1f1] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-[#f1f1f1] file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      defaultValue={defaultValue}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children, className = '', ...props }: SelectTriggerProps) {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-[#f1f1f1] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SelectContent({ children }: SelectContentProps) {
  return <>{children}</>
}

export function SelectItem({ children, value, ...props }: SelectItemProps) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return <span>{placeholder}</span>
}
