import { useState } from 'react'


const useTheme = () => {
  const [ isDark, setDark ] = useState(true)

  return {
    isDark,
    setDark,
  }
}


export default useTheme
