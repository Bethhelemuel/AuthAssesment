import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { z } from 'zod'
import loginImg from '../assets/login.jpg'
import Button from './ui/Button'
import Input from './ui/Input'
import Footer from './ui/Footer'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>
type Props = { onSwitch: () => void }

const LoginForm = ({ onSwitch }: Props) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<LoginErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
    if (emailInput) {
      emailInput.focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      })
      return
    }
    setIsLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token)
      navigate('/profile')
      setIsLoading(false)
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-0 md:items-center md:p-6">
      <div className="bg-white md:rounded-3xl shadow-xl flex w-full md:w-[85vw] md:w-auto md:max-w-6xl h-screen md:h-[90vh] overflow-hidden p-6 md:p-3 gap-3 md:gap-3">

        {/* Left — Form centered */}
        <div className="flex-1 flex flex-col md:justify-center overflow-y-auto py-8 px-6">
          <div className="flex flex-col items-center w-full flex-1">
            <div className="w-full md:w-2/3 flex-1 flex flex-col md:justify-center">
              <h1 className="text-2xl font-black text-gray-900 mb-8">Login</h1>
              <p className="text-gray-400 text-sm mb-8">
                Don't you have an account?{' '}
                <span
                  onClick={onSwitch}
                  className="text-[#8960BC] font-semibold underline cursor-pointer hover:text-yellow-500"
                >
                  Sign up
                </span>
              </p>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  label="Email"
                  error={fieldErrors.email}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  onChange={handleChange}
                  label="Password"
                  error={fieldErrors.password}
                />
                <Button type="submit" disabled={isLoading} className="mt-2 relative">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </div>
          </div>

          <Footer />
        </div>

        {/* Right — Illustration */}
        <div className="hidden md:flex flex-1 bg-[#FFE89C] rounded-2xl overflow-hidden items-end justify-start">
          <img
            src={loginImg}
            alt="Login illustration"
            className="w-full h-full object-cover scale-100 "
          />
        </div>

      </div>
    </div>
  )
}

export default LoginForm