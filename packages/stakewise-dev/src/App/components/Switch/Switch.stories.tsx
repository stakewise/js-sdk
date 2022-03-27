import React from 'react'
import { useField } from 'formular'
import { useSelect } from 'cosmos-fixture'

import Switch, { sizes } from './Switch'
import type { Size } from './Switch'


const Component = () => {
  const field = useField<boolean>()

  const [ size ] = useSelect<Size>('Size', sizes)

  return (
    <Switch
      field={field}
      size={size}
    />
  )
}


export default Component
