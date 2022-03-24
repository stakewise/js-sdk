import React, { useCallback, useMemo } from 'react'
import { providers } from 'ethers'
import Widget from 'stakewise-widget/dist/dev'

import Button from '../Button/Button'


type ContentProps = {
  className?: string
  isDark: boolean
  setDark: () => void
}

const Content: React.FC<ContentProps> = (props) => {
  const { className } = props

  const widget = useMemo(() => {
    const provider = new providers.Web3Provider(window.ethereum)

    return new Widget({
      address: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      referral: '0xEd5dBc418eB6b7Cb330f0df8fdb50a8772b8C4d0',
      provider,
      onError: (data) => {
        console.log('error', data)
      }
    })
  }, [])

  const handleClick = useCallback(() => {
    widget.open()
  }, [ widget ])

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
