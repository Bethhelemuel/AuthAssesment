import type { ButtonHTMLAttributes } from 'react'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const baseClasses = 'w-full font-bold py-2.5 rounded-lg transition duration-300 cursor-pointer'
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-yellow-400 hover:text-black',
    secondary: 'bg-black text-white hover:bg-teal-500 hover:text-white',
    danger: 'border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white',
    warning: 'bg-[#FDC700] text-black hover:bg-[#EEBB00] hover:text-black'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
