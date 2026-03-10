import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import profileImg from '../assets/profile.jpg'
import Button from '../components/ui/Button'
import Footer from '../components/ui/Footer'
import Toast from '../components/ui/Toast'
import Avatar from '../components/ui/Avatar'
import InfoField from '../components/ui/InfoField'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import {
  PROFILE_LABELS,
  PROFILE_CONTENT,
  PROFILE_LAYOUT,
  FIELD_STYLING,
  UPDATE_INTERVALS,
  timeAgo,
} from '../constants'

type User = {
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

const Profile = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const hasShownWelcomeRef = useRef(false)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/profile')
        setUser(res.data)
        
        // Show welcome toast on first load only
        if (!hasShownWelcomeRef.current) {
          Toast({
            text: PROFILE_CONTENT.WELCOME_MESSAGE.replace('{firstName}', res.data.firstName)
          })
          hasShownWelcomeRef.current = true
        }
      } catch {
        setError(PROFILE_CONTENT.ERROR_MESSAGE)
      }
    }
    fetchUser()
  }, [])

  // Update time ago display every minute
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({})
    }, UPDATE_INTERVALS.TIME_AGO)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    setIsLoggingOut(true)
    logout()
    navigate('/login')
    setTimeout(() => setIsLoggingOut(false), 1000)
  }

  return (
    <div className={PROFILE_LAYOUT.BG_COLOR}>
      {/* ----------------- Card ----------------- */}
      <div className={PROFILE_LAYOUT.CONTAINER_CLASSES}>

        {/* -----------------Avatar -----------------*/}
        <Avatar src={profileImg} alt={PROFILE_CONTENT.AVATAR_ALT} />

        {user ? (
          <>
            <p className="text-lg font-black text-gray-900 mb-5">{user.firstName} {user.lastName}</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="w-full space-y-4">

              {/* ----------------- Email ----------------- */}
              <InfoField label={PROFILE_LABELS.EMAIL}>
                <div className={FIELD_STYLING.CONTAINER}>
                  <svg className={FIELD_STYLING.ICON} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <p className={FIELD_STYLING.TEXT}>{user.email}</p>
                </div>
              </InfoField>

              {/*----------------- Password  -----------------*/}
              <InfoField label={PROFILE_LABELS.PASSWORD}>
                <div className={FIELD_STYLING.CONTAINER}>
                  <div className="flex items-center gap-2">
                    <svg className={FIELD_STYLING.ICON} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className={FIELD_STYLING.PASSWORD_TEXT}>
                      {showPassword ? PROFILE_CONTENT.PASSWORD_VISIBLE : PROFILE_CONTENT.PASSWORD_MASK}
                    </p>
                  </div>
                  {/* ----------------- Eye toggle ----------------- */}
                  <button onClick={() => setShowPassword(!showPassword)} className={FIELD_STYLING.TOGGLE_BUTTON}>
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </InfoField>

              {/* ----------------- Created ----------------- */}
              <InfoField label={PROFILE_LABELS.CREATED}>
                <p className="text-sm text-gray-500 px-1">{timeAgo(user.createdAt)}</p>
              </InfoField>

            </div>

            {/* ----------------- Logout ----------------- */}
            <Button variant="danger" onClick={handleLogout} disabled={isLoggingOut} className="mb-10 mt-6 relative">
              {isLoggingOut ? (
                <LoadingSpinner size="sm" />
              ) : (
                PROFILE_CONTENT.LOGOUT_BUTTON
              )}
            </Button>
          </>
        ) : (
          <p className="text-gray-400 text-sm">{PROFILE_CONTENT.LOADING_TEXT}</p>
        )}

        <Footer />

      </div>
    </div>
  )
}

export default Profile