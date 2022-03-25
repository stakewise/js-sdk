import React from 'react'


type ConfigProps = {
  className?: string
  isDark: boolean
  setDark: () => void
}

const Config: React.FC<ConfigProps> = (props) => {
  const { className, isDark, setDark } = props

  return (
    <div className={className}>
      <button onClick={() => setDark(!isDark)}>
        Theme {isDark ? 'dark' : 'light'}
      </button>
    </div>
  )
}


export default Config
