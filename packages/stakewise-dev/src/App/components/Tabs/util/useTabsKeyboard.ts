import { useEffect, useRef } from 'react'


type Props = {
  activeTab: string
  availableTabIds: string[]
  setActiveTab: (activeTab: string) => void
}

const useTabsKeyboard = ({ activeTab, availableTabIds, setActiveTab }: Props) => {
  const tabListRef = useRef<HTMLDivElement>()
  const activeTabRef = useRef<string>(activeTab)
  const setActiveTabRef = useRef<(activeTab: string) => void>(setActiveTab)

  activeTabRef.current = activeTab

  useEffect(() => {
    const tabs = Array.from(tabListRef.current?.children || [])

    if (tabs.length) {
      const handleKeyDown = (event) => {
        const isActiveTab = event.target.tabIndex === 0
        const isTabSwitch = isActiveTab && [ 37, 39, 35, 36 ].includes(event.keyCode)

        if (isTabSwitch) {
          const tabs = Array.from(tabListRef.current?.children || [])

          const lastIndex = availableTabIds.length - 1
          const currentIndex = availableTabIds.indexOf(activeTabRef.current)
          const isLast = currentIndex === lastIndex
          const isFirst = currentIndex === 0

          const nextIndex = ({
            37: isFirst ? lastIndex : currentIndex - 1, // left
            39: isLast ? 0 : currentIndex + 1, // right
            35: lastIndex, // end
            36: 0, // home
          })[event.keyCode]

          setActiveTabRef.current?.(availableTabIds[nextIndex])

          const nextTabElement = tabs[nextIndex] as HTMLElement

          nextTabElement.focus?.()
        }
      }

      tabs.forEach((tab: HTMLDivElement) => tab.addEventListener('keydown', handleKeyDown))

      return () => {
        tabs.forEach((tab: HTMLDivElement) => tab.removeEventListener('keydown', handleKeyDown))
      }
    }
  }, [ availableTabIds ])

  return tabListRef
}


export default useTabsKeyboard
