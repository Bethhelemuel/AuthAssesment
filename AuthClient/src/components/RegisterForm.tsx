import api from '../api/axios'
import { z } from 'zod'
import registerImg from '../assets/register.jpg'
import Input from './ui/Input'
import Footer from './ui/Footer'
import Toast from './ui/Toast'
import ErrorMessage from './ui/ErrorMessage'
import FormLayout from './ui/FormLayout'
import SubmitButton from './ui/SubmitButton'
import useForm from './ui/useForm'
import useAutoFocus from './ui/useAutoFocus'
import {
  REGISTER_SCHEMA,
  REGISTER_FIELDS,
  REGISTER_INITIAL_VALUES,
  AUTH_ERRORS,
  AUTH_SUCCESS,
  REGISTER_LABELS,
  REGISTER_PLACEHOLDERS,
  REGISTER_CONTENT,
  REGISTER_IMAGE,
  AUTO_FOCUS_FIELDS,
} from '../constants'

//ZOD schema for validation
const registerSchema = z.object({
  [REGISTER_FIELDS.FIRST_NAME]: z.string().min(1, REGISTER_SCHEMA.firstName),
  [REGISTER_FIELDS.LAST_NAME]: z.string().min(1, REGISTER_SCHEMA.lastName),
  [REGISTER_FIELDS.EMAIL]: z.string().email(REGISTER_SCHEMA.email),
  [REGISTER_FIELDS.PASSWORD]: z.string().min(6, REGISTER_SCHEMA.password),
  [REGISTER_FIELDS.CONFIRM_PASSWORD]: z.string().min(1, REGISTER_SCHEMA.confirmPassword),
}).refine(data => data[REGISTER_FIELDS.PASSWORD] === data[REGISTER_FIELDS.CONFIRM_PASSWORD], {
  message: REGISTER_SCHEMA.passwordMatch,
  path: [REGISTER_FIELDS.CONFIRM_PASSWORD],
})

type Props = { onSwitch: () => void }

function RegisterForm({ onSwitch }: Props) {
  const {
    form,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    isLoading,
    setIsLoading,
    handleChange
  } = useForm({ initialValues: REGISTER_INITIAL_VALUES })

  useAutoFocus({ fieldName: AUTO_FOCUS_FIELDS.REGISTER })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        [REGISTER_FIELDS.FIRST_NAME]: errors[REGISTER_FIELDS.FIRST_NAME]?.[0],
        [REGISTER_FIELDS.LAST_NAME]: errors[REGISTER_FIELDS.LAST_NAME]?.[0],
        [REGISTER_FIELDS.EMAIL]: errors[REGISTER_FIELDS.EMAIL]?.[0],
        [REGISTER_FIELDS.PASSWORD]: errors[REGISTER_FIELDS.PASSWORD]?.[0],
        [REGISTER_FIELDS.CONFIRM_PASSWORD]: errors[REGISTER_FIELDS.CONFIRM_PASSWORD]?.[0],
      })
      return
    }
    setIsLoading(true)
    try {
      const { [REGISTER_FIELDS.CONFIRM_PASSWORD]: _, ...payload } = form
      await api.post('/auth/register', payload)
      
      // Show success toast
      Toast({
        text: AUTH_SUCCESS.REGISTER_SUCCESS
      })
      
      // Switch to login form after a short delay
      setTimeout(() => {
        onSwitch()
      }, 1000)
    } catch (error: any) {
      setError(error.response?.data?.message || AUTH_ERRORS.REGISTER_FAILED)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormLayout
      title={REGISTER_CONTENT.TITLE}
      description={REGISTER_CONTENT.DESCRIPTION}
      switchText={REGISTER_CONTENT.SWITCH_TEXT}
      onSwitch={onSwitch}
      imageSrc={registerImg}
      imageAlt={REGISTER_IMAGE.ALT}
      bgColor={REGISTER_IMAGE.BG_COLOR}
      footer={<Footer />}
    >
      <ErrorMessage message={error} />
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name={REGISTER_FIELDS.FIRST_NAME}
          type="text"
          placeholder={REGISTER_PLACEHOLDERS.FIRST_NAME}
          onChange={handleChange}
          label={REGISTER_LABELS.FIRST_NAME}
          error={fieldErrors[REGISTER_FIELDS.FIRST_NAME]}
          focusColor="teal"
        />
        <Input
          name={REGISTER_FIELDS.LAST_NAME}
          type="text"
          placeholder={REGISTER_PLACEHOLDERS.LAST_NAME}
          onChange={handleChange}
          label={REGISTER_LABELS.LAST_NAME}
          error={fieldErrors[REGISTER_FIELDS.LAST_NAME]}
          focusColor="teal"
        />
        <Input
          name={REGISTER_FIELDS.EMAIL}
          type="email"
          placeholder={REGISTER_PLACEHOLDERS.EMAIL}
          onChange={handleChange}
          label={REGISTER_LABELS.EMAIL}
          error={fieldErrors[REGISTER_FIELDS.EMAIL]}
          focusColor="teal"
        />
        <Input
          name={REGISTER_FIELDS.PASSWORD}
          type="password"
          placeholder={REGISTER_PLACEHOLDERS.PASSWORD}
          onChange={handleChange}
          label={REGISTER_LABELS.PASSWORD}
          error={fieldErrors[REGISTER_FIELDS.PASSWORD]}
          focusColor="teal"
        />
        <Input
          name={REGISTER_FIELDS.CONFIRM_PASSWORD}
          type="password"
          placeholder={REGISTER_PLACEHOLDERS.CONFIRM_PASSWORD}
          onChange={handleChange}
          label={REGISTER_LABELS.CONFIRM_PASSWORD}
          error={fieldErrors[REGISTER_FIELDS.CONFIRM_PASSWORD]}
          focusColor="teal"
        />
        <SubmitButton isLoading={isLoading} variant="secondary">
          {REGISTER_CONTENT.BUTTON_TEXT}
        </SubmitButton>
      </form>
    </FormLayout>
  )
}

export default RegisterForm