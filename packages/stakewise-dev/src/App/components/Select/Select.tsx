import React from 'react'
import cx from 'classnames'
import { Menu } from '@headlessui/react'

import s from './Select.scss'


export type DropdownMenuProps = {
  className?: string
  children?: React.ReactElement<{ isOpen: boolean }>
  items: string[]
  placement?: 'bottomLeft' | 'bottomRight' | 'left' | 'right'
  onChange: (value: string) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { children, className, items, placement = 'bottom', onChange } = props

  const rootClassName = cx('relative', className)
  const menuClassName = cx('block py-4 bg-white color-black radius-8 w-full mt-4 small-shadow-titanic', s.menu, s[placement])

  return (
    <Menu as="div" className={rootClassName}>
      <Menu.Button className={cx(s.menuButton, 'bg-rocky color-white radius-8 pointer')} aria-label="Menu">
        {
          ({ open }) => React.cloneElement(children, { isOpen: open })
        }
      </Menu.Button>
      <Menu.Items className={menuClassName}>
        {
          items.map((title, index) => (
            <Menu.Item
              key={index}
              onClick={() => onChange(title)}
            >
              <button className="text-center cursor-pointer w-full py-4">{title}</button>
            </Menu.Item>
          ))
        }
      </Menu.Items>
    </Menu>
  )
}


export default React.memo(DropdownMenu)
