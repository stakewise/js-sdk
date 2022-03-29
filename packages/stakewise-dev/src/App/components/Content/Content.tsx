import React, { useCallback, useEffect, useState } from 'react'
import { providers } from 'ethers'

import MonacoEditor from 'react-monaco-editor'

import Widget from '../../../dev-widget'

import Button from '../Button/Button'
import Config from '../Config/Config'


type ContentProps = {
  className?: string
  isDark: boolean
  setDark: () => void
}

const Content: React.FC<ContentProps> = (props) => {
  const { className, isDark, setDark } = props

  const [ isEditorVisible, setEditorVisible ] = useState(true)
  const [ isDarkOverlay, setDarkOverlay ] = useState(true)
  const [ currency, setCurrency ] = useState('USD')
  const [ { address, isConnected }, setState ] = useState({ address: '', isConnected: null })

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 640) {
        setEditorVisible(false)
      }
      else {
        setEditorVisible(true)
      }
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [])

  const connect = useCallback(() => {
    window.ethereum?.enable()
      .then(([ address ]) => setState({ address, isConnected: true }))
      .catch(() => setState({ address: '', isConnected: false }))
  }, [])

  useEffect(() => {
    connect()
    window.ethereum?.on('accountsChanged', () => {
      setState({ address: '', isConnected: false })
    })
  }, [])
  
  const handleClick = useCallback(async () => {
    if (address) {
      const provider = new providers.Web3Provider(window.ethereum)
  
      const widget = new Widget({
        address,
        referral: '0x0000000000000000000000000000000000000000',
        provider,
        currency,
        overlay: isDarkOverlay ? 'dark' : 'blur',
        theme: isDark ? 'dark' : 'light',
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
  
      widget.open()
    }
  }, [ isDark, isDarkOverlay, address, currency ])

  return (
    <div className={className}>
      <div className="flex justify-center">
        {
          Boolean(address || isConnected === null) ? (
            <Button
              title="Open widget"
              color="gradient"
              disabled={isConnected === null}
              onClick={handleClick}
            />
          ) : (
            <Button
              title="Connect wallet"
              color="blue"
              onClick={connect}
            />
          )
        }
      </div>
      <Config
        className="mt-20"
        theme={isDark}
        currency={currency}
        setCurrency={setCurrency}
        overlay={isDarkOverlay}
        changeTheme={() => setDark(!isDark)}
        changeOverlay={() => setDarkOverlay(!isDarkOverlay)}
      />
      {
        isEditorVisible && (
          <MonacoEditor
            className="mt-20 w-full"
            language="javascript"
            theme={`vs-${isDark ? 'dark' : 'light'}`}
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                vertical: 'hidden'
              },
            }}
            height={600}
            width={586}
            value={`
          import React from 'react'
          import Widget from 'stakewise-widget'
          import { providers } from 'ethers'
  
          const handleClick = () => {
            const widget = new Widget({
              address: '${address}',
              referral: '0x0000000000000000000000000000000000000000',
              provider: new providers.Web3Provider(window.ethereum),
              currency: '${currency}',
              theme: ${isDark ? 'dark' : 'light'},
              overlay: ${isDarkOverlay ? 'dark' : 'blur'},
              onSuccess: () => {
                console.log('Successfully deposited')
              },
              onError: (data) => {
                console.log('error', data)
              },
              onClose: () => {
                console.log('Widget closed')
              },
            })
  
            widget.open()
          }

          const WidgetButton = () => (
            <button onClick={handleClick}>
              Open Widget
            </button>
          )
          
          export default WidgetButton`
              .replace(/^\n|          /g, '')}
          />
        )
      }
    </div>
  )
}


export default Content
