import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import notFoundImg from '../assets/404.png'

const NotFound = () => {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isGoingBack, setIsGoingBack] = useState(false)

  const handleLoginClick = () => {
    setIsNavigating(true)
    navigate('/login')
  }

  const handleGoBack = () => {
    setIsGoingBack(true)
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center text-center md:items-center md:justify-center">

        {/* Illustration */} 
        <img src={notFoundImg} alt="404 illustration" className="w-74 h-74 object-contain mb-4" />

        {/* Text */}
        <h1 className="text-8xl font-black text-gray-900">404</h1>
        <h2 className="text-lg font-semibold text-gray-600 mt-2 mb-8">Page Not found</h2>

        {/* Buttons centered on desktop */}
        <div className="hidden md:flex justify-center">
          <div className="space-y-4 w-full max-w-sm" style={{minWidth: '250px'}}>
            <Button 
              variant="warning" 
              onClick={handleLoginClick} 
              disabled={isNavigating}
              className="py-4 text-base relative"
            >
              {isNavigating ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
                </div>
              ) : (
                'Go to login'
              )}
            </Button>
            <button
              onClick={handleGoBack}
              disabled={isGoingBack}
              className="block w-full cursor-pointer border border-black text-gray-600 font-medium py-4 text-base rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {isGoingBack ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
                </div>
              ) : (
                'Go Back'
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Buttons at bottom - mobile only */}
      <div className="flex justify-center md:hidden">
        <div className="space-y-3 w-full max-w-xs">
          <Button 
            variant="warning" 
            onClick={handleLoginClick}
            disabled={isNavigating}
            className="relative"
          >
            {isNavigating ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
              </div>
            ) : (
              'Go to login'
            )}
          </Button>
          <button
            onClick={handleGoBack}
            disabled={isGoingBack}
            className="block w-full cursor-pointer border border-black text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {isGoingBack ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
              </div>
            ) : (
                'Go Back'
              )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound