import React from 'react'


const Footer: React.FC = () => {

  return (
    <div className="flex-none w-full px-24 py-32 bg-godfather">
      <div className="content flex items-center justify-start">
        <div className="flex items-center">
          <img
            src="https://frontend-c0mqktmxw-stakewise.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fswise.475817f4.png&w=64&q=75"
            height="32"
            width="32"
          />
          <div className="ml-8 text-20 color-white">STAKEWISE</div>
        </div>
        <div className="ml-32 text-12 color-white">
          StakeWise is an Ethereum 2.0 staking service that strives<br/>
          to achieve the highest possible yield for users.<br/>
          Anyone with at least 0.001 ETH can participate.
        </div>
      </div>
    </div>
  )
}


export default Footer
