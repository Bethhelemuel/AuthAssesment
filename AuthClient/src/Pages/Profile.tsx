import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import profileImg from '../assets/profile.jpg'
import Button from '../components/ui/Button'
import Footer from '../components/ui/Footer'

type User = {
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

const timeAgo = (dateString: string): string => {
  const now = new Date()
  const created = new Date(dateString)
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years !== 1 ? 's' : ''} ago`
}

const Profile = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/profile')
        setUser(res.data)
      } catch {
        setError('Failed to load profile')
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    setIsLoggingOut(true)
    logout()
    navigate('/login')
    setTimeout(() => setIsLoggingOut(false), 1000)
  }

  return (
    <div className="min-h-screen bg-blue-200 flex items-start justify-center p-0 md:items-center md:p-6">

      {/* Card */}
      <div className="bg-white md:rounded-3xl shadow-lg flex w-full md:w-auto md:max-w-sm h-screen md:h-auto overflow-hidden p-6 md:p-8 flex flex-col items-center flex-1">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 shadow-md">
          <img src={profileImg} alt="Profile avatar" className="w-full h-full object-cover" />
        </div>

        {user ? (
          <>
            <p className="text-lg font-black text-gray-900 mb-5">{user.firstName} {user.lastName}</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="w-full space-y-4">

              {/* Email */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Your Email</p>
                <div className="flex items-center border border-gray-100 rounded-lg px-4 py-2.5 bg-gray-50 gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Password */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Password</p>
                <div className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-2.5 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-sm text-gray-500 tracking-widest">
                      {showPassword ? 'MyPassword' : '••••••••'}
                    </p>
                  </div>
                  {/* Eye toggle */}
                  <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition">
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
              </div>

              {/* Created */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Created</p>
                <p className="text-sm text-gray-500 px-1">{timeAgo(user.createdAt)}</p>
              </div>

            </div>

            {/* Logout */}
            <Button variant="danger" onClick={handleLogout} disabled={isLoggingOut} className="mb-10 mt-6 relative">
              {isLoggingOut ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
                </div>
              ) : (
                'Logout'
              )}
            </Button>
          </>
        ) : (
          <p className="text-gray-400 text-sm">Loading...</p>
        )}

        <Footer />

      </div>
    </div>
  )
}

export default Profile