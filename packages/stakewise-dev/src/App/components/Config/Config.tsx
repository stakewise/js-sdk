import React from 'react'
import { Form, useFieldState } from 'formular'

import { options, useDevice } from '../../util'

import Switch from '../Switch/Switch'
import DropdownMenu from '../Select/Select'
import Input from '../Input/Input'
import { useMemo } from 'preact/compat'


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
  const { value: withReferrer } = useFieldState(form.fields.withReferrer)
  const { value: customStyles } = useFieldState(form.fields.customStyles)

  const isReferrerEnabled = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location?.search?.includes('withReferrer')
    }

    return false
  }, [])

  return (
    <div className={className}>
      <div className={isMobile ? '' : 'flex items-start'}>
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
          {
            !isMobile && (
              <Switch
                className="mt-20"
                label="Custom styles"
                labelClassName="ml-20"
                checked={customStyles}
                onChange={() => form.fields.customStyles.set(!customStyles)}
              />
            )
          }
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
          {
            isReferrerEnabled && (
              <Switch
                className="mt-20"
                label="With referrer"
                labelClassName="ml-20"
                checked={withReferrer}
                onChange={() => form.fields.withReferrer.set(!withReferrer)}
              />
            )
          }
        </div>
      </div>
      {
        withReferrer && (
          <Input
            className="mt-20"
            label="Referrer address"
            field={form.fields.referrer}
            style={theme}
          />
        )
      }
    </div>
  )
}


export default Config
