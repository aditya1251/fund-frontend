import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}


export function CardContent({ children, className = '', ...props }: CardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const baseClasses = "flex flex-col space-y-1.5 p-6"
    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses

    return <div ref={ref} className={combinedClasses} {...props} />
  },
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const baseClasses = "text-2xl font-semibold leading-none tracking-tight"
    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses

    return <h3 ref={ref} className={combinedClasses} {...props} />
  }
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const baseClasses = "text-sm text-muted-foreground"
    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses

    return <p ref={ref} className={combinedClasses} {...props} />
  }
)
CardDescription.displayName = "CardDescription"

export { CardHeader, CardTitle, CardDescription }