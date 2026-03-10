import type { ReactNode } from 'react'

interface InfoFieldProps {
  label: string
  children: ReactNode
  className?: string
}

const InfoField = ({ label, children, className = '' }: InfoFieldProps) => {
  return (
    <div className={className}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {children}
    </div>
  )
}

export default InfoField
