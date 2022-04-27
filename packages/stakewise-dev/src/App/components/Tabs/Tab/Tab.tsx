import React from 'react'
import cx from 'classnames'

import s from './Tab.scss'


type TabProps = {
  id: string
  tagId: string
  title: string
  isActive: boolean
  disabled?: boolean
  onClick: (id: string) => void
}

const Tab: React.FC<TabProps> = (props) => {
  const { id, tagId, title, isActive, disabled = false, onClick } = props

  return (
    <div
      className={cx(s.tab, 'color-titanic', {
        [s.active]: isActive,
        [s.disabled]: disabled,
      })}
      id={tagId}
      message={title}
      tag="button"
      role="tab"
      tabIndex={isActive ? 0 : -1}
      aria-controls={`${tagId}-panel`}
      aria-selected={isActive}
      onClick={!disabled ? () => onClick(id) : null}
    >
      {title}
    </div>
  )
}


export default React.memo(Tab)
