import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-mth-grey-blue-700 text-primary-foreground hover:bg-mth-grey-blue-700/90',
        secondary:
          'bg-mth-silver-500 text-mth-dark-900 hover:bg-mth-silver-500/70',
        tertiary: 'bg-mth-blue-500 text-mth-white-50 hover:bg-mth-blue-500/70',
        contrast: 'bg-mth-dark-900 text-mth-white-50 hover:bg-mth-dark-900/70',
        'primary-outline':
          'border border-mth-grey-blue-700 bg-background hover:bg-mth-white-300 text-mth-grey-blue-700',
        'secondary-outline':
          'border border-mth-silver-500 bg-background hover:bg-mth-white-300 text-mth-dark-900',
        'tertiary-outline':
          'border border-mth-blue-500 bg-background hover:bg-mth-white-300 text-mth-blue-500',
        'contrast-outline':
          'border border-mth-dark-900 bg-background hover:bg-mth-white-300 text-mth-dark-900',
        'ghost-primary': 'text-mth-grey-blue-700 hover:bg-mth-grey-blue-50',
        'ghost-secondary': 'text-mth-silver-800 hover:bg-mth-silver-100',
        'ghost-tertiary': 'text-mth-blue-500 hover:bg-mth-blue-100',
        'ghost-contrast': 'text-mth-dark-900 hover:bg-mth-dark-100/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
