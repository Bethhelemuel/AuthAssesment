interface ErrorMessageProps {
  message: string
  className?: string
}

const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
  if (!message) return null

  return (
    <p className={`text-red-500 text-sm mb-4 ${className}`}>
      {message}
    </p>
  )
}

export default ErrorMessage
