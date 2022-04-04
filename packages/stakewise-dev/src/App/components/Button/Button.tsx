import React from 'react'
import cx from 'classnames'

import s from './Button.scss'


type ButtonProps = {
  className?: string
  title: string
  disabled?: boolean
  color?: 'blue' | 'gradient'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, title, color = 'blue', disabled, onClick } = props

  return (
    <button
      className={cx(className, s.button, s[color], 'cursor-pointer radius-8 px-20 py-24', {
        'opacity-48': disabled,
        'cursor-disabled': disabled,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <span class="text-18 color-white">
        {title}
      </span>
    </button>
  )
}


export default Button
