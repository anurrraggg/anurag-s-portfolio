import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

const buttonVariantStyles = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-500/40 dark:bg-red-600/80 dark:hover:bg-red-700',
  outline: 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-600 dark:bg-slate-900/30 dark:border-slate-700 dark:hover:bg-slate-800',
  secondary: 'bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-50 hover:bg-slate-300 dark:hover:bg-slate-700',
  ghost: 'hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-600/20 dark:hover:text-cyan-400',
  link: 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline',
}

const sizeStyles = {
  default: 'h-9 px-4 py-2 has-[>svg]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
  icon: 'size-9',
  'icon-sm': 'size-8',
  'icon-lg': 'size-10',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariantStyles
  size?: keyof typeof sizeStyles
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-blue-600 focus-visible:ring-blue-600/50 dark:focus-visible:ring-blue-400/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500"
    
    return (
      <Comp
        data-slot="button"
        className={cn(
          baseStyles,
          buttonVariantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, type ButtonProps }
