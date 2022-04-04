import { useRef } from 'react'


const getUniqueId = ((id) => () => String(++id))(1)
const getRandomId = ((chars) => (length = 4) => [ ...Array(length) ].map(() => chars[Math.floor(Math.random() * chars.length)]).join(''))('abcdefghijklmnopqrstuvwxyz0123456789')

const useUniqueId = (prefix = '', random = false, length = 4) => {
  const id = useRef(`${prefix}${random ? getRandomId(length) : getUniqueId()}`)

  return id.current
}


export default useUniqueId
