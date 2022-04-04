import React from 'react'
import cx from 'classnames'
import { Form, useFieldState } from 'formular'

import { options, useDevice } from '../../util'

import Switch from '../Switch/Switch'
import DropdownMenu from '../Select/Select'


type ConfigProps = {
  className?: string
  form: Form<App.Form>
}

const Config: React.FC<ConfigProps> = (props) => {
  const { className, form } = props

  const { isMobile } = useDevice()

  const { value: theme } = useFieldState(form.fields.theme)
  const { value: overlay } = useFieldState(form.fields.overlay)
  const { value: network } = useFieldState(form.fields.network)
  const { value: currency } = useFieldState(form.fields.currency)

  return (
    <div className={cx(className, isMobile ? '' : 'flex items-start')}>
      <div className="flex-1">
        <Switch
          label="Dark theme"
          labelClassName="ml-20"
          checked={theme === 'dark'}
          onChange={() => form.fields.theme.set(theme === 'dark' ? 'light' : 'dark')}
        />
        <Switch
          className="mt-20"
          label="Blur overlay"
          labelClassName="ml-20"
          checked={overlay === 'blur'}
          onChange={() => form.fields.overlay.set(overlay === 'dark' ? 'blur' : 'dark')}
        />
      </div>
      <div className={isMobile ? 'mt-20' : 'ml-20 flex-1'}>
        <div className="flex items-center">
          <DropdownMenu
            items={options.currency}
            onChange={(value) => form.fields.currency.set(value)}
          >
            <div>{currency}</div>
          </DropdownMenu>
          <label className="ml-20" htmlFor="headlessui-menu-button-5">Currency</label>
        </div>
        <Switch
          className="mt-20"
          label="Testnet (for testing only)"
          labelClassName="ml-20"
          checked={network === 'goerli'}
          onChange={() => form.fields.network.set(network === 'goerli' ? 'mainnet' : 'goerli')}
        />
      </div>
    </div>
  )
}


export default Config
