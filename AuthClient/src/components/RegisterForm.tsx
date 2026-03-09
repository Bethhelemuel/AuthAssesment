import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { z } from 'zod'
import registerImg from '../assets/register.jpg'
import Button from './ui/Button'
import Input from './ui/Input'
import Footer from './ui/Footer'

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type RegisterErrors = Partial<Record<keyof z.infer<typeof registerSchema>, string>>
type Props = { onSwitch: () => void }

function RegisterForm({ onSwitch }: Props) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<RegisterErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const firstNameInput = document.querySelector('input[name="firstName"]') as HTMLInputElement
    if (firstNameInput) {
      firstNameInput.focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        firstName: errors.firstName?.[0],
        lastName: errors.lastName?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirmPassword: errors.confirmPassword?.[0],
      })
      return
    }
    setIsLoading(true)
    try {
      const { confirmPassword, ...payload } = form
      await api.post('/auth/register', payload)
      navigate('/login')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Email may already exist.')
    } finally {
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
              <h1 className="text-2xl font-black text-gray-900 mb-8">Register</h1>
              <p className="text-gray-400 text-sm mb-8"> 
                Already have an account?{' '}
                <span
                  onClick={onSwitch}
                  className="text-[#8960BC]  font-semibold underline cursor-pointer hover:text-teal-400 "
                >
                  Log in
                </span>
              </p>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  onChange={handleChange}
                  label="Firstname"
                  error={fieldErrors.firstName}
                  focusColor="teal"
                />
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  onChange={handleChange}
                  label="Surname"
                  error={fieldErrors.lastName}
                  focusColor="teal"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  label="Email"
                  error={fieldErrors.email}
                  focusColor="teal"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  onChange={handleChange}
                  label="Password"
                  error={fieldErrors.password}
                  focusColor="teal"
                />
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  onChange={handleChange}
                  label="Confirm Password"
                  error={fieldErrors.confirmPassword}
                  focusColor="teal"
                />
                <Button variant="secondary" type="submit" disabled={isLoading} className="mt-2 relative">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent animate-spin rounded-full"></div>
                    </div>
                  ) : (
                    'Register'
                  )}
                </Button>
              </form>
            </div>
          </div>

          <Footer />
        </div>

        {/* Right — Illustration */}
        <div className="hidden md:flex flex-1 bg-[#BCFFFC] rounded-2xl overflow-hidden items-end justify-start">
          <img
            src={registerImg}
            alt="Register illustration"
            className="w-full h-full object-cover scale-100 "
          />
        </div>

      </div>
    </div>
  )
}

export default RegisterForm