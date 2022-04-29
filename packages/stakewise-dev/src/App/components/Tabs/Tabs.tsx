import React, { useMemo, useState, useCallback } from 'react'

import useTabsKeyboard from './util/useTabsKeyboard'

import Tab from './Tab/Tab'
import Content from './Content/Content'
import type { TabsContentProps } from './Content/Content'

import s from './Tabs.scss'


export type TabsProps = {
  children: Array<React.ReactElement<TabsContentProps>>
  className?: string
  defaultActiveTab?: string
  onChange?: (id: string) => void
}

type TabsComponent = React.FC<TabsProps> & {
  Content: React.FC<TabsContentProps>
}

const Tabs: TabsComponent = (props) => {
  const { children, className, defaultActiveTab, onChange } = props

  const tabsId = 'tabs'

  const availableTabIds = useMemo(() => (
    React.Children.map(children, (child) => child.props.id)
  ), [ children ])

  const [ activeTab, setActiveTab ] = useState(defaultActiveTab || availableTabIds[0])

  const tabsRef = useTabsKeyboard({ availableTabIds, activeTab, setActiveTab })

  const handleClick = useCallback((id) => {
    if (activeTab === id) {
      return
    }

    setActiveTab(id)

    if (typeof onChange === 'function') {
      onChange(id)
    }
  }, [ activeTab, setActiveTab, onChange ])

  const tabs = (
    <div className={s.tabsContainer}>
      <div
        ref={tabsRef}
        className={s.tabs}
        role="tablist"
      >
        {
          React.Children.map(children.filter(Boolean), (child) => {
            const { id, title, count, countColor, disabled } = child.props
            const isActive = id === activeTab

            return (
              <Tab
                key={id}
                id={id}
                tagId={`${tabsId}-${id}`}
                title={title}
                isActive={isActive}
                count={count}
                countColor={countColor}
                disabled={disabled}
                onClick={handleClick}
              />
            )
          })
        }
      </div>
    </div>
  )

  const activeTabIndex = availableTabIds.indexOf(activeTab)
  const activeTabControlId = `${tabsId}-${activeTabIndex}`

  return (
    <div className={className}>
      {tabs}
      <div
        id={`${tabsId}-${activeTabIndex}-panel`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={activeTabControlId}
      >
        {children.filter(Boolean)[activeTabIndex]}
      </div>
    </div>
  )
}

Tabs.Content = Content


export default Tabs
