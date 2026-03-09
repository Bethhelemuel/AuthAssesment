import type { InputHTMLAttributes } from 'react'
import type { ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  children?: ReactNode
  className?: string
  focusColor?: 'yellow' | 'teal'
}

const Input = ({ label, error, className = '', focusColor = 'yellow', ...props }: InputProps) => {
  const focusColors = {
    yellow: 'focus:ring-yellow-400',
    teal: 'focus:ring-teal-400'
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs text-gray-500 font-medium mb-1 block">
          {label}
        </label>
      )}
      <input
        className={`w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 ${focusColors[focusColor]} transition ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Input
