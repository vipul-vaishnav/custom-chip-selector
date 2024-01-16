import { useState, useRef, useEffect } from 'react'

export const useFocus = (): [React.RefObject<HTMLInputElement>, boolean, () => void, () => void] => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    if (isFocused) {
      focusInput()
    }
  }, [isFocused])

  return [inputRef, isFocused, handleFocus, handleBlur]
}
