import React, { useEffect, useState } from 'react'
import cx from 'classnames'


const Footer: React.FC = () => {
  const [ isMobile, setMobile ] = useState(false)

  useEffect(() => {
    const checkWidth = () => setMobile(window.innerWidth < 640)

    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [])

  return (
    <div className="flex-none w-full px-24 py-32 bg-gladiator">
      <div className={cx('content', isMobile ? '' : 'flex items-center justify-start')}>
        <div className="flex items-center">
          <img
            src="https://frontend-c0mqktmxw-stakewise.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fswise.475817f4.png&w=64&q=75"
            height="32"
            width="32"
          />
          <div className="ml-8 text-20 color-white">STAKEWISE</div>
        </div>
        <div className={cx('text-12 color-white', isMobile ? 'mt-32' : 'ml-32')}>
          StakeWise is an Ethereum 2.0 staking service that strives<br/>
          to achieve the highest possible yield for users.<br/>
          Anyone with at least 0.001 ETH can participate.
        </div>
      </div>
    </div>
  )
}


export default Footer
