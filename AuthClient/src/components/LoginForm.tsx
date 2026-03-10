import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { z } from 'zod'
import loginImg from '../assets/login.jpg'
import Input from './ui/Input'
import Footer from './ui/Footer'
import ErrorMessage from './ui/ErrorMessage'
import FormLayout from './ui/FormLayout'
import SubmitButton from './ui/SubmitButton'
import useForm from './ui/useForm'
import useAutoFocus from './ui/useAutoFocus'
import {
  LOGIN_SCHEMA,
  LOGIN_FIELDS,
  LOGIN_INITIAL_VALUES,
  AUTH_ERRORS,
  LOGIN_LABELS,
  LOGIN_PLACEHOLDERS,
  LOGIN_CONTENT,
  LOGIN_IMAGE,
  AUTO_FOCUS_FIELDS,
} from '../constants'

//ZOD schema for validation
const loginSchema = z.object({
  [LOGIN_FIELDS.EMAIL]: z.string().email(LOGIN_SCHEMA.email),
  [LOGIN_FIELDS.PASSWORD]: z.string().min(6, LOGIN_SCHEMA.password),
})

type Props = { onSwitch: () => void }

const LoginForm = ({ onSwitch }: Props) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const {
    form,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    isLoading,
    setIsLoading,
    handleChange
  } = useForm({ initialValues: LOGIN_INITIAL_VALUES })

  useAutoFocus({ fieldName: AUTO_FOCUS_FIELDS.LOGIN })

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
      setError(error.response?.data?.message || AUTH_ERRORS.LOGIN_FAILED)
      setIsLoading(false)
    }
  }

  return (
    <FormLayout
      title={LOGIN_CONTENT.TITLE}
      description={LOGIN_CONTENT.DESCRIPTION}
      switchText={LOGIN_CONTENT.SWITCH_TEXT}
      onSwitch={onSwitch}
      imageSrc={loginImg}
      imageAlt={LOGIN_IMAGE.ALT}
      bgColor={LOGIN_IMAGE.BG_COLOR}
      footer={<Footer />}
    >
      <ErrorMessage message={error} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name={LOGIN_FIELDS.EMAIL}
          type="email"
          placeholder={LOGIN_PLACEHOLDERS.EMAIL}
          onChange={handleChange}
          label={LOGIN_LABELS.EMAIL}
          error={fieldErrors.email}
        />
        <Input
          name={LOGIN_FIELDS.PASSWORD}
          type="password"
          placeholder={LOGIN_PLACEHOLDERS.PASSWORD}
          onChange={handleChange}
          label={LOGIN_LABELS.PASSWORD}
          error={fieldErrors.password}
        />
        <SubmitButton isLoading={isLoading}>
          {LOGIN_CONTENT.BUTTON_TEXT}
        </SubmitButton>
      </form>
    </FormLayout>
  )
}

export default LoginForm