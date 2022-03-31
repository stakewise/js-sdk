import { useEffect, useState } from 'react'


const useDevice = () => {
  const [ isMobile, setMobile ] = useState(false)

  useEffect(() => {
    const checkWidth = () => setMobile(window.innerWidth < 640)

    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [])

  return {
    isMobile,
  }
}


export default useDevice
