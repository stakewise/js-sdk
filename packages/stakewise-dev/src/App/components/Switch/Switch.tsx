import React from 'react'
import cx from 'classnames'
import { Switch as SwitchWrapper } from '@headlessui/react'

import s from './Switch.scss'


export type SwitchProps = {
  className?: string
  labelClassName?: string
  label: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}

type SubComponents = {
  Group?: typeof SwitchWrapper['Group']
  Label?: typeof SwitchWrapper['Label']
}

const Switch: React.FC<SwitchProps & SubComponents> = (props) => {
  const { className, labelClassName, label, checked, disabled, onChange } = props

  const rootClassName = cx('relative', s.switch, s[`size-30`], {
    [s.active]: checked,
    [s.disabled]: disabled
  })

  return (
    <SwitchWrapper.Group>
      <div className={cx('flex items-center', className)}>
        <SwitchWrapper
          className={rootClassName}
          checked={checked}
          onChange={onChange}
        >
          <div className={s.handle} />
        </SwitchWrapper>
        <SwitchWrapper.Label className="ml-30 pointer">
          <div className={labelClassName}>
            {label}
          </div>
        </SwitchWrapper.Label>
      </div>
    </SwitchWrapper.Group>
  )
}


export default React.memo(Switch)
