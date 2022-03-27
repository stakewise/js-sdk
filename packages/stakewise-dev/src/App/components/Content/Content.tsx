import React, { useCallback } from 'react'
import { providers } from 'ethers'

import MonacoEditor from 'react-monaco-editor'

import Widget from '../../../dev-widget'

import Button from '../Button/Button'
import Config from '../Config/Config'
import { useState } from 'preact/compat'


type ContentProps = {
  className?: string
  isDark: boolean
  setDark: () => void
}

const Content: React.FC<ContentProps> = (props) => {
  const { className, isDark, setDark } = props

  const [ isDarkOverlay, setDarkOverlay ] = useState(true)

  const handleClick = useCallback(() => {
    const provider = new providers.Web3Provider(window.ethereum)

    const widget = new Widget({
      address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      provider,
      currency: 'USD',
      theme: isDark ? 'dark' : 'light',
      onError: (data) => {
        console.log('error', data)
      }
    })

    widget.open()
  }, [ isDark, isDarkOverlay ])

  return (
    <div className={className}>
      <div className="flex justify-center">
        <Button
          title="Open widget"
          color="gradient"
          onClick={handleClick}
        />
      </div>
      <Config
        className="mt-20"
        theme={isDark}
        overlay={isDarkOverlay}
        changeTheme={() => setDark(!isDark)}
        changeOverlay={() => setDarkOverlay(!isDarkOverlay)}
      />
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
              address: '0x0000000000000000000000000000000000000000',
              referral: '0x0000000000000000000000000000000000000000',
              provider: new providers.Web3Provider(window.ethereum),
              currency: 'USD',
              theme: ${isDark ? 'dark' : 'light'},
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
    </div>
  )
}


export default Content
