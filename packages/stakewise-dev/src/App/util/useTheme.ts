import { useState, useCallback } from 'react'


const localStorageName = 'theme'

const getTheme = () => {
  try {
    const isDark = localStorage.getItem(localStorageName)

    return isDark === 'true'
  }
  catch {
    return false
  }
}

const setTheme = (isDark) => {
  try {
    localStorage.setItem(localStorageName, isDark)
  }
  catch {
  }
}


const useTheme = () => {
  const [ isDark, setDark ] = useState(getTheme())

  const handleSetDark = useCallback((isDark) => {
    setDark(isDark)
    setTheme(isDark)
  }, [])

  return {
    isDark,
    setDark: handleSetDark,
  }
}


export default useTheme
