import React, { useMemo } from 'react'
import { isAddress } from 'ethers/lib/utils'
import { FieldState, Form, useFieldState } from 'formular'

import MonacoEditor from '@monaco-editor/react'

import Widget from '../../../dev-widget'

import { useDevice, useProvider } from '../../util'

import Button from '../Button/Button'
import Config from '../Config/Config'
import Input from '../Input/Input'
import Tabs from '../Tabs/Tabs'

import styles from './util/styles'
import { useCallback } from 'preact/compat'


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
  const { value: referrerValue } = useFieldState(form.fields.referrer)
  const { value: customStyles } = useFieldState(form.fields.customStyles)

  const referrer = isAddress(referrerValue as string) ? referrerValue : null

  const widget = useMemo(() => {
    if (!address) {
      return null
    }

    return new Widget({
      sender: address,
      referrer,
      provider,
      currency,
      overlay,
      theme,
      customStyles,
      onClose: () => {
        document.body.classList.remove('widgetOpen')
        console.log('Widget has been closed')
      },
      onSuccess: () => {
        console.log('Transaction has been sent')
      },
      onError: (error) => {
        console.log('Error', error)
      },
    })
  }, [ overlay, theme, currency, address, provider, referrer, customStyles ])

  const stylesString = useMemo(() => {
    const themeStyles = styles[theme as string]

    if (overlay === 'dark') {
      return `${styles.darkOverlay}${themeStyles}`
    }

    return `${styles.blurOverlay}${themeStyles}`
  }, [ overlay, theme ])

  const jsEditor = !isMobile && (
    <MonacoEditor
      className="w-full radius-16 overflow-hidden"
      language="javascript"
      theme={`vs-${theme}`}
      options={{
        readOnly: true,
        contextmenu: false,
        minimap: {
          enabled: false,
        },
        overviewRulerLanes: 0,
        scrollbar: {
          vertical: 'hidden',
          horizontal: 'hidden',
          handleMouseWheel: false,
        },
        wordWrap: 'on',
      }}
      height={customStyles ? 530 : 480}
      width={586}
      value={`
        import React, { useMemo } from 'react'
        import Widget from '@stakewise/widget'
        import { providers } from 'ethers'

        const WidgetButton = () => {
          const widget = useMemo(() => (
            new Widget({
              sender: '${address}',${referrer ? `\n              referrer: '${referrer}',` : ''}
              provider: ${typeof window !== 'undefined' && window.ethereum
                ? 'new providers.Web3Provider(window.ethereum)'
                : `new providers.EtherscanProvider(${network === 'mainnet' ? 1 : 5})`},
              currency: '${currency}',
              ${customStyles
                ? `customStyles: true,`
                : `theme: '${theme}',
              overlay: '${overlay}',`}
              onSuccess: () => console.log('Successfully deposited'),
              onError: (data) => console.log('Error', data),
              onClose: () => console.log('Widget closed'),
            })
          ), [])
          ${customStyles ? `
          return (
            <>
              {/* Custom styles */}
              <link rel="stylesheet" href="./style.css" />
              <button onClick={() => widget.open()}>
                Open Widget
              </button>
            </>
          )` : `
          return (
            <button onClick={() => widget.open()}>
              Open Widget
            </button>
          )`}
        }

        export default WidgetButton`
        .replace(/\n        /g, '\n')
        .replace(/^\n/, '')
      }
    />
  )

  const cssEditor = !isMobile && (
    <MonacoEditor
      key="cssEditor"
      className="w-full radius-16 overflow-hidden"
      language="css"
      theme={`vs-${theme}`}
      options={{
        readOnly: true,
        contextmenu: false,
        minimap: {
          enabled: false,
        },
        overviewRulerLanes: 0,
        scrollbar: {
          horizontal: 'hidden',
        },
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
      height={530}
      width={586}
      value={stylesString}
    />
  )

  const handleOpenWidget = useCallback(() => {
    if (overlay === 'blur') {
      document.body.classList.add('widgetOpen')
    }

    widget?.open()
  }, [ widget, overlay ])

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
                            onClick={handleOpenWidget}
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
                <>
                  <Button
                    className={isDepositDisabled ? 'left-radius-0' : null}
                    title="Open widget"
                    color="gradient"
                    disabled={isConnecting}
                    onClick={handleOpenWidget}
                  />
                  {
                    customStyles && (
                      <style>{stylesString.replace(/\/\/.*/g, '')}</style>
                    )
                  }
                </>
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
          <div className="mt-32">
            {
              customStyles ? (
                <Tabs>
                  <Tabs.Content id="code" title="Code">
                    <div className="mt-12">{jsEditor}</div>
                  </Tabs.Content>
                  <Tabs.Content id="styles" title="Styles">
                    <div className="mt-12">{cssEditor}</div>
                  </Tabs.Content>
                </Tabs>
              ) : (
                jsEditor
              )
            }
          </div>
        )
      }
    </div>
  )
}


export default Content
