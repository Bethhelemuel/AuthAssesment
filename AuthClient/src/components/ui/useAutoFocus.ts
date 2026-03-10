import { useEffect } from 'react'

interface UseAutoFocusProps {
  fieldName: string
  enabled?: boolean
}

const useAutoFocus = ({ fieldName, enabled = true }: UseAutoFocusProps) => {
  useEffect(() => {
    if (!enabled) return

    const input = document.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement
    if (input) {
      input.focus()
    }
  }, [fieldName, enabled])
}

export default useAutoFocus
