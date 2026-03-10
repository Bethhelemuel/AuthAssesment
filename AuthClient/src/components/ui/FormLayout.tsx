import type { ReactNode } from 'react'

interface FormLayoutProps {
  title: string
  description: string
  switchText: string
  onSwitch: () => void
  imageSrc: string
  imageAlt: string
  bgColor: string
  children: ReactNode
  footer?: ReactNode
}

const FormLayout = ({
  title,
  description,
  switchText,
  onSwitch,
  imageSrc,
  imageAlt,
  bgColor,
  children,
  footer
}: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-0 md:items-center md:p-6">
      <div className="bg-white md:rounded-3xl shadow-xl flex w-full md:w-[85vw] md:w-auto md:max-w-6xl h-screen md:h-[90vh] overflow-hidden p-6 md:p-3 gap-3 md:gap-3">

        {/* Left — Form centered */}
        <div className="flex-1 flex flex-col md:justify-center overflow-y-auto py-8 px-6">
          <div className="flex flex-col items-center w-full flex-1">
            <div className="w-full md:w-2/3 flex-1 flex flex-col md:justify-center">
              <h1 className="text-2xl font-black text-gray-900 mb-8">{title}</h1>
              <p className="text-gray-400 text-sm mb-8">
                {description}{' '}
                <span
                  onClick={onSwitch}
                  className="text-[#8960BC] font-semibold underline cursor-pointer hover:text-teal-400"
                >
                  {switchText}
                </span>
              </p>

              {children}
            </div>
          </div>

          {footer}
        </div>

        {/* Right — Illustration */}
        <div className={`hidden md:flex flex-1 ${bgColor} rounded-2xl overflow-hidden items-end justify-start`}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover scale-100"
          />
        </div>

      </div>
    </div>
  )
}

export default FormLayout
