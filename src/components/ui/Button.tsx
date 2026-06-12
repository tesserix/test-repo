import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500':
            variant === 'primary',
          'bg-white text-secondary-900 border border-secondary-300 hover:bg-secondary-50 focus:ring-secondary-500':
            variant === 'secondary',
          'bg-transparent text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-500':
            variant === 'ghost',
          'bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus:ring-primary-500':
            variant === 'link',
          // Sizes
          'px-3 py-1.5 text-sm rounded-md': size === 'sm',
          'px-4 py-2 text-base rounded-lg': size === 'md',
          'px-6 py-3 text-lg rounded-lg': size === 'lg',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}