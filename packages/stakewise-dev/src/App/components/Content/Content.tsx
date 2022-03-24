import React, { useCallback, useMemo } from 'react'
import { providers } from 'ethers'

import Widget from '../../../dev-widget'

import Button from '../Button/Button'


type ContentProps = {
  className?: string
  isDark: boolean
  setDark: () => void
}

const Content: React.FC<ContentProps> = (props) => {
  const { className } = props

  const handleClick = useCallback(() => {
    const provider = new providers.Web3Provider(window.ethereum)

    const widget = new Widget({
      address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      provider,
      onError: (data) => {
        console.log('error', data)
      }
    })

    widget.open()
  }, [])

  return (
    <div className={className}>
      <div className="flex justify-center">
        <Button
          title="Open widget"
          color="gradient"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}


export default Content
