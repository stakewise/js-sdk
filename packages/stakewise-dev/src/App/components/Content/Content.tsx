import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { providers } from 'ethers'
import { FieldState, Form, useFieldState } from 'formular'

import MonacoEditor from '@monaco-editor/react'

import Widget from '../../../dev-widget'

import Button from '../Button/Button'
import Config from '../Config/Config'
import { useDevice, useProvider } from '../../util'
import Input from '../Input/Input'
import { isAddress } from 'ethers/lib/utils'


type ContentProps = {
  className?: string
  form: Form<App.Form>
}

const Content: React.FC<ContentProps> = (props) => {
  const { className, form } = props

  const { isMobile } = useDevice()
  const {
    provider, address, addressField,
    isConnecting, isWrongNetwork, isDepositDisabled,
    connect, requestNetworkChange,
  } = useProvider(form.fields.network)

  const { value: theme } = useFieldState(form.fields.theme)
  const { value: overlay } = useFieldState(form.fields.overlay)
  const { value: network } = useFieldState(form.fields.network)
  const { value: currency } = useFieldState(form.fields.currency)

  const widget = useMemo(() => {
    if (!address) {
      return null
    }

    return new Widget({
      sender: address,
      referrer: '0x0000000000000000000000000000000000000000',
      provider,
      currency,
      overlay,
      theme,
      onClose: () => {
        console.log('Widget has been closed')
      },
      onSuccess: () => {
        console.log('Transaction has been sent')
      },
      onError: (error) => {
        console.log('Error', error)
      },
    })
  }, [ overlay, theme, currency, address, provider ])

  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        {
          isWrongNetwork ? (
            <>
              <Button
                title="Change network"
                color="blue"
                onClick={requestNetworkChange}
              />
              <div className="mt-12 color-fargo">
                Please choose <span className="capitalize">{network}</span> network in MetaMask
              </div>
            </>
          ) : (
            Boolean(address || isConnecting) ? (
              isDepositDisabled ? (
                <>
                  <div className="flex justify-center w-full">
                    <Input
                      className="flex-1"
                      label="Wallet address"
                      containerClassName="right-radius-0"
                      field={addressField}
                      style={theme}
                    />
                    <FieldState field={addressField}>
                      {
                        ({ value }) => (
                          <Button
                            className={isDepositDisabled ? 'left-radius-0' : null}
                            title="Open widget"
                            color="gradient"
                            disabled={isConnecting || isDepositDisabled && !isAddress(value)}
                            onClick={widget?.open}
                          />
                        )
                      }
                    </FieldState>
                  </div>
                  <div className="mt-12 color-fargo">
                    Read-only mode. Depositing is not allowed
                  </div>
                </>
              ) : (
                <Button
                  className={isDepositDisabled ? 'left-radius-0' : null}
                  title="Open widget"
                  color="gradient"
                  disabled={isConnecting}
                  onClick={widget?.open}
                />
              )
            ) : (
              <>
                <Button
                  title="Connect wallet"
                  color="blue"
                  onClick={connect}
                />
                <div className="mt-12 color-fargo">
                  Please choose <span className="capitalize">{network}</span> network in MetaMask
                </div>
              </>
            )
          )
        }
      </div>
      <Config
        className="mt-32"
        form={form}
      />
      {
        !isMobile && (
          <MonacoEditor
            className="mt-32 w-full radius-16 overflow-hidden"
            language="javascript"
            theme={`vs-${theme}`}
            options={{
              readOnly: true,
              contextmenu: false,
              minimap:{
                enabled:false,
              },
              overviewRulerLanes: 0,
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
                handleMouseWheel:false,
              },
              wordWrap: 'on',
            }}
            height={530}
            width={586}
            value={`
              import React, { useMemo } from 'react'
              import Widget from 'stakewise-widget'
              import { providers } from 'ethers'
      
              const WidgetButton = () => {
                const widget = useMemo(() => (
                  new Widget({
                    sender: '${address}',
                    referrer: '0x0000000000000000000000000000000000000000',
                    provider: new providers.Web3Provider(window.ethereum),
                    currency: '${currency}',
                    theme: '${theme}',
                    overlay: '${overlay}',
                    onSuccess: () => console.log('Successfully deposited'),
                    onError: (data) => console.log('Error', data),
                    onClose: () => console.log('Widget closed'),
                  })
                ), [])
  
                return (
                  <button onClick={() => widget.open()}>
                    Open Widget
                  </button>
                )
              }

              export default WidgetButton`
                .replace(/^\n|              /g, '')
            }
          />
        )
      }
    </div>
  )
}


export default Content
