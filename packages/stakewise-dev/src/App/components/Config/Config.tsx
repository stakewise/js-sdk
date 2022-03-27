import React from 'react'

import Switch from '../Switch/Switch'


type ConfigProps = {
  className?: string
  theme: boolean
  changeTheme: () => void
}

const Config: React.FC<ConfigProps> = (props) => {
  const { className, theme, changeTheme } = props

  return (
    <div className={className}>
      <Switch
        label={theme ? 'Light theme' : 'Dark theme'}
        labelClassName="ml-20"
        checked={!theme}
        onChange={changeTheme}
      />
    </div>
  )
}


export default Config
