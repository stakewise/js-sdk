import React from 'react'

import Switch from '../Switch/Switch'
import DropdownMenu from '../Select/Select'


type ConfigProps = {
  className?: string
  theme: boolean
  overlay: boolean
  currency: string
  changeTheme: () => void
  changeOverlay: () => void
  setCurrency: (currency: string) => void
}

const currencies = [ 'USD', 'EUR', 'GBP' ]

const Config: React.FC<ConfigProps> = (props) => {
  const { className, theme, overlay, currency, setCurrency, changeTheme, changeOverlay } = props

  return (
    <div className={className}>
      <Switch
        label={theme ? 'Light theme' : 'Dark theme'}
        labelClassName="ml-20"
        checked={!theme}
        onChange={changeTheme}
      />
      <Switch
        className="mt-20"
        label={overlay ? 'Dark overlay' : 'Blur overlay'}
        labelClassName="ml-20"
        checked={overlay}
        onChange={changeOverlay}
      />
      <div className="mt-20 flex items-center">
        <DropdownMenu
          className=""
          items={currencies}
          onChange={setCurrency}
        >
          <div>{currency}</div>
        </DropdownMenu>
        <div className="ml-20">Currency</div>
      </div>
    </div>
  )
}


export default Config
