interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Avatar = ({ src, alt, size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden mb-3 shadow-md ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export default Avatar
