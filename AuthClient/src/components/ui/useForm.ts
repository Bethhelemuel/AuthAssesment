import { useState } from 'react'

interface UseFormProps<T> {
  initialValues: T
}

interface UseFormReturn<T> {
  form: T
  setForm: (form: T) => void
  error: string
  setError: (error: string) => void
  fieldErrors: Partial<Record<keyof T, string>>
  setFieldErrors: (errors: Partial<Record<keyof T, string>>) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
}

const useForm = <T extends Record<string, any>>({ initialValues }: UseFormProps<T>): UseFormReturn<T> => {
  const [form, setForm] = useState<T>(initialValues)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setFieldErrors(prev => ({ ...prev, [name]: '' }))
  }

  const resetForm = () => {
    setForm(initialValues)
    setError('')
    setFieldErrors({})
    setIsLoading(false)
  }

  return {
    form,
    setForm,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    isLoading,
    setIsLoading,
    handleChange,
    resetForm
  }
}

export default useForm
