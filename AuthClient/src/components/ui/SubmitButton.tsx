import LoadingSpinner from './LoadingSpinner'
import Button from './Button'

interface SubmitButtonProps {
  isLoading: boolean
  children: React.ReactNode
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const SubmitButton = ({
  isLoading,
  children,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'submit',
  onClick
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      variant={variant}
      onClick={onClick}
      className={`mt-2 relative ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" />
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
